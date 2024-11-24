import React from 'react'

const page = () => {
  return (
    <form className='w-10/12 md:w-2/3 xl:w-5/12 shadow-md m-auto rounded-md my-5 p-8'>
        <div className='flex justify-center mb-5'>
          <img 
            src='2.jpg' 
            alt='lock' 
            className='w-16 h-16 rounded-full'
          />
        </div>
        <h1 className='font-bold text-2xl text-center mb-4'>Forgot Your Password?</h1>
        <p className='text-center mb-5'>Enter your  email or phone and we’ll
        send  you a link to get back into your account</p>
  
       
    <input type='email' id='email' className='w-full px-4 py-2 border-2 rounded-md mb-4'placeholder='Enter your email or phone'/>

    <button className='w-full bg-black py-2 text-white text-xl'>Continue</button>
      

    </form>
  )
}

export default page