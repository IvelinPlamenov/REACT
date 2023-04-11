import styles from "./Forum.module.css"
import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { EditComment } from "../EditComment/EditComment";
import { EditForum } from "../EditForum/EditForum";
import { DeleteComment } from "../DeleteComment/DeleteComment";

import { AuthContext } from '../../context/AuthContext';
import { DeleteForum } from "../DeleteForum/DeleteForum";
import { LikesCounter } from "../LikesCounter/LikesCounter";


export const Forum = () =>{
    const { forumId } = useParams()
    const { username, isAuthenticated, role } = useContext(AuthContext);
    const navigate = useNavigate()
    
    const [forum, setForum] = useState({})
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [showEditForum, setShowEditForum] = useState(null)
    const [showEditComment, setShowEditComment] = useState(null)
    const [showDeleteComment, setShowDeleteComment] = useState(null)
    const [showDeleteForum, setShowDeleteForum] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/bdj/forum/${forumId}`)
            .then(response => response.json())
            .then(data => setForum(data));

        fetch(`http://localhost:3001/bdj/forum/commets/${forumId}`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [forumId])
    

    const onShowCommetsButtonClick = () => {
        setShowComments(state => !state)
    }
    
    const AddComment = async(e) =>{
        if ( isAuthenticated ){
             e.preventDefault()
            const formData = new FormData(e.currentTarget);
            const comment = Object.fromEntries(formData)
            
            await fetch("http://localhost:3001/bdj/forum/addComment", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    forum_id:forum.id,
                    username:username,
                    comment})
            }) 
            .then(response => response.json())
            .then(data => setComments(state => [...state, data]))

            e.target.reset();
        } else{
            navigate("/login")
        }
       
    }

    const onForumUpdateSubmit = async(e) => {
        e.preventDefault() 
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData)

        fetch("http://localhost:3001/bdj/UpdateForum",{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: forum.id,
                username:username,
                data})
        }) .then(response => response.json())
        .then(data => setForum(data.DataForum))

        setShowEditForum(null);
    }

    const onEditComment = async(e, comment_id) => {
        e.preventDefault() 
        const formData = new FormData(e.currentTarget);
        const newComment = Object.fromEntries(formData)
        await fetch("http://localhost:3001/bdj/EditComment",{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: comment_id,
                newComment})
        }) .then(response => response.json())
        .then(data => setComments(
            comments.map((item) => {
              if (item.comment_id === comment_id) {
                return ({ ...item, comment:[data.DataComment.EditComment ]});
              } else {
                return item;
              }
            })
          ))
          setShowEditComment(state => !state)
    }

    const onDeleteComment = async(id) =>{
        fetch(`http://localhost:3001/bdj/DeleteComment/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        setComments(state => state.filter(x => x.comment_id !== id));
        setShowDeleteComment(state => !state)
    }

    const onDeleteForum = async(id) =>{
        await fetch(`http://localhost:3001/bdj/DeleteForum/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        navigate("/forum")
        setShowDeleteForum(state => !state)
    }

    const onCommentEditClick = () =>{
        setShowEditComment(state => !state)
    }
    const onCommentDeleteClick = () =>{
        setShowDeleteComment(state => !state)
    }

    const onForumEditClick = () => {
        setShowEditForum(true)
    }
    const onForumDeleteClick = () => {
        setShowDeleteForum(true)
    }
    const onClose = () => {
        setShowEditForum(null)
        setShowDeleteForum(null)
    }
    const isForumOwner = forum.username === username;
 
    return(
        <>
        { showDeleteForum && <DeleteForum onClose={onClose} {...forum}  onDeleteForum={onDeleteForum} />}
        { showEditForum && <EditForum onClose={onClose} forum={forum}  onForumUpdateSubmit={onForumUpdateSubmit} />}
        <div className={styles["subforum"]}>
            <div className={styles["color"]}>
                <div className={styles["subforum-row"]}>
                    <div className={styles["subforum-title"]}>
                        <div className={styles["h1"]}>
                            <h1 >{forum.title}</h1>
                        </div>
                        <div className={styles["btn"]}>
                             { (isForumOwner || role === "admin") && 
                             <div>
                                    <button className={styles["edit-btn"]} title="Редактирай" onClick={onForumEditClick}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square"
                                            className="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 532 512">
                                            <path fill="currentColor"
                                                d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z">
                                            </path>
                                        </svg>
                                    </button>
                                    <button className={styles["deleteForum"]} title="Изтрии" onClick={onForumDeleteClick}>
                                    <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" >
                                        <path fill="currentColor" d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                                        </svg>
                                    </button>
                             </div>
                            
                        }
                        </div>
                       
                    </div>
                    <div className={styles["subforum-column"]}>
                        <h4>Автор: {forum.username}</h4>
                        <p>{forum.text}</p>
                    </div>
                    <LikesCounter forumId={forumId}/>
                    <button className={styles["viewComment"]} onClick={onShowCommetsButtonClick}>Коментари</button>
                </div>
                <hr className={styles["hr"]}></hr>
                {showComments &&  
                    <div className={styles["commentsSection"]}>
                        <div className={styles["AddCommentSection"]}>
                            <form onSubmit={(e) => {AddComment(e)}}>
                                <label className={styles["AddCommentLabel"]}><b>Добави Коментар</b></label>
                                <input className={styles["AddComment"]}
                                    id="comment"
                                    name="comment" 
                                    type="text" 
                                    />
                                <button className={styles["AddCommentBtn"]} type="submit">Добави</button>
                            </form>
                        </div>
                        
                        <div className={styles["comments"]}>
                            {comments.sort((a, b) => a.comment_id - b.comment_id).map((value) =>
                            <div key={value.comment_id}>
                            <div> 
                            {showDeleteComment && <DeleteComment {...value} onClose={onCommentDeleteClick} onDeleteComment={onDeleteComment}/>}
                                    <div className={styles["subComments"]}>
                                    {showEditComment ? <EditComment {...value} onEditComment={onEditComment}/> 
                                   
                                    : <div className={styles["asd"]}> <p><b>{value.username}:</b>&nbsp;&nbsp;{value.comment}</p></div>}
                                    {(value.username === username || role === "admin") && 
                                    <div className={styles["commentBtn"]}>
                                        <button className={styles["editComment"]} title="Редактирай" onClick={onCommentEditClick}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square"
                                                className="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 532 512">
                                                <path fill="currentColor"
                                                    d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button className={styles["deleteComment"]} title="Изтрии" onClick={onCommentDeleteClick}>
                                        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" >
                                            <path fill="currentColor" d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    }       
                                        
                                    </div> 
                            </div>
                                <hr className={styles["hr2"]}></hr>
                            </div>
                            )}
                            
                        </div>
                    </div>
                    }
            </div>
            
        </div>
        </>
    ) 
}