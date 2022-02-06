import React, { useState } from 'react';
import RegisterButton from '../buttons';
import encrypt from '../../services/uploadForm/encrypt';
import upload from '../../services/uploadForm/upload';
import handleRegisterSubmit from '../../services/handleRegisterSubmit';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actionsCreators } from '../../../../../../state';

const SignupForm = () => {
        const dispatch = useDispatch();
    const { signupFormData, authSignup } = bindActionCreators(actionsCreators, dispatch);
    const [isWrongPassword, setIsWrongPassword] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        if (handleRegisterSubmit(e).password === handleRegisterSubmit(e).confirmedPassword) {
            signupFormData(handleRegisterSubmit(e));
            authSignup(true);
            upload(
                handleRegisterSubmit(e).name,
                handleRegisterSubmit(e).email,
                encrypt(
                    handleRegisterSubmit(e).password)
            );
        } else (setIsWrongPassword(true));
    }
    
    return (
        <div>
            <form onSubmit={submitForm} className='flex flex-col justify-center items-center mt-3'>
                <input type='text' name='name' placeholder='Enter your full name' required className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80 mt-5 outlinne-none' />
                <input type='email' name='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80 mt-5 outlinne-none' required />
                <input type='password' name='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80 mt-5 outlinne-none' required />
                <input type='password' name='confirmedPassword' placeholder='Confirm Pasword' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80 mt-5 outlinne-none' required />
                {isWrongPassword && <p className='text-red-600 text-sm font-Mulish mt-3'>Wrong password</p>}
                <RegisterButton/>
            </form>
        </div>
    );
}

export default SignupForm;
