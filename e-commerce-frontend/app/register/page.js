import React from 'react'

const page = () => {
  return (
    <>
    <div className='h-150vh bg-slate-600 py-8 px-8' >
    <form className='bg-slate-400 w-[400px] h-auto bg-slate-400 p-10 my-5 shadow-lg m-auto rounded-md'>
    <h1 className='text-center font-bold underline text-2xl mb-5'>REGISTER</h1>
    <label htmlFor="username" className='text-l'>Name</label>
      <input type="text" id='username' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3'  />

      <label htmlFor="email" className='text-l'>Email</label>
      <input type="email" id='email' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3' />

      <label htmlFor="phone" className='text-l'>Phone</label>
      <input type="phone" id='phone' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3' />

      <label htmlFor="dob" className='text-l'>Date of birth</label>
      <input type="date" id='dob' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3' />


      <label htmlFor="address" className='text-l'>Address</label>
      <select id="add" className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3' defaultValue="">
        <option value="" disabled>Select your city</option>
        <option value="Ktm">Kathmandu</option>
        <option value="lal">Lalitpur</option>
        <option value="pkr">Pokhara</option>
        <option value="bkt">Bhaktapur</option>
        <option value="btn">Biratnagar</option>
      </select>

      <label htmlFor="pwd" className='text-l'>Password</label>
      <input type="password" id='pwd' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3'></input>

      <label htmlFor="pwd" className='text-l '> Confirm Password</label>
      <input type="password" id='pwd' className='w-full px-4 outline-gray-500 border-2 rounded-md mb-3'></input>

      <button className='bg-gray-700 py-2 w-full rounded-md hover:bg-gray-500 active:bg-blue-600 hover:font-bold text-white'>Register</button>

      <div className='flex justify-between mt-3'>
        <span>Already have an account? Sign in</span>
      </div>


</form>
</div>
    </>
  )
}

export default page