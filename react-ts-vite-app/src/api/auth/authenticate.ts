interface AuthResult {
    authenticated: boolean;
    user?: {
        id: number;
        username: string;
        email:string;
    };
}



export default async function authenticate(): Promise<AuthResult>{
    const response = await fetch("http://localhost:8000/api/auth/dashboard", {
        credentials:"include", // makes sure cookies are stored
        method:"GET",
        });

    if (!response.ok) {
        return {authenticated: false};
    }

    const data = await response.json();

    return {authenticated:data.code===1, user:data.user};
}

