import Ticket from './Components/Tickets';
import TicketList from './Components/TicketList'
import UsersList from './Components/UsersList'
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './Components/NavBar/NavBar';
import Register from "./Components/Register"
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Ticket/>}/>
        <Route path="/TicketsList" element={<TicketList/>}/>
        <Route path="/UsersList" element={<UsersList/>}/>
        <Route path="/reg" element={<Register/>}/>

      </Routes>
    </>
    
        
  )
}

export default App;
