import { Link } from 'react-router-dom';
import styles from "./ForumListItem.module.css"
export const ForumListItem = ({
    id,username,text,title
}) => {
    
    return (
        <div>
            <Link className={styles["link"]} to={`/forum/${id}`}>
                <div className={styles["color"]}>
                    <div className={styles["subforum-row"]}>
                        <div className={styles["subforum-column"]}>
                            <h4>{username}: {title}</h4>
                            <p>{text}</p>
                        </div>
                    </div>
                    <hr className={styles["hr"]}></hr>
                </div>
            </Link>
        </div>
    );
};