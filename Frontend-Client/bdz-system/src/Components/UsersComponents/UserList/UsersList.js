import { useState, useEffect } from "react"
import styles from "./UsersList.module.css"
import { UpdateUser } from "../UpdateUser"
import { User } from "../User/User"
import { UserDelete } from "../UserDelete/UserDelete"
import { UserCreate } from "../UserCreate"
import { UserDetails } from "../UserDetails"

export const UsersList = () =>{
    const [UserList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(null)
    const [showDeleteUser, setShowDeleteUser] = useState(null);
    const [showEditUser, setShowEditUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect( ()=>{
        fetch(`http://localhost:3001/bdj/UsersList`)
        .then(response => response.json())
        .then(data => setUserList(data))
        
    },[]);

    const onUserDelete = (UserId) => {
        fetch(`http://localhost:3001/bdj/DeleteUser`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                UserId
            })
        });
        setUserList(state => state.filter(x => x.id !== UserId));
    };
    const onClose = () => {
        setShowDeleteUser(null);
        setShowEditUser(null)
        setShowAddUser(null)
        setSelectedUser(null);
    };
    const onInfoClick = async (userId) => {
        setUserDetails(UserList.find(x => x.id === userId))
        setSelectedUser(true);
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
                data})
        })
        const user = {
            id: userId,
            username: username,
            email: data.email,
            FirstName: data.FirstName,
            LastName: data.LastName,
            Age: data.age,
            role: data.role
        }
        setUserList(state => state.map(x => x.id === userId ? user: x))
        setShowEditUser(null);
    };  

    const onUserCreateSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const UserData = Object.fromEntries(formData)
        let user
        
        await fetch("http://localhost:3001/bdj/CreateUser", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(UserData)
        }) 
        .then(response => response.json())
        .then(data => user = {
            id: data.id,
            username: UserData.username,
            email: UserData.email,
            FirstName: UserData.FirstName,
            LastName: UserData.LastName,
            Age: UserData.age,
            role: UserData.role
        })
        setUserList(state => [...state, user])
        onClose()
    }   
   
    return( 
        <>
        {selectedUser && <UserDetails {...userDetails} onClose={onClose}/>}

        {showAddUser && <UserCreate onClose={onClose} onUserCreateSubmit={onUserCreateSubmitHandler} />}

        {showDeleteUser && <UserDelete  onClose={onClose} onDelete={onDeleteHandler}/>}
       
        {showEditUser &&<UpdateUser user={showEditUser} onClose={onClose} onUserUpdateSubmit={onUserUpdateSubmitHandler}  />}

            <div>
                <table  className="users-content-table">
                <thead>
                    <tr>
                        <th scope="colgroup">Username</th>
                        <th scope="colgroup">ID</th>
                        <th scope="colgroup">First Name</th>
                        <th scope="colgroup">Last Name</th>
                        <th scope="colgroup">Email</th>
                        <th scope="colgroup">Age</th>
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
                                onInfoClick={onInfoClick}
                            />
                        )}
                </tbody>
                </table>
                <button className="btn-add btn" onClick={onUserAddClick}>Add new user</button>
            </div>
    
        </>
            
    )
} 
