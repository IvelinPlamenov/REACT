import styles from "./DeleteComment.module.css"
export const DeleteComment = ({comment_id, onClose, onDeleteComment}) => {
    return(
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}>
            <div className={styles["modal"]}>
                <div className={styles["confirm-container"]}>
                        <header className={styles["headers"]}>
                            <h2>Наистина ли искате да изтриете този коментар?</h2>
                        </header>
                    <div className={styles["action"]}>
                        <div id="form-actions">
                            <button className={styles["del"]} id="action-save" type="submit" onClick={() => onDeleteComment(comment_id)}>Изтрии</button>
                            <button className={styles["cancel"]} id="action-cancel" type="button" onClick={onClose}>Назад </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}