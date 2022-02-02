import React from 'react';

const LoginButton = ({isDisabled}) => {
    return (
        <div className='w-full absolute sm:bottom-6 xsm:bottom-4 flex justify-center items-center'>
            <button type='submit' className='font-Poppins bg-2778F0 sm:w-96 xsm:w-80 h-12 rounded-xl text-center text-white font-extrabold' disabled={isDisabled}>Login</button>
        </div>
    )
}

export default LoginButton
