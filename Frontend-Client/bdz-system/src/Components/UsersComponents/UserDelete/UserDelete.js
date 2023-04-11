import styles from "./UserDelete.module.css"

export const UserDelete = ({
    onDelete,
    onClose,
}) =>{
    return(
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}>
            <div className={styles["modal"]}>
                <div className={styles["confirm-container"]}>
                        <header className={styles["headers"]}>
                            <h2>Are you sure you want to delete this account?</h2>
                         
                        </header>
                    <div className="action">
                        <div id="form-actions">
                            <button id="action-save" className={styles["btn"]} type="submit" onClick={onDelete}>Delete</button>
                            <button id="action-cancel" className={styles["btn-close"]} type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

