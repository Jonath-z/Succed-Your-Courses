import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../state';
import actionsType from '../../../../state/actions/action_types/actionType';
import { AiOutlineHome } from 'react-icons/ai';

const Menu = () => {
    const dispatch = useDispatch();
    const { myCourse, exploreCourse, account,home } = bindActionCreators(actionsCreators, dispatch);
    return (
        <div>
            <ul className='flex flex-col mt-5 font-Mulish'>
                <li className='flex flex-row items-center mt-3 cursor-pointer'
                    onClick={() => { home(actionsType.HOME) }} >
                    <AiOutlineHome className='text-2xl' />
                    <span className='ml-2'>Home</span>
                    
                </li>
                <li className='flex flex-row items-center mt-3 cursor-pointer'
                    onClick={() => { myCourse(actionsType.MY_COUSES) }} >
                    <AiOutlineStar className='text-2xl' />
                    <span className='ml-2'>My Courses</span>
                </li>
                <li className='flex flex-row items-center mt-3 cursor-pointer'
                    onClick={() => { exploreCourse(actionsType.EXPLORE_COURSES) }}>
                    <BsBookmark className='text-2xl' />
                    <span className='ml-2'>Explore Courses</span>
                </li>
                <li className='flex flex-row items-center mt-3 cursor-pointer'
                    onClick={() => { account(actionsType.ACCOUNT) }}>
                    <FiUser className='text-2xl' />
                    <span className='ml-2'>Account</span>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
