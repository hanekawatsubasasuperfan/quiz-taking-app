interface Result{
    code:number
    msg:string
    status:string
}

export async function Logout():Promise<Result>{
    const response = await fetch("http://localhost:8000/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
        )
    const data = await response.json();

    return {code:data.code, msg:data.msg, status: data.status}
}