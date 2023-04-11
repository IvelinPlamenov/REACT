import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import styles from "./NavBar.module.css"

export const NavBar = () =>{
    const { isAuthenticated, username, role} = useContext(AuthContext);
    return(
           
            <header className={styles["topnav"]} id="myTopnav">
                <nav>
                    {isAuthenticated && (
                    <ul className={styles["main-nav"]}>
                        <li><Link className={styles["nav"]} to="/logout">Излез</Link></li>
                        { role === "admin" && 
                            <>
                            <li><Link className={styles["nav"]} to="/AdminPanel">Admin Panel</Link></li>
                            <li><Link className={styles["nav"]} to="/CreateDestination">Create Destination</Link></li>
                            </>
                            
                        }
                        <li><Link className={styles["nav"]} to="/TicketsList">Закупени Билети </Link></li>
                        <li><Link className={styles["nav"]} to="/">Купи Билет</Link></li>
                        <li><Link className={styles["nav"]} to="/forum">Форум</Link></li> 
                        <li><Link className={styles["username"]} to={`/profile/${username}`}>{username}</Link></li>     
                    </ul>
                    )}
                    {!isAuthenticated && (
                    <ul className={styles["main-nav"]}>
                        <li><Link className={styles["nav"]} to="/register">Регистрация</Link></li>
                        <li><Link className={styles["nav"]} to="/login">Влез</Link></li>
                        <li><Link className={styles["nav"]} to="/forum">Форум</Link></li>     
                        <li><Link className={styles["nav"]} to="/">Home</Link></li>
 
                    </ul>
                    )}
                </nav>
                </header>
	          
    )
}