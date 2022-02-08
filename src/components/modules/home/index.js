import React, { useState } from 'react'
import User from '../user';
import AllCourses from '../../modules/courses/AllCourses';
import Search from '../search';
import EnrolledCourses from '../../modules/courses/EnrolledCourses';
import { useSelector } from 'react-redux';
import actionsType from '../../../state/actions/action_types/actionType';
import Account from '../account';
import { IoIosArrowDown } from 'react-icons/io';
import SearchedCourses from '../search/SearchedCourses';
import MediaQuery from 'react-responsive';
import Menu from '../sidBar/menu';
import EnrolledCoursesMedia from '../courses/mediaQuery';

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
                        <MediaQuery minWidth={1024}>
                            <Menu />
                        </MediaQuery>
                    </div>
                </div>
            );
        case actionsType.EXPLORE_COURSES:
            return (
                <>
                <div className='flex flex-col fixed h-screen w-screen'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Explore Courses'} />
                    </div>
                    <MediaQuery minWidth={1024}>
                        <Menu />
                    </MediaQuery>
                    <div className='pb-20 overflow-y-scroll 2xl:mt-32 md:mt-20 mt-20'>
                        <AllCourses />
                    </div>
                    </div>
                    </>
            );
        case actionsType.ACCOUNT:
            return (
                <div className='flex flex-col fixed h-screen w-screen overflow-y-scroll'>
                    <div className='fixed top-0 w-screen bg-white'>
                        <User menu={'Account'} />
                    </div>
                    <MediaQuery minWidth={1024}>
                        <Menu />
                    </MediaQuery>
                    <div className='mt-20 2xl:flex 2xl:justify-center xl:flex xl:justify-center lg:flex lg:justify-center md:justify-center md:flex'>
                        <Account />
                    </div>
                </div>
            );
        case actionsType.HOME:
            return (
                <>
                    <div className='flex flex-col fixed h-screen w-screen 2xl:relative'>
                        <div className='fixed top-0 w-screen 2xl:w-full bg-white'>
                            <User menu={'Home'} />
                        </div>
                        <div className='mt-20'>
                            {!isSearch &&
                                <>
                                    <MediaQuery maxWidth={1023}>
                                        <EnrolledCourses flexDirection={'flex-row'} />
                                    </MediaQuery>
                                    <MediaQuery minWidth={1024}>
                                        <EnrolledCoursesMedia />
                                    </MediaQuery>
                                </>
                            }
                            <MediaQuery minWidth={1024}>
                                <Menu />
                            </MediaQuery>
                        </div>
                        <div className='flex flex-row justify-center items-start'>
                            {isSearch && <IoIosArrowDown className='text-3xl mt-7 mr-3' onClick={noFucus} />}
                            <Search
                                onFocus={onFucus}
                                onChange={onChange}
                            />
                        </div>
                        <div className='pb-20 sm:overflow-y-scroll xsm:overflow-y-scroll '>
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
                <div className='flex flex-col fixed h-screen w-screen 2xl:relative'>
                    <div className='fixed top-0 w-screen 2xl:w-full bg-white'>
                        <User menu={'Home'} />
                    </div>
                    <div className='mt-20'>
                        {!isSearch &&
                            <>
                                <MediaQuery maxWidth={1023}>
                                    <EnrolledCourses flexDirection={'flex-row'} />
                                </MediaQuery>
                                <MediaQuery minWidth={1024}>
                                    <EnrolledCoursesMedia />
                                </MediaQuery>
                            </>
                        }
                        <MediaQuery minWidth={1024}>
                            <Menu />
                        </MediaQuery>
                    </div>
                    <div className='flex flex-row justify-center items-start'>
                        {isSearch && <IoIosArrowDown className='text-3xl mt-7 mr-3' onClick={noFucus} />}
                        <Search
                            onFocus={onFucus}
                            onChange={onChange}
                        />
                    </div>
                    <div className='pb-20 sm:overflow-y-scroll xsm:overflow-y-scroll '>
                        {!isSearch ?
                            <AllCourses /> :
                            <SearchedCourses
                                inputValue={inputValue}
                            />
                        }
                    </div>
                </div>
            );
    }
}

export default Home
