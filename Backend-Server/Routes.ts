import {Router} from "express";
import {RegisterUser,createUser,addComment,editComment, CreateDestination, getUsername, getSearchList, DisLike, Like, DeleteForum,getForumLikes, DeleteComment, updateForum, getForum, getForumId, createForum, Login, deleteUser, getEnd, getStart, View, Buy, getTicketList, deleteRecord, getUsersList, getUser, updateUser, getForumComments, updateProfile} from "./Controller";


export const Routes = Router();
Routes.get("/start", getStart);
Routes.get("/end/:name", getEnd);
Routes.get("/view/:name,:name2", View);
Routes.post("/buy", Buy);
Routes.get("/ticketList/:username", getTicketList);
Routes.get("/UsersList", getUsersList);
Routes.get("/User/:id", getUser);
Routes.get("/UserData/:username", getUsername);

Routes.put("/UpdateUser", updateUser);
Routes.put("/UpdateProfile", updateProfile);

Routes.get("/Login/:username,:password", Login);
Routes.get("/forum", getForum)
Routes.get("/forum/:forumId", getForumId)
Routes.get("/forumLikes/:forumId", getForumLikes)
Routes.get("/forum/commets/:forumId", getForumComments)
Routes.post("/forum/addComment", addComment)

Routes.post("/CreateUser", createUser);
Routes.post("/CreateForum", createForum);

//Routes.get("/getCreatedUser/:email", getCreatedUser);

Routes.post("/register", RegisterUser);
Routes.delete("/DeleteUser", deleteUser);
Routes.delete("/DeleteComment/:id", DeleteComment);
Routes.delete("/DeleteForum/:id", DeleteForum);

Routes.delete("/deleteTicket", deleteRecord);

Routes.put("/UpdateForum", updateForum);
Routes.put("/EditComment", editComment);

Routes.post("/Like", Like);
Routes.delete("/DisLike", DisLike);

Routes.get("/UsersList/:search", getSearchList);
Routes.post("/CreateDestination", CreateDestination);
