import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from "./Profile.module.css"

export const Profile = () => {
    const { username } = useParams()

    const [userData, setUserData] = useState({})

    useEffect(() =>{
        fetch(`http://localhost:3001/bdj/UserData/${username}`)
           .then(response => response.json())
           .then(data => setUserData(data));
    }, [username])
 
    const onUserUpdateSubmitHandler = (e, userId) => {
        e.preventDefault() 
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData)
        fetch("http://localhost:3001/bdj/UpdateProfile", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                data})
        })  .then(response => response.json())
            .then(data => setUserData(data))
    };  

    return(
        <div className={styles["modal"]}>
        <div className={styles["user-container"]}>
            <header className={styles["headers"]}>
                <h2>Допълнителна информация</h2>
            </header>
            <form 
             onSubmit={(e) => onUserUpdateSubmitHandler(e, userData.id)}
            >
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="email"
                                name="email" 
                                type="text" 
                                defaultValue={userData?.email}
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="FirstName">First Name</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="FirstName"
                                name="FirstName" 
                                type="text" 
                                defaultValue={userData?.FirstName}
                            />
                        </div>
                    </div>
                    
                    <div className={styles["form-group"]}>
                        <label htmlFor="LastName">Last Name</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="LastName"
                                name="LastName" 
                                type="text" 
                                defaultValue={userData.LastName}
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="age">Age</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="age"
                                name="age" 
                                type="number" 
                                defaultValue={userData.Age}
                            />
                        </div>
                    </div>
                <div id="form-actions">
                    <button id="action-save" className={styles["btn"]} type="submit">Save</button>
                    
                </div>
            </form>
        </div> 
        </div>
    )
}