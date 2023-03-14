import {Router} from "express";
import {createUser, deleteUser, getEnd, getStart, View, Buy, getTicketList, deleteRecord, getUsersList} from "./Controller";


export const Routes = Router();
Routes.get("/start", getStart);
Routes.get("/end/:name", getEnd);
Routes.get("/view/:name,:name2", View);
Routes.post("/buy", Buy);

Routes.get("/ticketList/:username", getTicketList);
Routes.get("/UsersList", getUsersList);

//Routes.post("/register", Register);

Routes.post("/register", createUser);
Routes.get("/DeleteUser/:id", deleteUser);
Routes.post("/deleteRecord", deleteRecord);


