import styles from "./EditForum.module.css"
export const EditForum = ({
    onClose,
    forum,
    onForumUpdateSubmit
}) => {
    return(
        <div className={styles["overlay"]}>
            <div className={styles["backdrop"]}>
            <div className={styles["modal"]}>
                <div className={styles["user-container"]} >
                    <header className={styles["headers"]}>
                        <h2 className={styles["h2"]}>Редактирай тема</h2>
                    </header>
                    <form onSubmit={(e) => onForumUpdateSubmit(e, )}
                    >
                            <div className={styles["form-group"]} >
                                <label className={styles["label"]} htmlFor="title">Заглавие</label>
                                <div className={styles["input-wrapper"]}>
                                        <input 
                                            className={styles["title"]}
                                            id="title"
                                            name="title" 
                                            type="text" 
                                            defaultValue={forum.title}
                                        />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label className={styles["desclabel"]}htmlFor="description">Съдържание</label>
                                <div className={styles["input-wrapper"]}>
                                <div className={styles["divdesc"]}>
                                    <input 
                                        className={styles["description"]}
                                        id="description"
                                        name="text" 
                                        type="text" 
                                        defaultValue={forum.text}
                                    />
                                    </div>
                                </div>
                            </div>
                        <div id="form-actions">
                            <div className={styles["bdiv"]}><button id="action-save" className={styles["btn"]} type="submit">Save</button></div>
                            <div className={styles["bdiv"]}><button id="action-cancel" className={styles["btn-close"]} type="button" onClick={onClose}>Cancel</button></div>  
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
        
    
}