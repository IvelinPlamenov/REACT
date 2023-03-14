import { useState, useEffect } from "react"
import "./TicketList.css"

const TicketList = () =>{
    const [User, setUser] = useState("")
    const [List, setList] = useState([])
    
    useEffect( ()=>{
        let loggedUser = localStorage.getItem('loggedUser') 
        setUser(JSON.parse(loggedUser).username)
        if(User !== "" ){
            fetch(`http://localhost:3001/bdj/ticketList/${User}`)
                .then(response => response.json())
                .then(data => setList(data))
        }
    },[User]);

    return(
       <div>
            {List ? 
            <div>
                <div className="bileti">
                    <h1><b>Билети</b></h1>
                </div>
                <table  className="content-table">
                <thead>
                    <tr>
                        <th scope="colgroup"></th>
                        <th scope="colgroup">Дестинация</th>
                        <th scope="colgroup">Дaтa</th>
                        <th scope="colgroup">Заминава</th>
                        <th scope="colgroup">Пристига</th>
                        <th scope="colgroup">Времетраене</th>
                        <th scope="colgroup">Цена</th>
                        <th className="delete" scope="colgroup"></th>
                    </tr>
                </thead>
                <tbody >
                {List.map((value, index) =>
                    <tr key={index}>
                        <td>{index+1} </td>
                        <td>{value.start} - {value.end} </td>
                        <td>{value.date}</td>
                        <td>{value.starttime}</td>
                        <td>{value.endtime}</td>
                        <td>{value.duration}</td>
                        <td>{value.price}</td>
                        <td className="delete"><button  >Изтрии</button></td>
                    </tr>
                )}
                </tbody>
                </table>
            </div>
            :
            <div className="Empty">
                <h1><b>Няма закупени билети!</b></h1>
            </div>
            }
            

            
       </div>
    )
} 
export default TicketList;