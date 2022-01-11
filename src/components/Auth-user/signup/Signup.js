import React from 'react'
import RegisterButton from './tools/buttons/RegisterButton'
import SignupForm from './tools/_Forms/SignupForm'

const Signup = () => {
    return (
        <div>
            <div>
                <p>Welcome abroad</p>
            </div>
            <div>
                <SignupForm/>
            </div>
            <div>
                <RegisterButton/>
            </div>
            <div>
                <p>Already have an account? <span>Sign in</span></p>
            </div>
        </div>
    )
}

export default Signup
