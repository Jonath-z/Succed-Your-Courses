import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../state';
import actionsType from '../../../../state/actions/action_types/actionType';
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Menu = () => {
    const dispatch = useDispatch();
    const { myCourse, exploreCourse, account, home } = bindActionCreators(actionsCreators, dispatch);
    const menuHandler = useSelector((state) => state.menuReducer);

    return (
        <div className='2xl:fixed 2xl:top-32 2xl:left-60 2xl:w-1/5 xl:fixed lg:fixed xl:w-2/12 lg:w-2/12 xl:top-32 lg:top-32 xl:left-2 lg:left-2 xl:border-2778F0 lg:border-2778F0'>
            <ul className='flex flex-col mt-5 font-Mulish'>
                <li className={`flex flex-row items-center mt-3 cursor-pointer ${(menuHandler === actionsType.HOME)? 'text-2778F0':'text-black'}`}
                    onClick={() => { home(actionsType.HOME) }} >
                    <AiOutlineHome className='text-2xl' />
                    <span className='ml-2'>Home</span>
                    
                </li>
                <li className={`flex flex-row items-center mt-3 cursor-pointer ${(menuHandler === actionsType.MY_COUSES)? 'text-2778F0':'text-black'}`}
                    onClick={() => { myCourse(actionsType.MY_COUSES) }} >
                    <AiOutlineStar className='text-2xl' />
                    <span className='ml-2'>My Courses</span>
                </li>
                <li className={`flex flex-row items-center mt-3 cursor-pointer ${(menuHandler === actionsType.EXPLORE_COURSES)? 'text-2778F0':'text-black'}`}
                    onClick={() => { exploreCourse(actionsType.EXPLORE_COURSES) }}>
                    <BsBookmark className='text-2xl' />
                    <span className='ml-2'>Explore Courses</span>
                </li>
                <li className={`flex flex-row items-center mt-3 cursor-pointer ${(menuHandler === actionsType.ACCOUNT)? 'text-2778F0':'text-black'}`}
                    onClick={() => { account(actionsType.ACCOUNT) }}>
                    <FiUser className='text-2xl' />
                    <span className='ml-2'>Account</span>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
