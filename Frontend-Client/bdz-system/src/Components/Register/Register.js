import "./Register.css"

import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/AuthContext";

export const Register = () =>{
    // const [Username, setUsername] = useState("")
    // const [Password, setPassword] = useState("")
    // const [Email, setEmail] = useState("")

    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        username: '',
        password: '',
        email: '',
    }, onRegisterSubmit);

    
    // const onUserCreateSubmit = (e) => {
    //     e.preventDefault();
    //     fetch("http://localhost:3001/bdj/register", {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: Username,
    //             password: Password,
    //             email: Email,
    //         })
            
    //     });
    // };

    return(
        // <div>
        //    <form  onSubmit={onUserCreateSubmit}>
        //      <div className="form-row">
        //          <div className="form-group">
        //             <label htmlFor="Username">Username</label>
        //             <div className="input-wrapper">   
        //                 <input
        //                     id="Username"
        //                     name="Username"
        //                     type="text"
        //                     onChange={e => setUsername(e.target.value)}
        //                 />
        //             </div>
        //         </div>
        //             <label htmlFor="password">Password</label>
        //                 <div className="input-wrapper">
        //                      <input 
        //                      id="lastName" 
        //                      name="lastName" 
        //                      type="password" 
        //                      onChange={e => setPassword(e.target.value)}
        //                      />
        //                 </div>
        //                 <label htmlFor="email">Email</label>
        //                 <div className="input-wrapper">
        //                      <input 
        //                      id="email" 
        //                      name="email" 
        //                      type="text" 
        //                      onChange={e => setEmail(e.target.value)}
        //                      />
        //                 </div>

        //      </div> 
        //             <button type="submit">Save</button>
        //     </form> 
        // </div>
        
            <div className="body">
                <div className="row">
                    <div className="colm-form"> 
                        <form onSubmit={onSubmit}>
                            <div className="form-container">
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
                                <button type="submit" className="btn-login">Register</button>
                                <p className="field">
                                    <span>If you already have profile click <Link to="/login">here</Link></span>
                                </p>
                            </div>      
                        </form>   
                    </div>
                </div>
            </div>
    )
}
