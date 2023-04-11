import styles from "./CreateDestination.module.css"
export const CreateDestionation = () =>{

    const onCreateDestinationHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const Data = Object.fromEntries(formData)

        await fetch("http://localhost:3001/bdj/CreateDestination", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(Data)
        })

        e.target.reset();
    }   

    return(
        <div className={styles["modal"]}>
        <div className={styles["user-container"]}>
            <header className={styles["headers"]}>
                <h2>Добави дестинация!</h2>
            </header>
            <form onSubmit={(e) => onCreateDestinationHandler(e)}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="date">Дата</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="date"
                                name="date" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="StartDest">Начална</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="StartDest"
                                name="StartDest" 
                                type="text" 
                            />
                        </div>
                    </div>
                    
                    <div className={styles["form-group"]}>
                        <label htmlFor="EndDest">Крайна гара</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="EndDest"
                                name="EndDest" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="StartTime">Заминава</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="StartTime"
                                name="StartTime" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="EndTime">Пристига</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="EndTime"
                                name="EndTime" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="Duration">Време</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="Duration"
                                name="Duration" 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="Price">Цена</label>
                        <div className={styles["input-wrapper"]}>
                            <span><i className="fa-solid fa-user"></i></span>
                            <input 
                                id="Price"
                                name="Price" 
                                type="text" 
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