import React from 'react'
import User from '../user/User';
import Courses from '../courses/Courses';

const Home = () => {
    return (
        <div>
            <div className='absolute top-0 left-0 right-0 bg-pink-900 bottom-0 text-white'>
                <User />
            </div>
            <div className='absolute bottom-0  left-0 right-0 top-60 bg-white pb-20 rounded-tl-3xl rounded-tr-3xl '>
                <Courses/>
            </div>
        </div>
    );
}

export default Home
