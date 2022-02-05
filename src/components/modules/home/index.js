import React, { useState } from 'react'
import User from '../user';
import AllCourses from '../../modules/courses/AllCourses';
import Search from '../search';
import EnrolledCourses from '../../modules/courses/EnrolledCourses';
import { useSelector } from 'react-redux';
import actionsType from '../../../state/actions/action_types/actionType';
// import { DispatchAllcourses } from '../../../hooks';
import Account from '../account';
import { IoIosArrowDown } from 'react-icons/io';
import SearchedCourses from '../search/SearchedCourses';

const Home = () => {
    const menuHandler = useSelector((state) => state.menuReducer);
    const [isSearch, setIsSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');

    
    // DispatchAllcourses();

    const onFucus = () => {
        setIsSearch(true);
    }
    const noFucus = () => {
        setIsSearch(false);
    }

    const onChange = (e) => {
        // console.log(e.target.value.toUpperCase());
        setInputValue(e.target.value.toUpperCase())
    }

    switch (menuHandler) {
        case actionsType.MY_COUSES:
            return (
                <div className='flex flex-col h-screen w-screen'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'My Courses'} />
                    </div>
                    <div className='mt-20'>
                        <EnrolledCourses
                            flexDirection={'flex-col'}
                            marginTop={'mt-5'}
                        />
                    </div>
                </div>
            )
        case actionsType.EXPLORE_COURSES:
            return (
                <div className='flex flex-col fixed h-screen w-screen'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Explore Courses'} />
                    </div>
                    <p className='font-Poppins ml-5 mt-20 pb-1'>All course</p>
                    <div className='pb-20 overflow-y-scroll'>
                        <AllCourses />
                    </div>
                </div>
            )
        case actionsType.ACCOUNT:
            return (
                <div className='flex flex-col fixed h-screen w-screen overflow-y-scroll'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Account'} />
                    </div>
                    <div className='mt-20'>
                        <Account />
                    </div>
                </div>
            )
        case actionsType.REPORT_PROBLEM:
            return (
                <div className='flex flex-col fixed h-screen w-screen'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Report a Problem'} />
                    </div>
                </div>
            )
        case actionsType.HOME:
            return (
                <>
                    <div className='flex flex-col fixed h-screen w-screen'>
                        <div className='fixed top-0 w-screen bg-white'>
                            <User menu={'Home'} />
                        </div>
                        <div className='mt-20'>
                            {!isSearch && <EnrolledCourses flexDirection={'flex-row'} />}
                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            {isSearch && <IoIosArrowDown className='text-3xl mt-7 mr-3' onClick={noFucus} />}
                            <Search
                                onFocus={onFucus}
                                onChange={onChange}
                            />
                        </div>
                        <p className='font-Poppins ml-5 mt-5 pb-1'>All course</p>
                        <div className='pb-20 overflow-y-scroll'>
                            {!isSearch ?
                                <AllCourses /> :
                                <SearchedCourses
                                    inputValue={inputValue}
                                />
                            
                            }
                        </div>
                    </div>
                </>
            );
        default:
            return (
                <div className='flex flex-col fixed h-screen w-screen'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Home'} />
                    </div>
                    <div className='mt-20'>
                        {!isSearch && <EnrolledCourses flexDirection={'flex-row'} />}
                    </div>
                    <div className='flex flex-row justify-center items-start'>
                        {isSearch && <IoIosArrowDown className='text-3xl mt-7 mr-3' onClick={noFucus} />}
                        <Search
                            onFocus={onFucus}
                            onChange={onChange}
                        />
                    </div>
                    <p className='font-Poppins ml-5 mt-5 pb-1'>All course</p>
                    <div className='pb-20 overflow-y-scroll'>
                        {!isSearch ?
                            <AllCourses /> :
                            <SearchedCourses
                                inputValue={inputValue}
                            />
                            
                        }
                    </div>
                </div>
            )
    }
}

export default Home
