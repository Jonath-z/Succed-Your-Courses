import React from 'react'
import Login from './login/Login'
import Signup from './signup/Signup';
import { useSelector } from 'react-redux';

const AuthIndex = () => {
    const isSignup = useSelector((state) => state.auth);

    return (
        <div className=' 2xl:mt-10 xl:mt-10'>
            <div className='flex flex-row'>
                <div
                    className='sm:h-32 md:h-32 sm:w-32 md:w-32 rounded-full bg-6C63FF opacity-50 -mt-10 -ml-12 2xl:hidden'></div>
                <div
                    className='sm:h-32 md:h-32 sm:w-32 md:w-32 rounded-full bg-6C63FF opacity-50 -mt-20 -ml-12 2xl:hidden'></div>
            </div>
            {isSignup &&<Signup />}
            {!isSignup &&<Login />}
        </div>
    );
}

export default AuthIndex
