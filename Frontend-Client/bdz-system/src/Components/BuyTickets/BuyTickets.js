import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuyTickets.module.css"

import { AuthContext } from "../context/AuthContext"
import { BuyModal } from "./BuyModal/BuyModal";

export const BuyTickets = () => {

    const [getStart, setGetStart] = useState("")
    const [StartList, setStartList] = useState([]);
    const [EndList, setEndList] = useState([]);
    const [SelectedEnd, setSelectedEnd] = useState("")
    const [View, setView] = useState([])
    const [isShown, setIsShown] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false)

    const navigate = useNavigate()

    const { username, isAuthenticated } = useContext(AuthContext);

    useEffect( () => { 
        fetch("http://localhost:3001/bdj/start")
            .then(response => response.json())
            .then(data => setStartList(data))
        }, [])

    const ViewInfo = async () => {
        if(getStart !== "" && SelectedEnd !== ""){
            const resstate= await fetch(`http://localhost:3001/bdj/view/${getStart},${SelectedEnd}`);
            const getView= resstate.json();
            setView(await getView);}
            setIsShown(state => !state);
    }

    const getEnd = () =>{
        if(getStart !== ""){
            fetch(`http://localhost:3001/bdj/end/${getStart}`)
            .then(response => response.json())
            .then(data => setEndList(data))
            setIsShown(false);
    }}

    const onBlurEndDest = () =>{
        setEndList([])
        setIsShown(false);
    }

    const Buy = (id) => {
        if ( isAuthenticated ){
            fetch("http://localhost:3001/bdj/buy", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    ticket_id: id,})
            });
            setShowBuyModal(true)
        } else { navigate("/login") }
        
    }

    const handleChange = (event) => {
        setGetStart(event.target.value);
    }

    const endHandleChange = (event) => {
        setSelectedEnd(event.target.value);
    }

    const onClose = () =>{
        setShowBuyModal(false)
    }
   

    return (
    <>
        {showBuyModal && <BuyModal onClose={onClose}/>}
        <div className={styles["form"]}>
            <div className={styles["form"]}>
                <h1> Купи билет !</h1>
                    <div id="select-box" className={styles["first-select"]} >
                        <p>Начална гара</p>
                            <select className={styles["select"]} onClick={onBlurEndDest} onChange={handleChange}>
                                <option></option>
                                {StartList.map((value, index)=>
                                    <option  key={index}>{value.start}</option>)}
                            </select>
                    </div>
                    <div className={styles["second-select"]} >
                        <p>Крайна гара</p>
                            <select className={styles["select"]} onClick={getEnd} onChange={endHandleChange}>
                                <option></option>
                                {EndList.map((value,index) =>
                                    <option key={index} >{value.end}</option>)}
                            </select>
                    </div>
                    <button className={styles["search"]} onClick={ViewInfo}>Търси</button>
            </div>
            <div >
            {isShown && 
                    <div className={styles["asd"]} >
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
    </>
)}
