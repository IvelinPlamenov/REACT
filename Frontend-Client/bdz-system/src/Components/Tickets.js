import React, {useEffect, useState} from "react";
import axios from "axios";

function Ticket(){
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

    const [Shown, setShown] = useState(false);
    const selectHandleClick = (event )=> {
        setShown(current => !current);
      };
   

    return (
    <div className="chooseTicket">
    <div className="form">
        <div>
             <p>Oт:  </p>
                 <select  style={{width: '150px'}} className="form-control"  onChange={handleChange}>
                     <option key='blankKey'>Начална гара</option>
                    {StartList.map((value, index)=>
                        <option key={index}>{value.start}</option>)}
                </select>
        </div>
       

        <br/><br/>

        <p>До:  </p>
        <select id={"select"} style={{width: '150px'}} className="form-control" onBlur={selectHandleClick} onChange={endHandleChange}>
            <option >Крайна гара</option>
            {
             EndList.map((value,index) =>
                <option key={index} >{value.end}</option>)
            }
           
        </select>
               
    </div>

        <br/> <br/>

        <button className="select"  onClick={handleClick}>View information</button>
        {isShown && <div onBlur={handleClick}>
            {View.map((value) =>
                <table  key={value.id} className="content-table">
                <thead >
                <tr >
                    <th colSpan="2" scope="colgroup">{value.start} - {value.end} : {value.date}</th>
                </tr>
                </thead>
                <tbody >
                <tr >
                    <td>Заминава</td>
                    <td >{value.starttime}</td>
                </tr>
                <tr >
                    <td>Пристига</td>
                    <td >{value.endtime}</td>
                </tr>
                <tr >
                    <td>Време</td>
                    <td >{value.duration}</td>
                </tr>
                <tr >
                    <td>Цена</td>
                    <td >{value.price}</td>
                </tr>
                <tr >
                    
                    <td >{value.id}</td>
                </tr>
                <tr >
                    <td  colSpan="2" ><button onClick={() => {Buy(value.id)}}>Купи</button></td>
                 </tr>
                </tbody>
            </table>
            )}
        </div> }
    </div>

)}
export default Ticket;