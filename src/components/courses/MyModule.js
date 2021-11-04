import React from 'react'
import { realTimeDB } from '../modules/firebase';
import { useState, useEffect } from 'react';
import { AiFillFolderOpen } from 'react-icons/ai';
import CoursePay from './CoursePay';

const MyModule = ({subscribedModule}) => {
    const [myModules, setMyModueles] = useState();
    const [moduleID, setModuleID] = useState('');
    const [isClosePayement, setIsclosedPayement] = useState(true);


    useEffect(() => {
        realTimeDB.ref('/modules').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const modules = Object.values(snapshot.val());
                setMyModueles(modules);
            }
        });
    }, []);

    return (
        <>
            <div>
                {
                    subscribedModule !== undefined && subscribedModule.map((coursID) => {
                        return myModules !== undefined && myModules.map(cours => {
                            return (
                                cours.id === coursID &&
                                <div key={cours.id} className='ml-5 mr-5 pb-3 pl-2 rounded-lg mt-5 shadow-xl relative'>
                                    <h3 className='text-lg mt-2'>{cours.module}</h3>
                                    <p className='text-xs text-gray-600'>{cours.class}</p>
                                    <span><AiFillFolderOpen className='text-2xl text-right mr-3 text-pink-900'
                                        onClick={(e) => {
                                            setModuleID(cours.id);
                                            setIsclosedPayement(false)
                                        }}
                                    /></span>
                                </div>
                            )
                        })
                    
                    })
                }
            </div>
            <CoursePay
                close={() => {
                    setIsclosedPayement(true);
                }}
                moduleID={moduleID}
                isClosed={isClosePayement}
            />
        </>
    );
}

export default MyModule
