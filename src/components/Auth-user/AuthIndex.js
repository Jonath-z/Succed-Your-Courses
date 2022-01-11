import React from 'react'
import Login from './login/Login'
import Signup from './signup/Signup';
import { useSelector } from 'react-redux';

const state = true;

const AuthIndex = () => {
    const isSignup = useSelector((state) => state.auth);
    console.log(isSignup);

    return (
        <div>
            <div className='flex flex-row'>
                <div className='h-32 w-32 rounded-full bg-6C63FF opacity-50 -mt-10 -ml-12'></div>
                <div className='h-32 w-32 rounded-full bg-6C63FF opacity-50 -mt-20 -ml-12'></div>
            </div>
            {isSignup && <Signup />}
            {!isSignup && <Login />}
        </div>
    );
}

export default AuthIndex
