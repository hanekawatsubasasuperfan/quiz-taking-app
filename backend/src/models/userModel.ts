import {pool} from '../config/database.js'

export async function getUsers(){
    try{
        let res = await pool.query("SELECT * FROM users");
        return (res.rows);
    }catch(err){
        // Let the shared error handler record this failure and return a 500 response.
        throw err;
    }
}

