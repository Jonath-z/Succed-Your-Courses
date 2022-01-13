import React from 'react'
import { RiMenu2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const User = () => {
    const user = useSelector((state) => state.fetchUsers);

    return (
        <div className='flex flex-row justify-between items-center mt-3 mr-3 ml-3'>
            <RiMenu2Line className='text-3xl cursor-pointer'/>
            <div>
                <p className='font-Poppins'>Explore Courses</p>
            </div>
            <div className='h-10 w-10 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                <p className='font-Poppins'>{user.name.charAt(0).toUpperCase()}</p>
            </div>
        </div>
    );
}

export default User
