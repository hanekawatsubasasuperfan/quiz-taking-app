import {Pool} from 'pg';
import type { QueryResult } from "pg";


const pool = new Pool({
    user: "my_user",
    host: "localhost",
    database: "quiz_app",
    password: "my_user",
    port:5432
})

export async function getUsers(){
    try{
        let res = await pool.query("SELECT * FROM users");
        return (res.rows);
    }catch(err){
        console.log(err)
    }
}

