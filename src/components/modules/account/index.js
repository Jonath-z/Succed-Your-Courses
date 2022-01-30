import React from 'react';
import Profile from './profile/Profile';
import Settings from './setttings';

const Account = () => {
    return (
        <div className=' flex flex-col overflow-y-scroll'>
            <p className='font-Poppins text-xl mt-1 ml-2 mb-2'>Profile</p>
            <Profile />
            <div className='mt-10'>
                <p className='font-Poppins text-xl mt-1 ml-2 mb-2'>Settings</p>
                <Settings/>
            </div>
            <div  className='mt-20 ml-3 pb-4'>
                <p className='font-Poppins'>Logout</p>
                <p className='font-Poppins text-red-600 mt-2'>Delete Account</p>
            </div>
        </div>
    );
};

export default Account;
