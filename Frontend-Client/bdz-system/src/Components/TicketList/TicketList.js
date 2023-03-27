import { useState, useEffect } from "react"
import styles from "./TicketList.module.css"

export const TicketList = () =>{
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

    const deleteTicket = (id) =>{
        fetch(`http://localhost:3001/bdj/deleteTicket`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        setList(state => state.filter(x => x.id !== id))
    }

    return(
       <div>
            {List ? 
            <div>
                <div className={styles["bileti"]}>
                    <h1><b>Билети</b></h1>
                </div>
                <table  className={styles["content-table"]}>
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
                        <td className="delete"><button onClick={() => deleteTicket(value.id)}>Премахни</button></td>
                    </tr>
                )}
                </tbody>
                </table>
            </div>
            :
            <div className={styles["Empty"]}>
                <h1><b>Няма закупени билети!</b></h1>
            </div>
            }
       </div>
    )
} 
