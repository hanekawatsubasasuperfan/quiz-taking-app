interface Question{
    question:string;
    answer:string;
    quiz_id: number;
}

interface CreateQuestionResult {
    status:string
    code:number
    msg: string
}

export default async function createQuestion(newQuestion: Question):Promise<CreateQuestionResult>{
    const response = await fetch(
        `http://localhost:8000/api/quiz/create/${newQuestion.quiz_id}/questions`,
        {
            credentials:"include",
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            // has to stringifyed because request body is being sent through HTTP as raw data, not as a javascript object
            body:JSON.stringify({
                questions:[
                    {
                        question: newQuestion.question,
                        answer: newQuestion.answer
                    }
                ]
            })
        }
    )

    const data = await response.json();

    return {status:data.status, code: data.code, msg:data.msg}
}