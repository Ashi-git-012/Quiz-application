const questions = [
    {
        question: "What is 100*52?",
        answers: [
            {text: "5000", correct:false},
            {text: "52000", correct:false},
            {text: "5200", correct:true},
            {text: "52", correct:false},
        ]
    },
    {
        question: "Which one is not a multiple of 7?",
        answers: [
            {text: "21", correct:false},
            {text: "15", correct:true},
            {text: "14", correct:false},
            {text: "70", correct:false},
        ]
    },
    {
        question: "What is the result of 10*(2+5+3)?",
        answers: [
            {text: "20", correct:false},
            {text: "50", correct:false},
            {text: "100", correct:true},
            {text: "30", correct:false},
        ]
    },
    {
        question: "What is 50+1000?",
        answers: [
            {text: "1050", correct:true},
            {text: "1500", correct:false},
            {text: "1005", correct:false},
            {text: "1000", correct:false},
        ]
    },
    {
        question: "What is 2000-200?",
        answers: [
            {text: "2200", correct:false},
            {text: "1200", correct:false},
            {text: "1700", correct:false},
            {text: "1800", correct:true},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-que");
const timeCount = document.querySelector(".timer .timer_time");

let currentQuestionindex =0;
let score =0;
let counter;
let timeValue=10;

function startQuiz(){
    currentQuestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
    startTimer(10);
}

//to show the new question
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex+1;  
    questionElement.innerHTML = questionNo+ ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

//to remove the next button and correct option when new question appears
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

//when we select any answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
    clearInterval(counter);
}

//when we click next button 
function handleNextButton(){
    currentQuestionindex++;
    if(currentQuestionindex < questions.length){
        //to show next question
        showQuestion();
        //to restart the timer
        clearInterval(counter);
        startTimer(timeValue);
    }else{
        showScore();
    }

}

 //to show score when quiz is completed
function showScore(){
    timeCount.textContent="00";
    resetState();
    if(score==5){
        questionElement.innerHTML=`Your score is ${score} out of ${questions.length}! 
        Well Done🥳`;
    }else if(score==4){
        questionElement.innerHTML=`Your score is ${score} out of ${questions.length}! 
        Good Work👏`;
    }else if(score==3){
        questionElement.innerHTML=`Your score is ${score} out of ${questions.length}! 
        You can do Better😊`;
    }else{
        questionElement.innerHTML=`Your score is ${score} out of ${questions.length}! 
        Better Luck Next Time😥`;
    }
    nextButton.innerHTML="Play Again!";
    nextButton.style.display="block";
}


//if we click next button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionindex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

//to start the timer 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0"+addZero;
        }
        if(time<0){
            // clearInterval(counter);
            timeCount.textContent="00";
            handleNextButton();
            // nextButton.style.display="block";
            // selectAnswer();
        }
        
    }
}
startQuiz();