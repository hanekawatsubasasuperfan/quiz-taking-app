export interface Quiz {
    id: number;
    title: string;
    user_id: number;
}

interface GetAllQuizResult{
    status: string;
    code: number;
    quizzes: Quiz[];
}

export default async function getAllQuizzes(): Promise<GetAllQuizResult>{
    const response = await fetch("http://localhost:8000/api/quiz", {
        credentials:"include", // makes sure cookies are stored
        method:"GET",
        });

    const data = await response.json();

    return {status: data.status, code: data.code, quizzes: data.quizzes}

}
