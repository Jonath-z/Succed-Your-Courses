import React, { useEffect } from 'react'
import LoginButton from '../button/LoginButton';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../../state';
import { useState } from 'react';
import handleLoginSubmit from '../../functions/handleLoginForm';
import { useSelector } from 'react-redux';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const { loginFormData,users} = bindActionCreators(actionsCreators, dispatch);
    const [isWrongPassword, setIsWrongPassword] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        loginFormData(handleLoginSubmit(e));
        // } else (setIsWrongPassword(true));
    }

    return (
        <div>
            <form onSubmit={submitForm} className='flex flex-col justify-center items-center mt-3'>
                <input type='email' name='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required  />
                <input type='password' name='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required />
                {isWrongPassword && <p className='text-red-600 text-sm font-Mulish mt-3'>Wrong password</p>}
                <LoginButton/>
            </form>
        </div>
    );
}

export default LoginForm;
