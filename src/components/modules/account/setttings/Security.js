import React, { useState } from 'react';
import { useUser } from '../../../context';
import { updateNewPassword } from '../services';

const Security = () => {
    const user = useUser();
    const [password, setPassword] = useState('');
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

    const handleUpdateConfirmation = () => {
        setIsPasswordUpdated(true) 
    }

    const updatePassword = () => {
        updateNewPassword(password, user.id);
        setTimeout(handleUpdateConfirmation, 2000);
        setPassword('');
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            {!isPasswordUpdated && <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3'>
                <div className='pl-5 pr-5'>
                    <p className='font-Poppins flex flex-col'>
                        Update Password
                        <span className='font-Mulish text-xs'>
                            <input type='password' placeholder='' className='bg-white mt-1 border outline-none w-full pt-1 pb-1 pl-2 2xl:pt-2 2xl:pb-2 2xl:rounded-md' onChange={handlePassword}></input>
                        </span>
                    </p>
                    <p className='font-Poppins float-right text-xs text-2778F0 pt-2 cursor-pointer mr-3' onClick={updatePassword}>Update</p>
                </div>
            </div>}
            {isPasswordUpdated && <div className='flex  shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3 justify-center items-center '>
                <div className='pl-5 pr-5'>
                    <p className='font-Poppins  text-green-600'>
                        Password Updated !
                    </p>
                </div>
            </div>}
        </div>
    );
};

export default Security;
