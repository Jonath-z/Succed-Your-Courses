import React from 'react';
import EnrolledCourses from '../courses/EnrolledCourses';
import AllCourses from '../courses/AllCourses';
import Search from '../search';

const ExploreCourses = () => {
    return (
        <div className='fixed w-screen h-screen'>
            <div className='mt-20'>
                <EnrolledCourses />
            </div>
            <div>
                <Search />
            </div>
            <p className='font-Poppins ml-5 mt-5 pb-1'>All course</p>
            <div className='pb-20 overflow-scroll'>
                <AllCourses />
            </div>
        </div>
    );
}

export default ExploreCourses
