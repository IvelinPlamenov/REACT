import styles from "./DeleteForum.module.css"
export const DeleteForum = ({id, onClose, onDeleteForum}) => {
    
    return(
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}>
            <div className={styles["modal"]}>
                <div className={styles["confirm-container"]}>
                        <header className={styles["headers"]}>
                            <h2>Наистина ли искате да изтриете този форум?</h2>
                        </header>
                    <div className={styles["action"]}>
                        <div id="form-actions">
                            <button className={styles["del"]} id="action-save" type="submit" onClick={() => onDeleteForum(id)}>Изтрии</button>
                            <button className={styles["cancel"]} id="action-cancel" type="button" onClick={onClose}>Назад </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}