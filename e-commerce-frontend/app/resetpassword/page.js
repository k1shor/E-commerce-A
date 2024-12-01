import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <>
      <form className='w-10/12 md:w-2/3 xl:w-5/12 shadow-md m-auto rounded-md my-5 p-10'>
        <h1 className='text-center text-3xl mb-9'>Oops!</h1>

        <div className='flex justify-center mb-5'>
          <img
            src='1.jpg'
            alt='Question Mark'
            className='w-16 h-16 rounded-full'
          />
        </div>


        <p className='text-center mb-5'>It seems that you've forgotten your password.</p>

        <input type='password' id='password' className='w-full px-4 py-2 border-2 rounded-md mb-4' placeholder='Enter new password' />


        <div className='flex justify-center'>
          <button className='w-1/2 bg-black text-white py-3 mb-6'>
            Reset your password
          </button>
        </div>

        <p>If you did not make this request, just ignore this email. Otherwise please click the button above the reset your password</p>

      </form>

    </>
  )
}

export default page