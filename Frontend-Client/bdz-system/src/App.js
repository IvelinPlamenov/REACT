import Routers from './Components/Routers';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Tickets from './Components/Tickets';
import TicketList from './Components/TicketList'
import Register from './Components/Register'
import UsersList from './Components/UsersList'


function App() {
  return (
        <div>
            <UsersList/>
        </div>
  )
}

export default App;
