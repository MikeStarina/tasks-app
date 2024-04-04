import React, { ChangeEvent, useEffect } from "react";
import styles from './login-page.module.css';
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as authActions } from "../../store/auth/auth.slice";
import { useLoginMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";



const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { loginFormData, isAuthenticated, userToken } = useAppSelector(store => store.auth);
    const [ login, { isSuccess, data: userData} ] = useLoginMutation();

    useEffect(() => {
        if(userToken) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        userData && localStorage.setItem('token', userData?.jwt);
        userData && dispatch(authActions.setLoginResponseUserData(userData));
        userData && isSuccess && navigate('/')
    }, [userData])
   
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setUserLoginFormData({ id: e.target.id, value: e.target.value }));
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        login(loginFormData);
    }

    return (
        <section className={styles.login}>
            <Box
               component='form'
               className={styles.login_form}
               onSubmit={submitHandler}
            >
                <TextField
                    required
                    id="username"
                    label='Имя пользователя' 
                    fullWidth
                    value={loginFormData.identifier}
                    onChange={changeHandler}
                />
                <TextField
                    required
                    id='password'
                    label='Пароль' 
                    type='password'
                    fullWidth
                    value={loginFormData.password}
                    onChange={changeHandler}
                />
                <Button
                    variant="contained"
                    type='submit'
                    sx={{ margin: '25px 0 0 0'}}
                >Войти</Button>

                <div className={styles.login_linksWrapper}>
                    <Link to='/forgotten'>Забыли пароль?</Link>
                    <Link to='/signup'>Регистрация</Link>
                </div>
            </Box>
            
        </section>
    )
}

export default LoginPage;

/**
 * initialValues: {
      identifier: '',
      password: '',
    },
 */