import React from 'react'
import './Welcome.css';
import { useEffect } from 'react';

const Welcome = () => {
    useEffect(() => {
        localStorage.clear();
        },[])
    return (
        <div className='welcome-container'>
            <div className='Welcome'>
                <h1 style={{ fontSize: 30 }} className='welcome-h1'>
                    Welcome to succed your courses
                </h1>
                <p style={{fontSize:20}}>
                    Let make your student's life easy
                </p>
            </div>
        </div>
    );
}

export default Welcome
