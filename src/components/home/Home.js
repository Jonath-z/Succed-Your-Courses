import React from 'react'
import User from '../user/User';
import AllCourses from '../courses/AllCourses';
import Search from '../search/Search';
import EnrolledCourses from '../courses/EnrolledCourses';

const Home = () => {
    return (
        <div className='flex flex-col fixed h-screen w-screen'>
            <div className='fixed top-0 w-screen bg-white'>
                <User />
            </div>
            <div className='mt-20'>
                <EnrolledCourses />
            </div>
            <div>
                <Search />
            </div>
            <p className='font-Poppins ml-5 mt-5 pb-1'>All course</p>
            <div className='pb-20 overflow-y-scroll'>
                    <AllCourses />
            </div>
        </div>
    );
}

export default Home
