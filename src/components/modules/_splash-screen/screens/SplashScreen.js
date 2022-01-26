import React from 'react';
import { imagesArray } from '../tools/images';
import NextButton from '../tools/buttons/NextButton';
import GetStaredButton from '../tools/buttons/GetStaredButton';
import { lenght } from '../services/nextHundler';
import { texts } from '../tools/texts';
import { nextImageHundler} from '../services/nextHundler';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import browserRoutes from '../../../../router/_broswerRoute/router';
// import ProgressPoints from '../tools/progress/ProgressPoints';

const SplashScreen = () => {
    const [imageindex, setimageIndex] = useState(0);
    let image = imagesArray[imageindex];
    let text = texts[imageindex];
    const history = useHistory();

    return (
        <div>
            <div className='text-right mr-7 sm:mt-10 xsm:mt-6 font-Mulish cursor-pointer' onClick={() => browserRoutes.auth(history)}>skip</div>
            <div className='grid grid-rows-2 justify-center items-center text-center mt-10'>
                <div>
                    <img src={image} alt='splash-screen' className='w-90 h-90' />
                </div>
                <div>
                    <p className='text-2xl font-extrabold font-Poppins pl-2 pr-2'>{text.title}</p><br />
                    <p className='font-Mulish pl-1 pr-1'>{text.subtitle}</p><br />
                    {/* <ProgressPoints/> */}
                </div>
            </div>
            <div>
                {imageindex !== lenght ?
                    <NextButton nextHundler={() => {
                        nextImageHundler(setimageIndex);
                    }
                    } /> :
                    <GetStaredButton />
                }
            </div>
        </div>
    );
}

export default SplashScreen;
