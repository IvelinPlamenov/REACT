import { BuyTickets } from './Components/BuyTickets/BuyTickets';
import { TicketList } from './Components/TicketList/TicketList'
import { UsersList } from './Components/UsersComponents/UserList/UsersList'
import { NavBar } from './Components/NavBar/NavBar';
import { Register } from "./Components/Register/Register"
import { Login } from './Components/Login/Login';
import { Logout } from './Components/Logout/Logout';

import { AuthContext } from './Components/context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({})
    
    const onLoginSubmit = async (UserData) => {
        try {
            const response = await fetch(`http://localhost:3001/bdj/Login/${UserData.username},${UserData.password}`)
            .then(response => response.json())
            const result = await response
            if( result[0]){
                setAuth(result[0])
                navigate('/')}
        } catch (error) {console.log(error)};
    };

    const onRegisterSubmit = async (values) => {  
        try {
            const result = await fetch("http://localhost:3001/bdj/register", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    },
                body: JSON.stringify(values)
                });
            if (result.status === 200){
                setAuth(values)
                navigate('/');
            }
                
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const onLogout = () =>{
        setAuth({})
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId : auth.id,
        username : auth.username,
        isAuthenticated: !!auth.username
    }

  return (
    <AuthContext.Provider value={contextValues}>
        <NavBar/>
        <Routes>
            <Route path="/" element={<BuyTickets/>}/>
            <Route path="/TicketsList" element={<TicketList/>}/>
            <Route path="/UsersList" element={<UsersList/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
        </Routes>
    </AuthContext.Provider>
    
        
  )
}

export default App;
