import React from 'react'

const SignupForm = () => {
    return (
        <div>
            <form>
                <input type='text' placeholder='Enter your full name' required/>
                <input type='email' placeholder='Enter your email adress' required />
                <input type='password' placeholder='Enter password' required/>
                <input type='password' placeholder='Confirm Pasword'/>
            </form>
        </div>
    )
}

export default SignupForm
