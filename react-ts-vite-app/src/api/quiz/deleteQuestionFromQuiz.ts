interface Result{
    code:number
    msg:string
    status:string
}

export async function DeleteQuestionFromQuiz(questionID: number, quizID: number): Promise<Result>{

    const res = await fetch(`http://localhost:8000/api/quiz/delete/${quizID}`,{
        credentials:"include",
        method:"DELETE",
        headers: {
                "Content-Type": "application/json"
            },        
        body: JSON.stringify({
            questionsIDs:[
                questionID
            ]
        })
    })
    
    const data = await res.json();

    return {code:data.code, msg:data.msg,status:data.status}
}