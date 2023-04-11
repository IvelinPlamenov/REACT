import styles from "./Register.module.css"

import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/AuthContext";

export const Register = () =>{
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        username: '',
        password: '',
        email: '',
    }, onRegisterSubmit);

    return(
            <div className={styles["body"]}>
                <div className={styles["row"]}>
                    <div className={styles["colm-form"]}> 
                        <form onSubmit={onSubmit}>
                            <div className={styles["form-container"]}>
                                <h1>Register</h1>
                                <label htmlFor="Username"></label>
                                <input 
                                    type="text" 
                                    placeholder="Username"
                                    name="username"
                                    value={values.username}
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="Password"></label>
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={changeHandler}
                                /> 
                                <label htmlFor="Email"></label>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={changeHandler}
                                />
                                <button type="submit" className={styles["btn-login"]}>Register</button>
                                <p className={styles["field"]}>
                                    <span>If you already have profile click <Link to="/login">here</Link></span>
                                </p>
                            </div>      
                        </form>   
                    </div>
                </div>
            </div>
    )
}
