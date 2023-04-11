import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import styles from "./LikesCounter.module.css"

export const LikesCounter = ({forumId}) => {
    const [likes, setLikes] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const { username, isAuthenticated  } = useContext(AuthContext); 

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3001/bdj/forumLikes/${forumId}`)
            .then(response => response.json())
            .then(data => setLikes(data));
    }, [forumId])

    useEffect(() => {
        if (likes.find(x => x.userLiked === username)) {
            setIsClicked(true)}
    }, [username, likes, isClicked ])

    const handleClick = async() => {
        if ( !isClicked ) {
              await fetch(`http://localhost:3001/bdj/Like`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({forumId, username})
            })
            
            setLikes(state => [...state, {forum_id:forumId, userLiked:username}])
            
        } else{
            await fetch(`http://localhost:3001/bdj/DisLike`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({forumId, username})
            });
            setLikes(state => state.filter(x => x.userLiked !== username)); 
        }

        setIsClicked(!isClicked);
    };

    const redirect = () =>{
        navigate("/login")
    }
    
  return (
        <div className={styles['div']}>
            { !isAuthenticated && 
                <button className={isClicked? styles['like']: styles['notlike']} onClick={redirect}>
                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                        <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
                    </svg>
                </button>
            }
            { isAuthenticated &&
                <button className={isClicked? styles['like']: styles['notlike']} onClick={handleClick}>
                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                        <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
                    </svg>
                </button>
            }
            <p className={styles['counter']}>Харесвания: {likes.length}</p>
        </div>
  );
};