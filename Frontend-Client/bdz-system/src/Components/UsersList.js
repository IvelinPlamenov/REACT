import { useState, useEffect } from "react"
import "./TicketList.css"
import { UpdateUser } from "./UpdateUser"
import User from "./User"
import { UserDelete } from "./UserDelete"
import { UserCreate } from "./UsersComponents/UserCreate"

const UsersList = () =>{
    const [UserList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(null)
    const [showDeleteUser, setShowDeleteUser] = useState(null);
    const [showEditUser, setShowEditUser] = useState(null);
    const [check,setcheck] = useState([])

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
    const onClose = () => {
        setSelectedUser(null);
        setShowDeleteUser(null);
        setShowEditUser(null)
        setShowAddUser(null)
    };
    
    const onDeleteClick = (userId) => {
        setShowDeleteUser(userId);
    };
    const onDeleteHandler = () => {
        onUserDelete(showDeleteUser);
        onClose();
    };

    const onEditClick = async (userId) => {
        fetch(`http://localhost:3001/bdj/User/${userId}`)
           .then(response => response.json())
           .then(data => setShowEditUser(data));
    };

    const onUserAddClick = () => {
        setShowAddUser(true);
    };
    const onUserUpdateSubmitHandler = (e, userId, username) => {
        e.preventDefault() 
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData)
        fetch("http://localhost:3001/bdj/UpdateUser", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: userId,
                email:data.email,
                role: data.role })
        })
        const user = {
            id: userId,
            username: username,
            email:data.email,
            role: data.role
        }
        setUserList(state => state.map(x => x.id === userId ? user: x))
        setShowEditUser(null);
    };  

    const onUserCreateSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const Userdata = Object.fromEntries(formData)
        let user
        await fetch("http://localhost:3001/bdj/CreateUser", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email:Userdata.email,
                role: Userdata.role
            })
        }) 
        .then(response => response.json())
        .then(data => user = {
            id:data.id,
            email:Userdata.email,
            role: Userdata.role
        })
        
        setUserList(state => [...state, user])
        onClose()
    }   
    useEffect(()=>{
        console.log(UserList);
    },[UserList])
    return( 
        <>
        {showAddUser && <UserCreate onClose={onClose} onUserCreateSubmit={onUserCreateSubmitHandler} />}

        {showDeleteUser && <UserDelete  onClose={onClose} onDelete={onDeleteHandler}/>}
       
        {showEditUser &&<UpdateUser user={showEditUser} onClose={onClose} onUserUpdateSubmit={onUserUpdateSubmitHandler}  />}

            <div>
                <table  className="content-table">
                <thead>
                    <tr>
                        <th scope="colgroup">Username</th>
                        <th scope="colgroup">ID</th>
                        <th scope="colgroup">Email</th>
                        <th scope="colgroup">Role</th>
                        <th className="delete" scope="colgroup"> </th>
                        <th className="edit" scope="colgroup"> </th>
                        <th className="details" scope="colgroup"> </th>

                    </tr>
                </thead>
                <tbody >
                {UserList.sort((a, b) => a.id - b.id).map(u =>
                            <User
                                {...u}
                                key={u?.id}
                                onDeleteClick={onDeleteClick}
                                onEditClick={onEditClick}
                            />
                        )}
                </tbody>
                </table>
                <button className="btn-add btn" onClick={onUserAddClick}>Add new user</button>
            </div>
    
        </>
            
    )
} 
export default UsersList;