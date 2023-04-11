import styles from "./UserCreate.module.css"
export const UserCreate = ({onClose, onUserCreateSubmit}) =>{


    return(        
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}>
            <div className={styles["modal"]}>
                <div className={styles["user-container"]}>
                    <header className={styles["headers"]}>
                        <h2 className={styles["h2"]}>Add User</h2>
                    </header>
                    <form onSubmit={(e) => onUserCreateSubmit(e)}>
                            <div className={styles["form-group"]}>
                                <label className={styles["label"]} htmlFor="username">Username</label>
                                <div className={styles["input-wrapper"]}>
                                    
                                    <input 
                                        id="username"
                                        name="username" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label className={styles["emaillabel"]}htmlFor="email">Email</label>
                                <div className={styles["input-wrapper"]}>
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label className={styles["label"]} htmlFor="FirstName">First Name</label>
                                <div className={styles["input-wrapper"]}>
                                    <input 
                                        id="FirstName"
                                        name="FirstName" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            
                            <div className={styles["form-group"]}>
                                <label className={styles["label"]}htmlFor="LastName">Last Name</label>
                                <div className={styles["input-wrapper"]}>
                                    <input 
                                        id="LastName"
                                        name="LastName" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label className={styles["agelabel"]}htmlFor="age">Age</label>
                                <div className={styles["input-wrapper"]}>
                                    <input 
                                        id="age"
                                        name="age" 
                                        type="number" 
                                    />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label className={styles["rolelabel"]}htmlFor="role">Role</label>
                                <div className={styles["input-wrapper"]}>
                                    <input 
                                        id="role"
                                        name="role" 
                                        type="role" 
                                    />
                                </div>
                            </div>
                        <div className={styles["form-actions"]}>
                            <div ><button id="action-save" className={styles["btn"]} type="submit">Save</button></div>
                            <div ><button id="action-cancel" className={styles["btn-close"]} type="button" onClick={onClose}>Cancel</button></div>  
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}