import Tickets from './Tickets';
import TicketList from './TicketList';


import { Routes, Route } from 'react-router-dom';

const Routers = () => {
        <Routes>
            <Route path='/' element={<Tickets/>}/>
            <Route path='/list' element={<TicketList/>}/>

        </Routes>
  
}


export default Routers;
