import { useState, useContext, useEffect } from "react";
import styles from './LoginForm.module.css';
import useLogin from "../hooks/useLogin";

import Loading from "./popups/Loading";

const LoginForm = () => {
    const {error, loading, handleLogin, handleRegister} = useLogin();

    const [userData, setUserData] = useState ({
        username: '',
        email: '',
        password: ''
    });

    const changeUserData = (key, value) => {
        let oldData = {...userData};
        oldData [key] = value;
        setUserData (oldData);
    }

    return <>
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2 className={styles.title}>Login</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className={styles.input} 
                            value={userData.name} 
                            onChange={(e) => changeUserData ('username', e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>E-Mail</label>
                        <input 
                            type="text" 
                            id="email" 
                            className={styles.input} 
                            value={userData.email} 
                            onChange={(e) => changeUserData ('email', e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className={styles.input} 
                            value={userData.name} 
                            onChange={(e) => changeUserData ('password', e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button 
                        type="button" 
                        className={styles.loginButton} 
                        onClick={()=>handleLogin(userData.username, userData.password)}>
                            Login
                        </button>
                        <button 
                        type="button" 
                        className={styles.registerButton} 
                        onClick={()=>handleRegister(userData.username, userData.email, userData.password)}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {loading && <Loading />}
    </>
    
}

export default LoginForm;
