import { useState } from "react";
const Register = () =>{

const [Username, setUsername] = useState("")
const [Password, setPassword] = useState("")
const [Email, setEmail] = useState("")
    
    const onUserCreateSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/bdj/register", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: Username,
                password: Password,
                email: Email
            })
            
        });
    };

    return(
        <div>
           <form  onSubmit={onUserCreateSubmit}>
             <div className="form-row">
                 <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <div className="input-wrapper">   
                        <input
                            id="Username"
                            name="Username"
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                    <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                             <input 
                             id="lastName" 
                             name="lastName" 
                             type="password" 
                             onChange={e => setPassword(e.target.value)}
                             />
                        </div>
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                             <input 
                             id="email" 
                             name="email" 
                             type="text" 
                             onChange={e => setEmail(e.target.value)}
                             />
                        </div>

             </div> 
                    <button type="submit">Save</button>
            </form> 
        </div>
        
    )
}
export default Register;