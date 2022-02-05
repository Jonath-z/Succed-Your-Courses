import React from 'react';
import { imageObject } from '../../../static/images';

const PageNotFound = ({statusDescription}) => {
    return (
        <div className='justify-center items-center w-sceen ml-5 mr-5'>
            <img src={imageObject.PAGE_NOTE_FOUND_IMAGE} alt='page not found' />
            <p className='mt-4 font-Poppins text-3xl text-center'>
                {statusDescription}
            </p>
        </div>
    );
};

export default PageNotFound;
