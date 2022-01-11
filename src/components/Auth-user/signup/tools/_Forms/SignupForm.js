import React from 'react'

const SignupForm = () => {
    return (
        <div>
            <form className='flex flex-col justify-center items-center mt-3'>
                <input type='text' placeholder='Enter your full name' required className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none'/>
                <input type='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required />
                <input type='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required/>
                <input type='password' placeholder='Confirm Pasword' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required/>
            </form>
        </div>
    )
}

export default SignupForm
