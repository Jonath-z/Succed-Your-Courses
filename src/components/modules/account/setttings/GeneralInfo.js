import React, { useState } from 'react';
import { useUser} from '../../../context';
import { updateNewEmail, updateNewName, updateNewPhone } from '../services';


function GeneralInfo() {
    const user = useUser();

    const [isUpdateEmail, setIsUpdateEmail] = useState(false);
    const [isUpdatePhone, setIsUpdatePhone] = useState(false);
    const [isUpdateName, setIsUpdateName] = useState(false);
    const [updateComplete, setUpdatecomplete] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')

    const updateEmail = () => {
        setIsUpdateEmail(!isUpdateEmail);
    }

    const updatePhone = () => {
        setIsUpdatePhone(!isUpdatePhone);
    }

    const updateName = () => {
        setIsUpdateName(!isUpdateName);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
        
    }

    const submitName = () => {
        console.log(user);
        updateNewName(name, user.id);
        setTimeout(setUpdatecomplete(true), 2000);
        setName('');
    }

    const submitEmail = () => {
        updateNewEmail(email, user.id);
        setTimeout(setUpdatecomplete(true), 2000);
        setEmail('')
    }

    const submitPhone = () => {
        updateNewPhone(phone, user.id);
        setTimeout(setUpdatecomplete(true), 2000);
        setPhone('');
    }

    return (
        <>
            {!updateComplete ?
                <div>
                <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3'>
                    <div className='pl-5 pr-5'>
                        <p className='font-Poppins flex flex-col'>Name</p>
                        {!isUpdateName && <p className='font-Mulish text-xs'>{user.name}</p>}
                        {!isUpdateName && <p className='font-Poppins float-right text-xs text-2778F0 pt-2 cursor-pointer mr-3' onClick={updateName}>Update</p>}
                        {isUpdateName && <div>
                            <input type='text' placeholder='Enter new name' className='mt-4 font-Mulish w-full border pl-2 outline-none 2xl:pt-2 2xl:pb-2 2xl:rounded-md'
                                onChange={handleName}
                            />
                            <button className='font-Poppins bg-2778F0 text-white w-full mt-4 pt-2 pb-2 rounded-lg'
                                onClick={submitName}
                            >Submit</button>
                        </div>}
                    </div>
                </div>
                <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3'>
                    <div className='pl-5 pr-5'>
                        <p className='font-Poppins flex flex-col'>E-mail</p>
                        {!isUpdateEmail && <p className='font-Mulish text-xs'>{user.email}</p>}
                        {!isUpdateEmail && <p className='font-Poppins float-right text-xs text-2778F0 pt-2 cursor-pointer mr-3' onClick={updateEmail}>Update</p>}
                        {isUpdateEmail && <div>
                            <input type='email' placeholder='Enter new email' className='mt-4 font-Mulish w-full border pl-2 outline-none 2xl:pt-2 2xl:pb-2 2xl:rounded-md'
                                onChange={handleEmail}
                            />
                            <button className='font-Poppins bg-2778F0 text-white w-full mt-4 pt-2 pb-2 rounded-lg'
                                onClick={submitEmail}
                            >Submit</button>
                        </div>}
                    </div>
                </div>
                <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-5'>
                    <div className='pl-5 pr-5'>
                        <p className='font-Poppins flex flex-col'>Phone Number</p>
                        {user.phone ?
                            !isUpdatePhone &&
                            <p className='font-Mulish text-xs'>{user.phone}</p>
                            :
                            !isUpdatePhone &&
                            <p className='font-Mulish text-xs'>No phone number available</p>
                        }
                        {
                            !isUpdatePhone && <p className='font-Poppins float-right text-xs text-2778F0 pt-2 cursor-pointer mr-3' onClick={updatePhone}>Update</p>
                        }
                        {isUpdatePhone && <div>
                            <input type='tel' placeholder='Enter new phone number' className='mt-4 font-Mulish w-full border pl-2 outline-none 2xl:pt-2 2xl:pb-2 2xl:rounded-md'
                                onChange={handlePhone}
                            />
                            <button className='font-Poppins bg-2778F0 text-white w-full mt-4 pt-2 pb-2 rounded-lg'
                                onClick={submitPhone}
                            >Submit</button>
                        </div>}

                    </div>
                </div>
                </div > :
                <div className='flex  shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3 justify-center items-center '>
                <div className='pl-5 pr-5'>
                    <p className='font-Poppins  text-green-600 text-xs text-center'>
                        Update completed, now click update profile to view the changes !
                    </p>
                </div>
            </div>
            }
        </>
    );
}

export default GeneralInfo;
