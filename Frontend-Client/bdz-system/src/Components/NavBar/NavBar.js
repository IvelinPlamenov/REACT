import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () =>{

    return(
           <header className="topnav" id="myTopnav">
                <ul className="main-nav">
                    <li><Link className="nav" to="/UsersList">Admin Panel</Link></li>
                    <li><Link className="nav" to="/TicketsList">Закупени Билети </Link></li>
                    <li><Link className="nav" to="/">Купи Билет</Link></li>
                </ul>
	        </header>  
        
    )
}