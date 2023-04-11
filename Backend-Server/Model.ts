
declare var require: any
const mysql = require('mysql2');

export type CreateUser = {
    username:string,
    email: string,
    FirstName: string,
    LastName: string,
    age:number
    role:string
}
export type CreateForum = {
    username: string
    title:string,
    description: string,

}
export type AddComment = {
    forum_id: number,
    username: string,
    comment: string
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
    role: string,
    FirstName: string,
    LastName: string,
    age:number
}
export type EditProfile = {
    id: number,
    username: string,
    email: string,
    
    FirstName: string,
    LastName: string,
    age:number
}
export type User = {
    id: number,
    username: string,
    email: string,
    role: string,
    FirstName: string,
    LastName: string,
    Age:number
    
}
export type Forum = {
    id: number,
    username: string,
    title: string,
    text: string,
}
export type ForumLikes = {
    forum_id: number,
    username: string,
    
}
export type EditForum = {
    id: number,
    username:string,
    title: string,
    text: string,
}
export type ForumComments = {
    forum_id: number,
    comment_id: number;
    username: string,
    comment: string,
}
export type EditComments = {
    comment_id: number;
    EditComment: string,
}
export type Login = {
    id: number,
    username: string,
    email: string,
    role: string,
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
    id:number,
    username: string,
    bilet_id: string,
    date: string,
    start: string,
    end: string,
    starttime: string,
    endtime: string,
    duration: string,
    price: string,
}
export type deleteRecord = {
    id: number
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
        let sql = "INSERT INTO users (username, email, FirstName, LastName, age, role) VALUES(?,?,?,?,?,?)"
        let values = [
            userDataInput.username,
            userDataInput.email,
            userDataInput.FirstName,
            userDataInput.LastName,
            userDataInput.age,
            userDataInput.role]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)
        return create
        
    }
    async getCreatedUser(userData:string): Promise<User2[]> {
        const statement = `SELECT * FROM users WHERE email = '${userData}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }
    async updateUser(userDataInput: EditUser): Promise<boolean> {
        let sql = `UPDATE users SET email='${userDataInput.email}',FirstName='${userDataInput.FirstName}', LastName='${userDataInput.LastName}', age ='${userDataInput.age}',role='${userDataInput.role}' WHERE users.id = '${userDataInput.id}'`;
      
        let values = [
            userDataInput.email,
            userDataInput.FirstName,
            userDataInput.LastName,
            userDataInput.age,
            userDataInput.role]
      
        sql = mysql.format(sql,values)
        await this.conn.execute(sql);
        return true;
    }

    async updateProfile(userDataInput: EditProfile): Promise<boolean> {
        let sql = `UPDATE users SET email='${userDataInput.email}',FirstName='${userDataInput.FirstName}', LastName='${userDataInput.LastName}', age ='${userDataInput.age}' WHERE users.id = '${userDataInput.id}'`;
      
        let values = [
            userDataInput.email,
            userDataInput.FirstName,
            userDataInput.LastName,
            userDataInput.age,
            ]
      
        sql = mysql.format(sql,values)
        await this.conn.execute(sql);
        return true;
    }
    async deleteUser(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM `users` WHERE id = ?", [id]);
        return true;
    }
    async deleteRecord(id: number): Promise<deleteRecord[]> {
        const statement = `DELETE FROM list WHERE id = '${id}'`
        const del = await this.conn.query(statement);
        return del;
    }

    async getTicketList(username: string): Promise<infoList> {
        const [rows] = await this.conn.query(`Select list.id,bileti.date, bileti.start, bileti.starttime, bileti.end, bileti.endtime, bileti.duration, bileti.price from list join bileti on list.bilet_id=bileti.id join users ON list.username=users.username WHERE list.username = '${username}'`);
        return rows;
    }

    async getUsersList(): Promise<User> {
        const [rows] = await this.conn.query("SELECT id, username, email, role, FirstName, LastName, Age FROM users");
        return rows;
    }
    async getSearchList(search:any): Promise<User> {
        const [rows] = await this.conn.query(`SELECT id, username, email, role, FirstName, LastName, Age FROM users WHERE username LIKE '%${search}%'`);
        return rows;
    }

    async getUser( id:any ): Promise<User> {
        const statement = `SELECT * FROM users WHERE id = '${id}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }
    async getUsername( username:string ): Promise<User> {
        const statement = `SELECT * FROM users WHERE username = '${username}'`
        const [rows] = await this.conn.query(statement);
        return Object(rows[0]);
    }

    async Login( username: string, password:string ): Promise<Login> {
        const statement = `SELECT id,username,email,role FROM users WHERE username = '${username}' and password = '${password}'`
        const [rows] = await this.conn.query(statement);
        return rows;
    }

    async getForum( ): Promise<Forum> {
        const statement = `SELECT * FROM forum`
        const [rows] = await this.conn.query(statement);
        return rows;
    }

    async getForumId(id:number): Promise<Forum> {
        const statement = `SELECT * FROM forum WHERE id=${id}`
        const [rows] = await this.conn.query(statement);
        return Object(rows[0]);
    }
    async getForumLikes(id:number): Promise<ForumLikes> {
        const statement = `SELECT * FROM fomrumlikes WHERE forum_id=${id}`
        const [rows] = await this.conn.query(statement);
        return Object(rows);
    }
    async getForumComments(id:number): Promise<Forum> {
        const statement = `Select comment.comment_id, comment.forum_id, comment.username, comment.comment from comment join forum on comment.forum_id= forum.id WHERE forum.id=${id}`
        const [rows] = await this.conn.query(statement);
        return Object(rows);
    }

    async createForum(DataInput: CreateForum){
        let sql = "INSERT INTO forum (username, title, text) VALUES(?,?,?)"
        let values = [
            DataInput.username,
            DataInput.title,
            DataInput.description,
           ]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)
        return create
        
    }

    async addComment(DataInput: AddComment){
        let sql = "INSERT INTO comment (forum_id, username, comment) VALUES(?,?,?)"
        let values = [
            DataInput.forum_id,
            DataInput.username,
            DataInput.comment,
           ]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)
        return create
        
    }

    async updateForum(DataInput: EditForum){
        let sql = `UPDATE forum SET title='${DataInput.title}',text='${DataInput.text}' WHERE id = '${DataInput.id}'`;
        const asd = await this.conn.execute(sql);
        return asd
    }
    
    async editComment(DataInput: EditComments){
        let sql = `UPDATE comment SET comment='${DataInput.EditComment}' WHERE comment_id = '${DataInput.comment_id}'`;
                //UPDATE `comment` SET `comment` = 'Успех!!' WHERE `comment`.`comment_id` = 24;
        const asd = await this.conn.execute(sql);
        return asd
    }

    async deleteComment(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM `comment` WHERE comment_id = ?", [id]);
        return true;
    }

    async deleteForum(id: number): Promise<boolean> {
        await this.conn.execute("DELETE FROM `forum` WHERE id = ?", [id]);
        return true;
    }

    async DisLike(data: any): Promise<boolean> {
        await this.conn.execute(`DELETE FROM fomrumlikes WHERE forum_id='${data.forumId}' AND userLiked='${data.username}'`);
        return true;
    }

    async Like(Data: any){
        let sql = "INSERT INTO fomrumlikes (forum_id, userLiked) VALUES(?,?)"
        let values = [
            Data.forumId,
            Data.username,
           ]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)
        
        return create
        
    }
    async CreateDestination(Data:any){
        let sql = "INSERT INTO bileti (Date, Start, End, StartTime, EndTime, Duration, Price) VALUES(?,?,?,?,?,?,?)"
        let values = [
            Data.date,
            Data.StartDest,
            Data.EndDest,
            Data.StartTime,
            Data.EndTime,
            Data.Duration,
            Data.Price
           ]
        sql = mysql.format(sql, values)
        const create = await this.conn.execute(sql)
        return create
        
    }

}



