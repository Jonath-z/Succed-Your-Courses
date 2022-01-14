import React from 'react';
import { useSelector } from 'react-redux';
import Menu from './menu/Menu';
import {IoCloseOutline} from 'react-icons/io5'

const SideBar = ({hideMenu}) => {
    const user = useSelector((state) => state.fetchUsers);
    return (
        <div className='absolute top-0 lef-0 bg-white flex flex-col justify-center items-center pl-10 pr-10 pt-10 pb-10 shadow-lg rounded-r-lg'>
             <IoCloseOutline onClick={hideMenu} className=' mb-5 left-0 float-right mr-5 text-3xl' />
                <div className='w-24 h-24 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                    <p className='font-Poppins text-4xl'>{user.name.charAt(0).toUpperCase()}</p>
                </div>
                <div>
                    <p className='font-Poppins mt-5'>{user.name}</p>
                </div>
                <div>
                    <Menu />
                </div>
            </div>
    );
}

export default SideBar
