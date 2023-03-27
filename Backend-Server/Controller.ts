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
    response.send(User)
}
export const createUser = async (request: Request, response: Response) => {
    try{
        const { username, email, FirstName, LastName, age, role } = request.body
        const data = { username, email, FirstName, LastName, age,role }
        let userData: CreateUser = data;
        const userModel = new Model();
        const create = await userModel.createUser(userData)
        response.send({id:create[0].insertId})
    } catch (e){
        response.status(403).send({
            message: "User create is not successful"
        })
    }

}
export const RegisterUser = async (request: Request, response: Response) => {
    try{
        const {username, password, email} = request.body
        const data = {username, password, email}
        let userData: RegUser = data;
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
        const { id, data } = req.body
        const Data:EditUser = {id, ...data};
        await new Model().updateUser(Data);
        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        res.status(403).send({
            message: "Failed to update user"
        })
    }
}
export const deleteUser = async (request: Request, response: Response) => {
    const id:number = request.body.UserId
    const userModel = new Model()
    await userModel.deleteUser(id)
    response.send({
        status: 200,
        message: `User ID=${id} was deleted successfully`
    })
}
export const deleteRecord = async (request: Request, response: Response) => {
    //const id: number = +request.params.id
    const id: number = request.body.id;
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

export const Login = async (request: Request, response: Response) => {
    const username: string = request.params.username
    const password: string = request.params.password

    let LoggedUser = await new Model().Login(username, password)
    response.send(LoggedUser)
}
