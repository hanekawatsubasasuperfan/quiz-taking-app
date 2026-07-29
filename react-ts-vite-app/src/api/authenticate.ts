export default async function authenticate(): Promise<boolean>{
    const response = await fetch("http://localhost:8000/api/auth/dashboard", {
        credentials:"include", // makes sure cookies are stored
        method:"GET",
        });

    if (!response.ok) {
        return false;
    }

    const data = await response.json();

    return data.code === 1;
}