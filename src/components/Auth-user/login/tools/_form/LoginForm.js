import React from 'react'

export const LoginForm = () => {
    return (
        <div>
            <form className='flex flex-col justify-center items-center mt-3'>
                <input type='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required  />
                <input type='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required  />
            </form>
        </div>
    );
}

export default LoginForm;
