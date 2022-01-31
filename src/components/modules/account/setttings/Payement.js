import React, { useState } from 'react';
import { useUser } from '../../../context';
import { uploadPayement } from '../services';

const Payement = () => {
    const user = useUser();
    const [payementProof, setPayementProof] = useState();
    const [amount, setAmount] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handlePayementProof = (e) => {
        setPayementProof(e.target.files[0]);
    }

    const uploadConfirmation = () => {
        setIsUploaded(!isUploaded);
    }

    const submitPayement = () => {
        uploadPayement(amount, payementProof, user);
        setTimeout(uploadConfirmation, 3000);
    }

    return (
        <div>
            {!isUploaded ?
                <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3'>
                    <div className='pl-5 pr-5'>
                        <p className='font-Poppins flex flex-col'>Add Payement</p>
                        <input
                            type='number'
                            placeholder='Enter Amount'
                            className='border outline-none pt-1 pb-1 pl-2 pr-2 font-Mulish mt-4 w-full'
                            onChange={handleAmount}
                        />
                        <p className='font-Poppins mt-4'>Payement Proof</p>
                        <input
                            type='file'
                            placeholder='Enter the payement proof'
                            className='mt-2 font-Mulish w-full border rounded-l-md'
                            onChange={handlePayementProof}
                        />
                        <button className='font-Poppins bg-2778F0 text-white w-full mt-4 pt-2 pb-2 rounded-lg' onClick={submitPayement}>Submit</button>
                    </div>
                </div> :
                <div className='flex  shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3 justify-center items-center '>
                    <p className='font-Poppins text-green-600 pl-4 pr-4'>
                        Payement uploaded , You will be getting the access to the courses in a min!
                    </p>
                </div>
            }
        </div>
    );
};

export default Payement;
