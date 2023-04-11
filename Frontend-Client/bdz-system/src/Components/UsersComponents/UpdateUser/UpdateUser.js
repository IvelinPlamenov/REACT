import styles from "./UpdateUser.module.css"
export const UpdateUser = ({user,onClose,onUserUpdateSubmit}) =>{
    // const [UserData, setUserData] = useState([])
    // const [Email, setEmail] = useState(`${UserData[0]?.email}`)
    // const [Role, setRole] = useState("")

    // useEffect( ()=>{
    //     fetch(`http://localhost:3001/bdj/User/${userId}`)
    //         .then(response => response.json())
    //         .then(data => setUserData(data))
    //     ;
    // },[userId]);

    // const onUserEdit = (e) => {
    //     console.log(UserData[0]?.email);
    //     console.log(Role);
    //     e.preventDefault();
    //     fetch("http://localhost:3001/bdj/UpdateUser", {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id:userId,
    //             email: Email,
    //             role: Role
    //             })
    //         })
    //    // setUserList(state => state.map(x => x.id === userId ? update: x))
    //     onClose()
    // }
    
    return(        
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}></div>
            <div className={styles["modal"]}>
                <div className={styles["user-container"]}>
                    <header className={styles["headers"]}>
                        <h2>Edit User: {user[0]?.username}</h2>
                    </header>
                    <form onSubmit={(e) => onUserUpdateSubmit(e, user[0].id, user[0]?.username)}>
                        {/* <div className="form-row"> */}
                            <div className={styles["form-group"]}>
                                <label htmlFor="email">Email</label>
                                <div className={styles["input-wrapper"]}>
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="text" 
                                        defaultValue={user[0]?.email}
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
                                        defaultValue={user[0]?.FirstName}
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
                                        defaultValue={user[0]?.LastName}
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
                                        defaultValue={user[0]?.Age}
                                    />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="role">Role</label>
                                <div className={styles["input-wrapper"]}>
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                        id="role"
                                        name="role" 
                                        type="text" 
                                        defaultValue={user[0]?.role}
                                    />
                                </div>
                            </div>
                        {/* </div> */}
                        <div id="form-actions">
                            <button id="action-save" className={styles["btn"]} type="submit">Save</button>
                            <button id="action-cancel" className={styles["btn-close"]} type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}