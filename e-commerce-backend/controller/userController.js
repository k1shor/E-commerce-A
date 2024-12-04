const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const emailSender = require('../middleware/emailSender')
const jwt = require('jsonwebtoken')
const{expressjwt} = require('express-jwt')

//bcrypt use grna hamli euta const chai chaixa

const saltRounds = 10
//register
exports.register = async(req,res)=>{
    console.log(req.body)
    //take input from users(id pass)
    const {username,email,password}= req.body    //yo gryo vane each time req.body grirakhna prdina

    //checck if userame is available
    let usernameExists = await User.findOne({username})
    if(usernameExists){
        return res.status(400).json({error: "Username not available, please choose another"})
    }
    //check of email is already registered
    let emailExists = await User.findOne({email})
    if(emailExists){
        return res.status(400).json({error: "Email already registered, login to continue"})
    }
    //encrypt passowrd
    let salt = await bcrypt.genSalt(saltRounds) // salt vaneko encrypt grna uniqure key
    let hashed_password = await bcrypt.hash(password,salt)

    //register user
    let user = await User.create({
        username,
        email,
        password: hashed_password
    })
    if(!user){
        return res.status(400).json({error: "Something went wrong"})
    }
    // generate verification token
    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString('hex')
    })

    if(!token){
        return res.status(400).json({error: "Something went wrong"})
    }
    //send token  in email
    const URL = `http://localhost:5000/verifyuser/${token.token}`
    // emailSender({
    //     from:"noreply@something.com",
    //     to: email,
    //     subject: "Verification Email",
    //     text: `Click on the given link or copy paste in browser to verify  ${URL}`,
    //     html: `<a href = '${URL}'><button> Verify Now</button></a>`
    // })
    console.log(user)
    //send message to user
    res.send({user, message: "user registered sucessffully"})
}
//verify user
exports.verifyEmail = async(req,res)=>{
    //check if token is valid or not

    let token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error: "Inavlid token or may have expired"})
    }
    // find user associated with token
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error: "Somethin went wrong"})
    }

    //check if alread verified
    if(user.isVerified){
        return res.status(400).json({error:"User already verified. Login to continue"})
    }
    //verrify user
    user.isVerified= true
    user = await user.save()
    if(!user){
        return res.status(400).json({error: "Failed to veri, please try again later"})
    }
    //send mesaage to user
    res.send({message: "user verifued successfully"})
}

// resend verification
exports.resendVerification = async (req,res) => {
    //check if email is valid or not
    let user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
    //check if pw is correct or not 
    if(!bcrypt.compareSync(req.body.password, user.password)){   
            return res.status(400).json({error: "Email and pw do not match"})
    }
    // chekc if user is already verified
    if(user.isVerified){
        return res.status(400).json({error: "user already verified. Login to continue"})
    }
    //generate token
    let token = await Token.create({
        user,
        token: crypto.randomBytes(16).toString('hex')
    })
    if(!token){
        return res.status(400).json({error: "Something went rong ,please try again later"})
    }
    //send token in email
        const URL = `http://localhost:5000/verifyUser/${token.token}`
    emailSender({
        from: "noreply@something.com",
        to: req.body.email,
        subject: "Verification Email",
        text: ` please Click on the given link or copy paste in browser to verify  ${URL}`,
        html: `<a href = '${URL}'><button> Verify email</button></a>`
    })
    //send mesagee to user
    res.send({message: "Verification link has been sent to your email"})
}
//forgt passwd
exports.forgetPassword = async (req,res) => {
    //check if email is valid or not
    let user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
    //generate pw reset link/token

    let token = await Token.create({
        user,
        token: crypto.randomBytes(16).toString('hex')
    })
    if(!token){
        return res.status(400).json({error: "Something went rong ,please try again later"})
    }

    //send link in email
      const URL = `http://localhost:5000/resetpassword/${token.token}`
    emailSender({
        from: "noreply@something.com",
        to: user.email,
        subject: "Password rest link",
        text: ` please Click on the given link or copy paste in browser to verify ${URL}`,
        html: `<a href = '${URL}'><button> Reset pwdl</button></a>`
    })
    //send message to user
    res.send({message: "password reset link has been sent to your email"})
}
//reset pass
exports.resetPassword = async (req,res) => {

    //check if token is valid or not
    let token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error: "Invalid token"})
    }
//find user
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error: "Something went wrong, please try again later"})
    }
//reset pw
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(req.body.password , salt)

    user.password = hashed_password
    user = await user.save()

    if(!user){

        return res.status(400).json({error: "Something went rong ,please try again later"})
    }
     //send message to user
     res.send({message: "password reset successfull"})
    }
//afai garne kam hru
        //user list = get all users
        // user details = getuserdetails
        //updateuser = user role
        //delete user = delete user
        //login/signin
        //jwt web token use grxam esko lagi

        exports.signin = async (req,res) =>{
            let{ email,password} = req.body
            //check email if regstered or not
            let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({error: "Email not registered"})
    }
      //check password if correct or not
            if(!bcrypt.compareSync(password, user.password)){
                return res.status(400).json({error: "Incorrect Password"})
            }
            // check if user is verified or not
            if(!user.isVerified){
                return res.status(400).json({error: "user not verified"})
            }
            //generate login token
            let token = jwt.sign({
                id: user._id,
                email,
                 role: user.role,
                 username: user.username},process.env.JWT_SECRET,{expiresIn: '24hr'})
           // set login data in cookie
           res.cookie("myCookie", token, {expiresIn:86400})
           const{_id, username,role} = user
                 //send token to user
                 res.send({token, user: {_id,username, email, role}})
        }

        //authorization

        //requiresSignin

        //authorise grna ko lagi use this code
        exports.requiresSignin = (req,res,next) =>expressjwt({
            secret: process.env.JWT_SECRET,
            algorithms: ['HS256']
        })(req,res,(error)=>{
            if(error){
            return res.status(401).json({error:"You must login to acces this function"})
        }
    next()
})

//require admin
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




