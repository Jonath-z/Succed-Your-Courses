import React from 'react';
import { imagesArray } from '../tools/images';
import NextButton from '../tools/buttons/NextButton';
import GetStaredButton from '../tools/buttons/GetStaredButton';
import { lenght } from '../functions/nextHundler';
import { texts } from '../tools/texts';
import { nextImageHundler} from '../functions/nextHundler';
import { useState } from 'react';
// import ProgressPoints from '../tools/progress/ProgressPoints';

const SplashScreen = () => {
    const [imageindex, setimageIndex] = useState(0);
    let image = imagesArray[imageindex];
    let text = texts[imageindex];
    return (
        <div>
            <div className='text-right mr-7 sm:mt-10 xsm:mt-6 font-Mulish'>skip</div>
            <div className='grid grid-rows-2 justify-center items-center'>
                <div>
                    <img src={image} alt='splash-screen' className='w-90 h-90'/>
                </div>
                <div>
                    <p className='text-2xl font-extrabold font-Poppins'>{text.title}</p><br />
                    <p className='font-Mulish'>{text.subtitle}</p><br />
                    {/* <ProgressPoints/> */}
                </div>
            </div>
            <div>
                {imageindex !== lenght ?
                    <NextButton nextHundler={() => {
                    nextImageHundler(setimageIndex);
                }
                } /> :
                    <GetStaredButton/>
                }
            </div>
                

        </div>
    );
}

export default SplashScreen;