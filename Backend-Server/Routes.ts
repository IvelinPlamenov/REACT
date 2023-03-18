import {Router} from "express";
import {RegisterUser,createUser,getCreatedUser, deleteUser, getEnd, getStart, View, Buy, getTicketList, deleteRecord, getUsersList, getUser, updateUser} from "./Controller";


export const Routes = Router();
Routes.get("/start", getStart);
Routes.get("/end/:name", getEnd);
Routes.get("/view/:name,:name2", View);
Routes.post("/buy", Buy);
Routes.get("/ticketList/:username", getTicketList);
Routes.get("/UsersList", getUsersList);
Routes.get("/User/:id", getUser);
Routes.put("/UpdateUser", updateUser);

Routes.post("/CreateUser", createUser);
Routes.get("/getCreatedUser/:email", getCreatedUser);

Routes.post("/register", RegisterUser);
Routes.get("/DeleteUser/:id", deleteUser);

Routes.post("/deleteRecord", deleteRecord);


