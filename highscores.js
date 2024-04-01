const highscoreList=document.getElementById("highscoresList");
const highscores=JSON.parse(localStorage.getItem("highscores"))||[];

highscoreList.innerHTML=highscores.map(score=>{
   return `<li class="high-scores">${score.name} - ${score.score}</li>`;

})
.join(""); 


