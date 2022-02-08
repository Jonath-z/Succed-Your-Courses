import React from 'react';
import Profile from './profile/Profile';
import Settings from './setttings';
import { useHistory } from 'react-router-dom';
import browserRoutes from '../../../router/_broswerRoute/router';
import { LocalStorage } from '../../helper/localStorage';
import { deleteAccount } from './services';
import { useUser } from '../../context';

const Account = () => {
    const history = useHistory();
    const user = useUser();
    const logout = () => {
        browserRoutes.defaulRoute(history);
        LocalStorage.clear();
    }

    return (
        <div className=' flex flex-col sm:overflow-y-scroll xsm:overflow-y-scroll 2xl:w-2/6 md:w-2/3 lg:w-2/4 xl:w-2/4'>
            <p className='font-Poppins text-xl mt-1 ml-2 mb-2'>Profile</p>
            <Profile />
            <div className='mt-10'>
                <p className='font-Poppins text-xl mt-1 ml-2 mb-2'>Settings</p>
                <Settings />
            </div>
            <div className='mt-20 ml-3 pb-4'>
                <p className='font-Poppins cursor-pointer' onClick={logout}>Logout</p>
                <p className='font-Poppins text-red-600 mt-2 cursor-pointer'
                    onClick={() => {
                        deleteAccount(user);
                        browserRoutes.defaulRoute(history);
                    }}
                >Delete Account</p>
            </div>
        </div>
    );
};

export default Account;
