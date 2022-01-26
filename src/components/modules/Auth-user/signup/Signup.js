import React from 'react'
import SignupForm from './tools/_Forms'
import { useDispatch } from 'react-redux'
import { actionsCreators } from '../../../../state'
import { bindActionCreators } from 'redux'

const Signup = () => {
    const dispatch = useDispatch();
    const { authSignup } = bindActionCreators(actionsCreators, dispatch);
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='text-2xl font-extrabold font-Poppins mt-20'>Welcome abroad</p>
                </div>
                <div>
                    <SignupForm />
                </div>
                <div>
                    <p className='font-Mulish mt-5'>Already have an account? <span className='font-Poppins text-2778F0 cursor-pointer' onClick={() => { authSignup(false) }}>Sign in</span></p>
                </div>
            </div>
        </div>
    );
}

export default Signup
