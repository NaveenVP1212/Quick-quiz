const question=document.getElementById("question");
const choices =Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progressText");
const scoreText=document.getElementById("score");
const progressBarfull=document.getElementById("progressBarfull");
const loader=document.getElementById("loader");
const game=document.getElementById("game");

let currentQuestion={};
let acceptingAnswers= true;
let score=0;
let questionCounter= 0;
let availableQuestions= [];
 

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res=>{
    console.log(res);
    return res.json();

})
.then(loadedquestions=>{
    console.log(loadedquestions.results);
    questions=loadedquestions.results.map(loadedquestion=>{
        const formattedQuestion={
            question:loadedquestion.question
        };



     const answerchoices=[...loadedquestion.incorrect_answers];
     formattedQuestion.answer=Math.floor(Math.random()*3) + 1 ;
      answerchoices.splice(formattedQuestion.answer -1,0,
        loadedquestion.correct_answer);
    answerchoices.forEach((choice,index)=>{
        formattedQuestion["choice"+ (index+1)] =choice;
    });
    return formattedQuestion;
    });
   


   // questions=loadedquestions;
    startGame();
})
.catch( err=>{
    console.error(err);
});
 

//constants
const correct_bonus=10;
const max_questions=3;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");

};
getNewQuestion=()=>{
    if(availableQuestions.length==0||questionCounter>=max_questions){
        localStorage.setItem("mostrecentScore",score);
        //end page 
        return window.location.assign("/end.html"); 

    }



    questionCounter++;

   progressText.innerText = `Question ${questionCounter}/${max_questions}`;
   //update the progress bar
   progressBarfull.style.width= `${(questionCounter/max_questions)*100}%`;


    const questionIndex= Math.floor(Math.random() * availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice => {
        const number =choice.dataset["number"];
        choice.innerText=currentQuestion["choice"+number];
    }
        );
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;

};
incrementScore=num=>{
    score +=num;
    scoreText.innerText=score;
};

    choices.forEach(choice =>{
        choice.addEventListener("click",e =>{
            if(!acceptingAnswers) return;
            acceptingAnswers=false;
            const selectedChoice= e.target;
            const selectedanswer= selectedChoice.dataset["number"];
           
            const classtoApply= selectedanswer==currentQuestion.answer?'correct':'incorrect';


           if(classtoApply=='correct'){
            incrementScore(correct_bonus);
           }


            selectedChoice.parentElement.classList.add(classtoApply);
            
    
            setTimeout(() =>
            {
                selectedChoice.parentElement.classList.remove(classtoApply);
                getNewQuestion();
    
            },1000);
          
    
        });
    });






    

