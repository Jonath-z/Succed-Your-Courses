import React,{useState} from 'react';
import GeneralInfo from './GeneralInfo';
import Payement from './Payement';
import Security from './Security';
import { IoIosArrowDown,IoIosArrowForward } from 'react-icons/io';

const Settings = () => {
    const [generalInfo, setGeneralInfo] = useState(false);
    const [security, setSecurity] = useState(false);
    const [payement, setPayement] = useState(false);

    const toggleGeneralInfo = () => {
        setGeneralInfo(!generalInfo);
    }

    const toggleSecurity = () => {
        setSecurity(!security);
    }

    const togglePayement = () => {
        setPayement(!payement);
    }

    return (
        <div className='flex flex-col justify-center'>
            <div>
                <p className='flex flex-row justify-between font-Poppins ml-12 mt-5'>
                    General Info
                    <span className='mr-5 text-xl cursor-pointer' onClick={toggleGeneralInfo}> {!generalInfo ? <IoIosArrowForward/> : <IoIosArrowDown/>} </span>
                </p>
                {generalInfo && <GeneralInfo />}
            </div>
            <div>
                <p className='flex flex-row justify-between font-Poppins ml-12 mt-5'>
                    security
                    <span className='mr-5 text-xl cursor-pointer' onClick={toggleSecurity}> {!security ? <IoIosArrowForward/> : <IoIosArrowDown/>}</span>
                </p>
                {security && <Security />}
            </div>
            <div>
                <p className='flex flex-row justify-between font-Poppins ml-12 mt-5'>
                    Payement
                    <span className='mr-5 text-xl cursor-pointer' onClick={togglePayement}> {!payement ? <IoIosArrowForward/> : <IoIosArrowDown/>} </span>
                </p>
                {payement && <Payement />}
            </div>
        </div>
    );
};

export default Settings;
