import { UserDelete } from "./UserDelete";
import { useState } from "react";
const User = ({
    id,username,email,role,
    onDeleteClick,
   // onClose,
    //onDeleteHandler
}) => {
 
    return(
    
           <>
            <tr >
            <td>{username} </td>
            <td>{id}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td className="delete"><button onClick={() => {onDeleteClick(id)}} >Изтрии</button></td>
        </tr> 
           </>

          
       
        
    )
}
export default User;