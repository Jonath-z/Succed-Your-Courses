import React from 'react'
import { FaFilter } from 'react-icons/fa';

const Search = ({onFocus,onChange}) => {
    return (
        <div className='flex flex-row justify-center items-center mt-5'>
            <input type='search' placeholder='Search your course'
                className='border-2 border-gray-300 pt-1 pb-1 pl-3 pr-3 font-Mulish rounded-full w-72'
                onFocus={onFocus}
                onChange={onChange}
            />
            <button className='bg-2778F0 pt-2 pb-2 pl-2 pr-2 rounded-xl ml-3'>
                <FaFilter className='text-2xl text-white' />
            </button>
        </div>
    );
}

export default Search
