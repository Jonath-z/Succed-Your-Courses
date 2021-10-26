import React from 'react'
import './Welcome.css';
import Typography from '@mui/material/Typography';

const Welcome = () => {
    return (
        <div className='welcome-container'>
            <div className='Welcome'>
                <Typography component='h1' style={{ fontSize: 30 }} className='welcome-h1'>
                    Welcome to succed your courses
                </Typography>
                <Typography component='p' style={{fontSize:20}}>
                    Let make your student's life easy
                </Typography>
            </div>
        </div>
    );
}

export default Welcome
