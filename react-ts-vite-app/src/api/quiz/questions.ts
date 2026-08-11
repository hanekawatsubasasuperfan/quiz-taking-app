interface Question{
    question:string
    answer:string
}

interface GetAllQuestionsResult {
    status:string
    code:number
    questions: Question[]
}

export default async function getAllQuestionsForQuiz(quizID:number): Promise<GetAllQuestionsResult>{
    const response = await fetch(`http://localhost:8000/api/quiz/${quizID}/questions`, {
        credentials:"include", // makes sure cookies are stored
        method:"GET",
        });

    const data = await response.json();

    return {status: data.status, code: data.code, questions: data.questions}

}