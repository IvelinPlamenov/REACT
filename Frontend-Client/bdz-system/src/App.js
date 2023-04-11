import { Route, Routes } from 'react-router-dom';

import { RouteGuard } from './Components/RouteGuard/RouteGuard';
import { AuthProvider } from './Components/context/AuthContext';

import { BuyTickets } from './Components/BuyTickets/BuyTickets';
import { TicketList } from './Components/TicketList/TicketList'
import { UsersList } from './Components/UsersComponents/UserList/UsersList'
import { NavBar } from './Components/NavBar/NavBar';
import { Register } from "./Components/Register/Register"
import { Login } from './Components/Login/Login';
import { Logout } from './Components/Logout/Logout';
import { ForumList } from './Components/ForumComponents/ForumList/ForumList';
import { Forum } from './Components/ForumComponents/Forum/Forum';
import { Profile } from './Components/Profile/Profile';
import { CreateDestionation } from './Components/CreateDestination/CreateDestination';



function App() {

  return (
    <AuthProvider>
        <NavBar/>
        <Routes>
            <Route path="/" element={<BuyTickets/>}/>
            
            <Route path="/register" element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            
            <Route path='/forum' element={<ForumList/>}/>
            <Route path='/forum/:forumId/*' element={<Forum/>}/>

            <Route element={<RouteGuard/>}>
                <Route path="/TicketsList" element={<TicketList/>}/>
                <Route path="/AdminPanel" element={<UsersList/>}/>
                <Route path="/profile/:username/*" element={<Profile/>}/>
                <Route path="/CreateDestination" element={<CreateDestionation/>}/>
            </Route>
        </Routes>
    </AuthProvider>
    
        
  )
}

export default App;
