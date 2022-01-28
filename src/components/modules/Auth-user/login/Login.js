import React from 'react';
import Welcome from './Welcome'
import LoginForm from './tools/_form';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../state';

const Login = () => {
    const dispatch = useDispatch();
    const { authLogin } = bindActionCreators(actionsCreators, dispatch);
    
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <Welcome />
                <div>
                    <LoginForm />
                </div>
                <div>
                    <p className='font-Mulish mt-5'>Don't have an account? <span className='font-Poppins text-2778F0 cursor-pointer' onClick={() => { authLogin(true) }}>Sign up</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login
