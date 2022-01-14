import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';

const Menu = () => {
    return (
        <div>
            <ul className='flex flex-col mt-5 font-Mulish'>
                <li className='flex flex-row items-center mt-3'><AiOutlineStar className='text-2xl' /> <span className='ml-2'>My Courses</span></li>
                <li className='flex flex-row items-center mt-3'><BsBookmark className='text-2xl'/> <span className='ml-2'>Explore Courses</span></li>
                <li className='flex flex-row items-center mt-3'><FiUser className='text-2xl'/> <span className='ml-2'>Account</span></li>
                <li className='flex flex-row items-center mt-3'><FiAlertTriangle className='text-2xl'/> <span className='ml-2'>Report a problem</span></li>
            </ul>
        </div>
    );
}

export default Menu;
