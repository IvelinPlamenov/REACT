import styles from "./UserDetails.module.css"
export const UserDetails = ({id,username, email, role, FirstName, LastName, Age, onClose}) =>{
 
    return(
        <div>
            <div className={styles["overlay"]} >
            <div className={styles["backdrop"]}></div>
            <div className={styles["modal"]}>
            <div className={styles["detail-conatiner"]}>
                <header className={styles["headers"]}>
                    <h2>User Detail</h2>
                </header>
                <div className={styles["content"]}>
                    
                    <div className={styles["user-details"]}>
                        <p>User Id: <strong>{id}</strong></p>
                        <p>Username: <strong>{username}</strong></p>
                        <p>Email: <strong>{email}</strong></p>
                        <p>Role: <strong>{role}</strong></p>
                        <p>First Name: <strong>{FirstName}</strong></p>
                        <p>Last Name: <strong>{LastName}</strong></p>
                        <p>Age: <strong>{Age}</strong></p>
                    </div>
                </div>
                
            </div><button className={styles["btn-close"]} onClick={onClose}>Close</button>
        </div>
    </div >
     </div>
        
    )
}