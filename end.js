const username= document.getElementById("username");
const saveScorebtn= document.getElementById('saveScorebtn');

const finalScore=document.getElementById("finalScore");

const mostrecentScore=localStorage.getItem("mostrecentScore");

const highscores= JSON.parse(localStorage.getItem("highscores"))||[];


const max_high_scores=5;
console.log(highscores);

finalScore.innerText=mostrecentScore;


username.addEventListener('keyup',()=>{
    console.log(username.value);
    saveScorebtn.disabled= !username.value;
});



saveHighscore = e =>{
    console.log("clicked the Save button!");
    e.preventDefault();


const score={
    score:Math.floor(Math.random()*100),
    name:username.value
};
highscores.push(score);
highscores.sort((a,b)=> b.score- a.score)

highscores.splice(5);
localStorage.setItem('highscores',JSON.stringify(highscores));
window.location.assign("/");


};