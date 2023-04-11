import styles from "./BuyModal.module.css"
import { Link } from "react-router-dom"
export const BuyModal = ({ onClose }) => {

    return (
        <div className={styles["overlay"]} >
            <div className={styles["backdrop"]} >
                <div className={styles["modal"]} >
                    <button className={styles["close"]} onClick={onClose}>
                        <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em" >
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                        </svg>
                    </button>
                    <h2>Успешно закупихте билет!</h2>
                    
                    <div>
                        <Link className={styles["link"]} to="/TicketsList">Преглед</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}