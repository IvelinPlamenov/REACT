import { useState, useEffect } from "react"
import "./TicketList.css"
import User from "./User"
import { UserDelete } from "./UserDelete"

const UsersList = () =>{
    const [UserList, setUserList] = useState([])

    useEffect( ()=>{
            fetch(`http://localhost:3001/bdj/UsersList`)
                .then(response => response.json())
                .then(data => setUserList(data))
        
    },[]);

    const onUserDelete = (UserId) => {
        fetch(`http://localhost:3001/bdj/DeleteUser/${UserId}`)
                .then(response => console.log(response))
        // Delete from state
        setUserList(state => state.filter(x => x.id !== UserId));
    };
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteUser, setShowDeleteUser] = useState(null);
    const onClose = () => {
        setSelectedUser(null);
        setShowDeleteUser(null);
    };
    const onDeleteClick = (userId) => {
        setShowDeleteUser(userId);
    };
    const onDeleteHandler = () => {
        onUserDelete(showDeleteUser);
        onClose();
    };
    return( 
        <>
        {showDeleteUser && <UserDelete onClose={onClose} onDelete={onDeleteHandler}/>}
            <div>
                <table  className="content-table">
                <thead>
                    <tr>
                        <th scope="colgroup">Username</th>
                        <th scope="colgroup">ID</th>
                        <th scope="colgroup">Email</th>
                        <th scope="colgroup">Role</th>
                        <th className="delete" scope="colgroup"> </th>
                    </tr>
                </thead>
                <tbody >
                {UserList.map(u =>
                            <User
                                {...u}
                                key={u.id}
                                onDeleteClick={onDeleteClick}
                            />
                        )}
                </tbody>
                </table>
            </div>
    
        </>
            
    )
} 
export default UsersList;