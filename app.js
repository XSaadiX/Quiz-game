const questions=[{
    question: "Which is the largest animal in the world?",
    answers:[
        {text :"Shark" , correct: false},
        {text :"blue whale" , correct: true},
        {text :"Elephant" ,correct: false},
        {text :"Giraffe" , correct: false},
        ]
    },{
        question: "Which is the smallest country in the world?",
        answers:[
            {text :"vatican City" , correct: true},
            {text :"Bhutan" , correct: false},
            {text :"Nepal" ,correct: false},
            {text :"Shri Lanka" , correct: false},
            ] 
    }
    ,{
        question: "Which is the largest desert in the world ?",
        answers:[
            {text :"Kalahari" , correct: false},
            {text :"Gobi" , correct: false},
            {text :"Sahara" ,correct: false},
            {text :"Antarctica" , correct: true}
            ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text :"Asia" , correct: false},
            {text :"Australia" , correct: true},
            {text :"Arctic" ,correct: false},
            {text:"Africa" , correct: false},
            ]
    }
]; 

let currentQuestionIndex=0;
let score=0;
const questionElement=document.getElementById("questionHead")
const buttons=document.getElementById("buttons");
const next=document.getElementById("next");

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    next.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn")
        buttons.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function selectAnswer(e){
    const selectedButton=e.target;
    const isCorrect= selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct")
        score++
    }else{
        selectedButton.classList.add("incorrect")
    }
    Array.from(buttons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
        next.style.display="block"
    })
        
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
        resetState();
        next.style.display="block"
    }
}

function showScore(){

    questionElement.innerHTML=`You scored ${score} out of ${questions.length} `;
    next.innerHTML=" play Again"
    next.style.display="block"

}

next.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function resetState(){
    next.style.display="none";
    while(buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    }
}
startQuiz();

