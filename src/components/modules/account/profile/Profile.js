import React from 'react';
import { useUser,useUpdateUser } from '../../../context';

const Profile = () => {
    const user = useUser();
    const updateProfile = useUpdateUser();

    return (
        <div className='flex flex-row items-center justify-center shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl'>
            <div className='w-20 h-20 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                <p className='text-4xl'>{user.name.charAt(0).toUpperCase()}</p>
            </div>
            <div className='pl-5 2xl:pl-10'>
                <p className='font-Poppins flex flex-col'>
                {user.name}
                    <span className='font-Mulish text-xs'>{user.email}</span>
                    {user.phone && <span className='font-Mulish text-xs'>{user.phone}</span>}
                </p>
                <p className='font-Poppins float-right text-xs text-2778F0 pt-2 cursor-pointer mr-3' onClick={updateProfile}>Update Profile</p>
            </div>
        </div>
    );
};

export default Profile;
