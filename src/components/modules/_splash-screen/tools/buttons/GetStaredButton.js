import React from 'react';
import browserRoutes from '../../../../../router/_broswerRoute/router';
import { useHistory } from 'react-router-dom';

const GetStaredButton = () => {
    const history = useHistory();

    return (
        <div className='w-full absolute sm:bottom-6 xsm:bottom-4 flex justify-center items-center'>
            <button
                className='font-Poppins bg-2778F0 sm:w-96 xsm:w-80 h-12 rounded-xl text-center text-white font-extrabold'
                onClick={() => browserRoutes.auth(history)}
            >Get stared</button>
        </div>
    );
}

export default GetStaredButton
