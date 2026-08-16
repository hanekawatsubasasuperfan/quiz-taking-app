interface ModifiedQuestion{
    id: number
    question: string
    answer: string
}

interface ModifiedQuiz{
    questions: ModifiedQuestion[]
}

interface Result{
    code:number
    status:number
    msg:string
}

export default async function modifyQuiz(quizID: number, modifiedQuiz: ModifiedQuiz): Promise<Result>{
    const res = await fetch(`http://localhost:8000/api/quiz/modify/${quizID}`,
        {
            credentials:"include",
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                questions: modifiedQuiz.questions
            })

        }
    )
    const data = await res.json()

    return {code:data.code, status: data.status, msg: data.msg}
}   