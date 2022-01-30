import React from 'react';

const Payement = () => {
    return (
        <div>
            <div className='flex flex-col shadow-xl border pt-3 pb-3 ml-8 mr-8 rounded-2xl mt-3'>
                <div className='pl-5 pr-5'>
                    <p className='font-Poppins flex flex-col'>Add Payement</p>
                    <input type='number' placeholder='Enter Amount' className='border outline-none pt-1 pb-1 pl-2 pr-2 font-Mulish mt-4 w-full'/>
                    <input type='file' placeholder='Enter the payement proof' className='mt-4 font-Mulish w-full border rounded-l-md'/>
                    <button className='font-Poppins bg-2778F0 text-white w-full mt-4 pt-2 pb-2 rounded-lg'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Payement;
