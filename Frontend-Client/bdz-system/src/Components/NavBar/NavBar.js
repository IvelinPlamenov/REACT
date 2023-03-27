import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import styles from "./NavBar.module.css"

export const NavBar = () =>{
    const { isAuthenticated, username} = useContext(AuthContext);
    return(
           
            <header className={styles["topnav"]} id="myTopnav">
                <nav>
                    {isAuthenticated && (
                    <ul className={styles["main-nav"]}>
                        <li><Link className={styles["nav"]} to="/logout">Излез</Link></li>
                        <li><Link className={styles["nav"]} to="/UsersList">Admin Panel</Link></li>
                        <li><Link className={styles["nav"]} to="/TicketsList">Закупени Билети </Link></li>
                        <li><Link className={styles["nav"]} to="/">Купи Билет</Link></li>   
                        <span className={styles["username"]}>{username}</span>
                    </ul>
                    )}
                    {!isAuthenticated && (
                    <ul className={styles["main-nav"]}>
                        <li><Link className={styles["nav"]} to="/register">Регистрация</Link></li>
                        <li><Link className={styles["nav"]} to="/login">Влез</Link></li>
                    </ul>
                    )}
                </nav>
                </header>
	          
    )
}