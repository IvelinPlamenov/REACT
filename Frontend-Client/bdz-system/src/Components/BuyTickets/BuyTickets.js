import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./BuyTickets.module.css"
export const BuyTickets = () => {
    const [getStart, setGetStart] = useState("")
    const [StartList, setStartList] = useState([]);
    const [EndList, setEndList] = useState([]);
    const [SelectedEnd, setSelectedEnd] = useState("")
    const [View, setView] = useState([])
    const [user, setUser] = useState([])

    useEffect( () => { 
        fetch("http://localhost:3001/bdj/start")
            .then(response => response.json())
            .then(data => setStartList(data))
        }, [])

    useEffect( ()=>{    
        //може би не трябва да е в useEffect, за да не бъгва за 1вата стойност
        if(getStart !== ""){
            fetch(`http://localhost:3001/bdj/end/${getStart}`)
            .then(response => response.json())
            .then(data => setEndList(data))
        }
        
    },[getStart]);


    useEffect( ()=>{
        if(getStart !== "" && SelectedEnd !== ""){
            const info = async ()=>{
            const resstate= await fetch(`http://localhost:3001/bdj/view/${getStart},${SelectedEnd}`);
            const getView= resstate.json();
            setView(await getView);}
        info().then();
        }
       
    },[getStart,SelectedEnd]);

    useEffect(()=>{
         let loggedUser = localStorage.getItem('loggedUser') 
         setUser(JSON.parse(loggedUser).username)
    },[])

    function Buy(id){
        axios.post("http://localhost:3001/bdj/buy", {
            username: user,
            ticket_id: id,
        }).then((response) => {
            console.log(response)
        }) 
        
    }

    const handleChange = (event) => {
        setGetStart(event.target.value);
    }

    const endHandleChange = (event) => {
        setSelectedEnd(event.target.value);
    }

    const [isShown, setIsShown] = useState(false);
    const handleClick = (event )=> {
        setIsShown(current => !current);
      };
   

    return (
    <div className={styles["form"]}>
        <div className={styles["form"]}>
            <h1> Купи билет !</h1>
            <div id="select-box" className={styles["first-select"]} >
                <p>Начална гара</p>
                    <select className={styles["select"]}  onChange={handleChange}>
                        <option></option>
                        {StartList.map((value, index)=>
                            <option key={index}>{value.start}</option>)}
                    </select>
            </div>
            <div className={styles["second-select"]} >
                <p>Крайна гара</p>
                    <select className={styles["select"]} onChange={endHandleChange}>
                        <option></option>
                        {EndList.map((value,index) =>
                            <option key={index} >{value.end}</option>)}
                    </select>
            </div>
                <button className={styles["search"]} onClick={handleClick}>Търси</button>
        </div>
        <div >
        {isShown && 
                <div className={styles["asd"]} onBlur={handleClick}>
                {View.map((value) =>
                        <table  key={value.id} className={styles["content-table"]}>
                        <thead >
                        <tr >
                            <th colSpan="4" scope="colgroup">{value.start} - {value.end} : {value.date}</th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr >
                            <td>Заминава</td>
                            <td>Пристига</td>
                            <td>Време</td>
                            <td>Цена</td>
                        </tr>
                        <tr >
                            <td >{value.starttime}</td>
                            <td >{value.endtime}</td>
                            <td >{value.duration}</td>
                            <td >{value.price}</td>
                        </tr>
                        <tr >
                            <td  colSpan="4" ><button className={styles["buy"]}  onClick={() => {Buy(value.id)}}>Купи</button></td>
                        </tr>
                        </tbody>
                    </table>
                )}
                </div> }
        </div> 
    </div>

)}
