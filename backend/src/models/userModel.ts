import {pool} from '../config/database.js'

export async function getUsers(){
    try{
        let res = await pool.query("SELECT * FROM users");
        return (res.rows);
    }catch(err){
        console.log(err)
    }
}

