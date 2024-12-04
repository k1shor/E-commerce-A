const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const emailSender = require('../middleware/emailSender')
const jwt = require('jsonwebtoken')
const{expressjwt} = require('express-jwt')



const saltRounds = 10

const upload = require('../utils/multerConfig');

exports.register = async(req,res)=>{
  
    const {username,email,password,confirmpassword,address,phone,dob}= req.body   

    let usernameExists = await User.findOne({username})
    if(usernameExists){
        return res.status(400).json({error: "Username not available, please choose another"})
    }
   
    let emailExists = await User.findOne({email})
    if(emailExists){
        return res.status(400).json({error: "Email already registered, login to continue"})
    }
    
    let salt = await bcrypt.genSalt(saltRounds) 
    let hashed_password = await bcrypt.hash(password,salt)

    const image = req.file ? req.file.path : 'uploads/default-profile.png';     

  
    let user = await User.create({
        username,
        email,
        address,
        dob,
        image,
        password: hashed_password
    })
    if(!user){
        return res.status(400).json({error: "Something went wrong"})
    }
  
    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString('hex')
    })

    if(!token){
        return res.status(400).json({error: "Something went wrong"})
    }
   
    const URL = `http://localhost:5000/verifyuser/${token.token}`
    emailSender({
        from:"noreply@something.com",
        to: email,
        subject: "Verification Email",
        text: `Click on the given link or copy paste in browser to verify  ${URL}`,
        html: `<a href = '${URL}'><button> Verify Now</button></a>`
    })
  
    res.send({user, message: "user registered sucessffully"})
}

exports.verifyEmail = async(req,res)=>{
    

    let token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error: "Inavlid token or may have expired"})
    }
  
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error: "Somethin went wrong"})
    }


    if(user.isVerified){
        return res.status(400).json({error:"User already verified. Login to continue"})
    }
   
    user.isVerified= true
    user = await user.save()
    if(!user){
        return res.status(400).json({error: "Failed to veri, please try again later"})
    }
   
    res.send({message: "user verifued successfully"})
}

exports.resendVerification = async (req,res) => {
   
    let user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
  
    if(!bcrypt.compareSync(req.body.password, user.password)){   
            return res.status(400).json({error: "Email and pw do not match"})
    }
  
    if(user.isVerified){
        return res.status(400).json({error: "user already verified. Login to continue"})
    }
  
    let token = await Token.create({
        user,
        token: crypto.randomBytes(16).toString('hex')
    })
    if(!token){
        return res.status(400).json({error: "Something went rong ,please try again later"})
    }
   
        const URL = `http://localhost:5000/verifyUser/${token.token}`
    emailSender({
        from: "noreply@something.com",
        to: req.body.email,
        subject: "Verification Email",
        text: ` please Click on the given link or copy paste in browser to verify  ${URL}`,
        html: `<a href = '${URL}'><button> Verify email</button></a>`
    })
    
    res.send({message: "Verification link has been sent to your email"})
}

exports.forgetPassword = async (req,res) => {
   
    let user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
   

    let token = await Token.create({
        user,
        token: crypto.randomBytes(16).toString('hex')
    })
    if(!token){
        return res.status(400).json({error: "Something went rong ,please try again later"})
    }

 
      const URL = `http://localhost:5000/resetpassword/${token.token}`
    emailSender({
        from: "noreply@something.com",
        to: user.email,
        subject: "Password rest link",
        text: ` please Click on the given link or copy paste in browser to verify ${URL}`,
        html: `<a href = '${URL}'><button> Reset pwdl</button></a>`
    })
    
    res.send({message: "password reset link has been sent to your email"})
}

exports.resetPassword = async (req,res) => {

    let token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error: "Invalid token"})
    }

    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error: "Something went wrong, please try again later"})
    }

    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(req.body.password , salt)

    user.password = hashed_password
    user = await user.save()

    if(!user){

        return res.status(400).json({error: "Something went rong ,please try again later"})
    }
     res.send({message: "password reset successfull"})
    }

       

        exports.signin = async (req,res) =>{
            let{ email,password} = req.body
        
            let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
  
            if(!bcrypt.compareSync(password, user.password)){
                return res.status(400).json({error: "Incorrect Password"})
            }
          
            if(!user.isVerified){
                return res.status(400).json({error: "user not verified"})
            }
            let token = jwt.sign({
                id: user._id,
                email,
                 role: user.role,
                 username: user.username},process.env.JWT_SECRET,{expiresIn: '24hr'})
      
           res.cookie("myCookie", token, {expiresIn:86400})
           const{_id, username,role} = user
               
                 res.send({token, user: {_id,username, email, role}})
        }

        exports.requiresSignin = (req,res,next) =>expressjwt({
            secret: process.env.JWT_SECRET,
            algorithms: ['HS256']
        })(req,res,(error)=>{
            if(error){
            return res.status(401).json({error:"You must login to acces this function"})
        }
    next()
})


exports.requiresSignin = (req,res,next) =>expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})(req,res,(error)=>{
    if(error){
    return res.status(401).json({error:"You must login to acces this function"})
}
else if(req.auth.role !== '1'){
    return res.status(401).json({error: "You must be admin to acces this resource"})
}
next()
})




