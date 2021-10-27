import React from 'react';
import { useState,useEffect } from 'react';
import { realTimeDB } from '../modules/firebase';


const Courses = () => {
    const [modules, setModules] = useState();
    useEffect(() =>{
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const courses = Object.values(snapshot.val());
                setModules(courses);
            }
        });
    }, []);
    return (
        <div>
            <div className="flex flex-row mt-10 justify-center">
                <button className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-full animate-wiggle'>Modules</button>
                <button className='ml-20 border-2 pl-3 pr-3 pt-1 pb-1 rounded-full'>My modules</button>
            </div>
            {
                modules !== undefined && modules.reverse().map(cours => {
                    return (
                        <div key={cours.id} className='ml-5 mr-5 pb-3 pl-2 rounded-lg mt-5 shadow-xl'>
                            <h3 className='text-lg'>{cours.module}</h3>
                            <p className='text-xs text-gray-600'>{cours.description}</p>
                            <div className='mt-2'>
                                <button className='border-2 border-color-red rounded pl-5 pr-5'>Suscribe to the module</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Courses
