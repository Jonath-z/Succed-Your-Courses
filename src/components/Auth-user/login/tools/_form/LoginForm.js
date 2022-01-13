import React, { useEffect, useState } from 'react'
import LoginButton from '../button/LoginButton';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../../state';
import handleLoginSubmit from '../../functions/handleLoginForm';
import decryptPassword from '../../functions/decryptPassword';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import browserRoutes from '../../../../../router/_broswerRoute/router';

export const LoginForm = () => {
    const history = useHistory();
    const [password, setPassword] = useState();
    const [loginFailed, setLoginFailed] = useState(false);
    const dispatch = useDispatch();
    const { fetchUsers } = bindActionCreators(actionsCreators, dispatch);
    const user = useSelector((state) => state.fetchUsers);

    const submitForm = (e) => {
        e.preventDefault();
        fetchUsers(handleLoginSubmit(e).email);
        setPassword(handleLoginSubmit(e).password);
    }
    useEffect(() => {
        if (user.password !== undefined) {
            if (password !== undefined && decryptPassword(user.password) === password) {
                browserRoutes.home(history);
                setLoginFailed(false);
            }
            if (password !== undefined && decryptPassword(user.password) !== password) {
                console.log(password, user.password);
                setLoginFailed(true);
            }
        }
    }, [user, history, password]);

    return (
        <div>
            <form onSubmit={submitForm} className='flex flex-col justify-center items-center mt-3'>
                <input type='email' name='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required />
                <input type='password' name='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 mt-5 outlinne-none' required />
                {loginFailed && <p className='text-red-600 text-sm font-Mulish mt-3'>Wrong password</p>}
                <LoginButton />
            </form>
        </div>
    );
}

export default LoginForm;
