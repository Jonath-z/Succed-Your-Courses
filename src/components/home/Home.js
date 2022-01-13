import React from 'react'
import User from '../user/User';
import AllCourses from '../courses/AllCourses';
import Search from '../search/Search';
import EnrolledCourses from '../courses/EnrolledCourses';

const Home = () => {
    return (
        <div>
            <div>
                <User />
            </div>
            <div>
                <EnrolledCourses/>
            </div>
            <div>
                <Search/>
            </div>
            <div>
                <AllCourses/>
            </div>
        </div>
    );
}

export default Home
