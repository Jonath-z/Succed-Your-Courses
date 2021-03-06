import React, { useEffect, useState } from 'react'
import LoginButton from '../button';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../../../../state';
import handleLoginSubmit from '../../services/handleLoginForm';
import decryptPassword from '../../services/decryptPassword';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import browserRoutes from '../../../../../../router/_broswerRoute/router';
import { LocalStorage } from '../../../../../helper/localStorage';
import { useUpdateUser } from '../../../../../context';

export const LoginForm = () => {
    const history = useHistory();
    const updateUser = useUpdateUser();

    const [password, setPassword] = useState();
    const [loginFailed, setLoginFailed] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    const dispatch = useDispatch();
    const { fetchUsers } = bindActionCreators(actionsCreators, dispatch);

    const user = useSelector((state) => state.fetchUsers);
    const courses = useSelector((state) => state.coursesReducer);

    const submitForm = (e) => {
        e.preventDefault();
        fetchUsers(handleLoginSubmit(e).email);
        setPassword(handleLoginSubmit(e).password);
        setIsDisable(true); 
        updateUser();
    }

    useEffect(() => {
        if (user.password !== undefined) {
            if (password !== undefined && decryptPassword(user.password) === password) {
                browserRoutes.home(history);
                setLoginFailed(false);
                LocalStorage.set('userData', JSON.stringify(user));
                LocalStorage.set('courses', JSON.stringify(courses));
                setIsDisable(false);
            }
            if (password !== undefined && decryptPassword(user.password) !== password) {
                // console.log(password, decryptPassword(`${user.password}`));
                setLoginFailed(true);
            }
        }
    }, [user, history, password, courses]);

    const InputFucus = () => {
        setLoginFailed(false);
    }

    return (
        <div>
            <form onSubmit={submitForm} className='flex flex-col justify-center items-center mt-3'>
                <input type='email' name='email' placeholder='Enter your email adress' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80 mt-5 outlinne-none' required />
                <input type='password' name='password' placeholder='Enter password' className='border border-gray-300 h-10 font-Mulish rounded-3xl pl-7 w-72 2xl:w-80 xl:w-80 lg:w-80 md:w-80  mt-5 outlinne-none' required  onFocus={InputFucus}/>
                {loginFailed && <p className='text-red-600 text-sm font-Mulish mt-3'>Wrong password</p>}
                <LoginButton
                    isDisabled={isDisable}
                />
            </form>
        </div>
    );
}

export default LoginForm;
