import React from 'react';
import { imageObject } from '../../_splash-screen/tools/images';

const Welcome = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-2xl font-extrabold font-Poppins mt-10 pl-2 pr-2'>
                    Welcome to <span className='text-2778F0'>succed your courses</span>
                </h1>
                <p className='font-Mulish'>
                    Let's make your student's life easy
                </p>
            </div>
            <div>
                <img src={imageObject.SUCCED_YOUR_COURSES_IMAGE} alt='succed your course'/>
            </div>
        </div>
    );
}

export default Welcome
