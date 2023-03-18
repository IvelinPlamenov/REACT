import {Response, Request} from "express";
import {RegUser,CreateUser, Model, EditUser} from "./Model";
import {User} from "./Model";


//const userModel = new Model()

export const getStart = async (request: Request, response: Response) => {
    let start = await new Model().getStart()
    response.send(start)
}
export const getEnd = async (request: Request, response: Response) => {
    const name:string = request.params.name || "null";
    let end = await new Model().getEnd(name);
    response.send(end)
}
export const View = async (request: Request, response: Response) => {
    const name:string = request.params.name || "null";
    const name2: string = request.params.name2  || "null";
    let view = await new Model().View(name, name2)
    response.send(view)
}
export const Buy = async (request: Request, response: Response) => {
    const user: string = request.body.username;
    const ticket_id:number = request.body.ticket_id;
    let buy = await new Model().Buy(user, ticket_id)
    response.send(buy)
}
export const getCreatedUser =  async (request: Request, response: Response) => {
    const userData:string = request.params.email || "null"
    const User = await new Model().getCreatedUser(userData)
    console.log(User);
    response.send(User)
}
export const createUser = async (request: Request, response: Response) => {
    try{
        let userData: CreateUser = request.body;
        const userModel = new Model();
        const create = await userModel.createUser(userData)
        console.log(create[0].insertId);
        let idd = create[0].insertId
        response.send({id:create[0].insertId})
    } catch (e){
        response.status(403).send({
            message: "User create is not successful"
        })
    }

}
export const RegisterUser = async (request: Request, response: Response) => {
    try{
        let userData: RegUser = request.body;
        const userModel = new Model();
        await userModel.RegisterUser(userData)
        response.send({
            message: "Success"
        })
    } catch (e){
        response.status(403).send({
            message: "User create is not successful"
        })
    }

}
export const updateUser = async (req: Request, res: Response) => {
    try {
        //const id = Number(req.params.id);
        const Data:EditUser = req.body;
        await new Model().updateUser(Data);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        console.log({e})
        res.status(403).send({
            message: "Failed to update user"
        })
    }
}
export const deleteUser = async (request: Request, response: Response) => {
    const id:any = request.params.id
    const userModel = new Model()
    await userModel.deleteUser(id)
    response.send({
        status: 200,
        message: `User ID=${id} was deleted successfully`
    })
}
export const deleteRecord = async (request: Request, response: Response) => {
    //const id: number = +request.params.id
    const id: number = request.body.ticketID;
    const del = await new Model().deleteRecord(id)
    response.send(del)
}
export const getTicketList = async (request: Request, response: Response) => {
    const user: string = request.params.username;
    let TicketList = await new Model().getTicketList(user)
    response.send(TicketList)
} 
export const getUsersList = async (request: Request, response: Response) => {
    let UsersList = await new Model().getUsersList()
    response.send(UsersList)
}

export const getUser = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    let User = await new Model().getUser(id)
    response.send(User)
}
