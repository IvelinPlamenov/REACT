
declare var require: any
const mysql = require('mysql2');

export type CreateUser = {
    email: string,
    role:string
}
export type RegUser = {
    username: string,
    password: string,
    email: string,
}
export type EditUser = {
    id: number,
    username: string,
    email: string,
    role: string
}
export type User = {
    id: number,
    username: string,
    password: string,
    email: string,
    role: string
}
export type User2 = {
    id: number,
    username: string,
    password: string,
    email: string,
    role: string
    FirstName: string,
    LastName:string,
    Age: number
}
export type StartDest = {
    start:string
}
export type EndDest = {
    end:string
}
export type View = {
    id: number,
    date: string,
    start: string,
    end: string,
    starttime: string,
    endtime: string,
    duration: string,
    price: string,
}
export type Buy = {
    username: string,
    ticket_id: number
}
export type infoList = {
    username: string,
    id: string,
    date: string,
    start: string,
    end: string,
    starttime: string,
    endtime: string,
    duration: string,
    price: string,
}
export type deleteRecord = {
    id: string
}

export class Model{
    private conn; //connection to db
    constructor() {
        const pool = mysql.createPool({host: 'localhost', user: 'root', database: 'bdj'});
        this.conn = pool.promise();
    }
    async getStart(): Promise<StartDest[]> {
        const [rows] = await this.conn.query("SELECT DISTINCT start FROM bileti");
        return rows;
    }
    async getEnd(name: string): Promise<EndDest[]> {
        console.log(name);
        
        const statement = `SELECT DISTINCT end FROM bileti WHERE start = '${name}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }
    async View(name: string, name2: string): Promise<View[]>{
        const ViewTicket = `SELECT id,date,start,end,starttime,endtime,duration,price FROM bileti WHERE start = '${name}' AND end = '${name2}' `
        const [rows] = await this.conn.query(ViewTicket)
        return rows
    }
    async Buy(username: string, ticket_id: number): Promise<Buy[]>{
        const BuyTicket = `INSERT INTO list(username, bilet_id) VALUES ( '${username}','${ticket_id}')`
        const [rows] = await this.conn.query(BuyTicket)
        return rows
    }

    async RegisterUser(userDataInput: RegUser): Promise<boolean> {
        let sql = "INSERT INTO users (username, password, email) VALUES(?,?,?)"
        let values = [
            userDataInput.username,
            userDataInput.password,
            userDataInput.email]
        sql = mysql.format(sql, values)
        await this.conn.execute(sql);
        return true;

    }
    async createUser(userDataInput: CreateUser){
        let sql = "INSERT INTO users (username, email) VALUES(?,?)"
        let values = [
            userDataInput.email,
            userDataInput.role]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)

        // const statement = `SELECT * FROM users WHERE email = '${userDataInput.email}'`
        // const [rows] = await this.conn.query(statement);    
        // console.log(rows);
        return create
        
       // return true
        
    }
    async getCreatedUser(userData:string): Promise<User2[]> {
        console.log(userData);
        
        const statement = `SELECT * FROM users WHERE email = '${userData}'`
        const [rows] = await this.conn.query(statement);
        console.log(rows);
        return rows;
    }
    async updateUser(userDataInput: EditUser): Promise<boolean> {
        let sql = `UPDATE users SET email='${userDataInput.email}', role='${userDataInput.role}' WHERE users.id = '${userDataInput.id}'`;
        let values = [
            userDataInput.email,
            userDataInput.role]
        sql = mysql.format(sql,values)
        await this.conn.execute(sql);
        return true;
    }

    async deleteUser(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM `users` WHERE id = ?", [id]);
        return true;
    }
    async deleteRecord(id: number): Promise<deleteRecord[]> {
        const statement = `DELETE FROM list WHERE bilet_id = '${id}'`
        const del = await this.conn.query(statement);
        return del;
    }

    async getTicketList(username: string): Promise<infoList> {
        const [rows] = await this.conn.query(`Select list.username,bileti.date, bileti.start, bileti.starttime, bileti.end, bileti.endtime, bileti.duration, bileti.price, bileti.id from list join bileti on list.bilet_id=bileti.id join users ON list.username=users.username WHERE list.username = '${username}'`);
        return rows;
    }

    async getUsersList(): Promise<User> {
        const [rows] = await this.conn.query("SELECT * FROM users");
        return rows;
    }

    async getUser( id:any ): Promise<User> {
        const statement = `SELECT * FROM users WHERE id = '${id}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }
}
