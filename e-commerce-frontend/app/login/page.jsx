import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <form className='w-10/12 md:w-2/3 xl:w-5/12 shadow-md m-auto rounded-md my-5 p-10'>
                <h1 className='text-center font-bold text-2xl mb-4'>Login Page</h1>
                <label htmlFor='email' className='text-xl'>Email</label>
                <input type='email' id='email' className='w-full px-4 py-2 border-2 rounded-md mb-4' />

                <label htmlFor='pwd' className='text-xl'>Password</label>
                <input type='password' id='pwd' className='w-full px-4 py-2 border-2 rounded-md mb-4' />

                <input type='checkbox' id='rem' className='me-2' /><label htmlFor='rem'>Remember me</label>
                <button className='bg-black py-3 rounded-md w-full text-white text-xl'>Login</button>

                <div className='flex justify-between'>
                    <span className='font-semibold'>Do not have an account?
                        <Link href={'/register'}>
                            Sign up
                        </Link>
                    </span>
                    <h3 className='font-semibold'>
                        <Link href={'/foretpassword'}>
                            Forgot password
                        </Link>
                    </h3>
                </div>
            </form>



        </>
    )
}

export default page