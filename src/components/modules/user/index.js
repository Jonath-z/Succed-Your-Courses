import React, { useState } from 'react'
import { RiMenu2Line } from 'react-icons/ri';
import SideBar from '../sidBar/SideBar';
import { useUser } from '../../context';


const User = ({ menu }) => {
    
    const [showSidebar, setShowsidebar] = useState(false);
    const user = useUser();
    
    const onClick = () => {
        setShowsidebar(!showSidebar);
    };

    return (
        <div className='flex flex-row justify-between items-center mt-3 mr-3 ml-3 pb-3'>
            <RiMenu2Line className='text-3xl cursor-pointer' onClick={onClick} />
            {showSidebar &&
                <SideBar hideMenu={onClick} />
            }
            <div>
                <p className='font-Poppins'>{menu}</p>
            </div>
            <div className='h-10 w-10 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                <p className='font-Poppins cursor-pointer'>{user.name.charAt(0).toUpperCase()}</p>
            </div>
        </div>
    );
}

export default User;
