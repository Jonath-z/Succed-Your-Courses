import React, { useState } from 'react'
import { RiMenu2Line } from 'react-icons/ri';
import SideBar from '../sidBar/SideBar';
import { useUser } from '../../context';
import MediaQuery from 'react-responsive';


const User = ({ menu }) => {
    
    const [showSidebar, setShowsidebar] = useState(false);
    const user = useUser();
    
    const onClick = () => {
        setShowsidebar(!showSidebar);
    };

    const refresh = () => {
        window.location.reload();
    }

    return (
        <div className='flex flex-row justify-between items-center mt-3 mr-3 ml-3 pb-3 2xl:justify-around 2xl:mr-0 2xl:ml-0'>
            <MediaQuery minWidth={300} maxWidth={1023}>
                <RiMenu2Line className='text-3xl cursor-pointer' onClick={onClick} />
                {showSidebar &&
                    <SideBar hideMenu={onClick} />
                }
            </MediaQuery>
            <MediaQuery minWidth={1024}>
                <div>
                    <p className='font-Poppins text-xl cursor-pointer' onClick={refresh}>
                        Succed your 
                        <span className='text-2778F0'> courses</span>
                    </p>
                </div>
            </MediaQuery>
            <div>
                <p className='font-Poppins'>{menu}</p>
            </div>
            <div className='h-10 w-10 rounded-full text-white bg-2778F0 text-center flex justify-center items-center'>
                {user !== undefined && <p className='font-Poppins cursor-pointer'>{user.name.charAt(0).toUpperCase()}</p>}
            </div>
        </div>
    );
}

export default User;
