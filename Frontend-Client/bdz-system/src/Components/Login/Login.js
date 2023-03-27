import styles from"./Login.module.css"
import { Link } from "react-router-dom"

import { useContext } from "react";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/AuthContext";

const LoginFormKeys = {
    Username: 'username',
    Password: 'password'
};

export const Login = () =>{
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Username]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return(
        <div className={styles["body"]}>
            <div className={styles["row"]}>
                <div className={styles["colm-form"]}> 
                    <form onSubmit={onSubmit}>
                        <div className={styles["form-container"]}>
                            <h1>Login</h1>
                            <label htmlFor="Username"></label>
                            <input 
                                type="text" 
                                placeholder="Username"
                                name={LoginFormKeys.Username}
                                value={values[LoginFormKeys.Username]}
                                onChange={changeHandler}
                                />
                            <label htmlFor="Password"></label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                name={LoginFormKeys.Password}
                                value={values[LoginFormKeys.Password]}
                                onChange={changeHandler}
                            />
                            <button type="submit" className={styles["btn-login"]}>Login</button>
                            <Link to="/register" className={styles["btn-new"]}>Create new Account</Link>
                        </div>      
                    </form>   
                </div>
            </div>
        </div>
    )
}