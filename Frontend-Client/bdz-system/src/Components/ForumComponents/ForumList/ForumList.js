import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./ForumList.module.css"

import { ForumListItem } from "../ForumListItem/ForumListItem"
import { CreateForum } from "../CreateForum/CreateForum";

import { useAuthContext } from "../../context/AuthContext"

export const ForumList = () => {
    const { username, isAuthenticated} = useAuthContext();

    const [forumList, setForumList] = useState([]);
    const [showAddForum, setShowAddForum] = useState(null)

    const navigate = useNavigate()

    useEffect( () => { 
        fetch("http://localhost:3001/bdj/forum")
            .then(response => response.json())
            .then(data => setForumList(data));
        }, [])

    const onForumAddClick = () => {
        if (isAuthenticated){
            setShowAddForum(true);
        } else {
            navigate("/login")
        }
        
    };

    const onClose = () => {
        setShowAddForum(null)
    }
    const onForumCreateSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const forumData = Object.fromEntries(formData)
        let forum 

        await fetch("http://localhost:3001/bdj/CreateForum", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({username:username, forumData})
        }) 
        .then(response => response.json())
        .then(data => forum = {
            id: data.id,
            username: username,
            title: forumData.title,
            text: forumData.description,
        })
        setForumList(state => [...state, forum])
        onClose()

    }
    return (
        <>
            <div className={styles["subforum"]}>
                <div className={styles["subforum-title"]}>
                    <h1>Форум</h1>
                    <button className={styles["AddBtn"]}onClick={onForumAddClick}>Добави тема</button>
                </div>
                {   forumList.map((value) => <ForumListItem key={value.id} {...value}/> )}  
            </div>

            {showAddForum && <CreateForum onClose={onClose} onForumCreateSubmit={onForumCreateSubmitHandler}  />}
        </>
        
    )
}