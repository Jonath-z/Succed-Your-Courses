import React from 'react';
import Menu from './menu';
import { IoCloseOutline } from 'react-icons/io5';
import { useUser } from '../../context';

const SideBar = ({hideMenu}) => {
    const user = useUser();
    return (
        <div className='absolute top-5 lef-0 bg-white flex flex-col justify-center items-center pl-5 pr-5 pt-5 pb-5 shadow-2xl rounded-r-lg'>
            <div className='w-full'>
                <IoCloseOutline onClick={hideMenu} className='mb-5 float-right text-2xl font-Mulish cursor-pointer' />
                </div>
                <div className='w-32 h-32 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                    <p className='font-Poppins text-5xl'>{user.name.charAt(0).toUpperCase()}</p>
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
