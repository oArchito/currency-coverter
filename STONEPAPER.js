let userscore=0;
let compscore=0;
const choices= document.querySelectorAll(".choice");
let result = document.getElementById("Result");
let userScoreDisplay = document.getElementById("user-score");
let compScoreDisplay = document.getElementById("comp-score");
let msg=document.getElementById("msg");
const computerchoice=()=>{
    let options=["rock","paper","scissors"];
    const randidx=Math.floor(Math.random()*3);
    return options[randidx];


}

const playgame=(userchoice)=>{
      const compchoice= computerchoice();
      if(userchoice===compchoice){
         result.style.backgroundColor="yellow";
        result.innerText="IT IS A DRAW!!"
      }
      else{
        let userwin=true;
        if(userchoice=="rock"){
             userwin= compchoice === "paper" ? false : true ;
             
          
        }
        else if(userchoice=="paper"){
             userwin= compchoice === "scissors" ? false : true ;
            
        }
         else if(userchoice=="scissors"){
             userwin= compchoice === "rock" ? false : true ;
          
        }
        
        if(userwin){
            userscore++;
            result.style.backgroundColor="green";
            result.innerText=`YOU WIN!  ${userchoice.toUpperCase()} beats ${compchoice.toUpperCase()}`;
        }
        else {
      compscore++;
      result.style.backgroundColor="red";
      result.innerText = `YOU LOST!  ${compchoice.toUpperCase()}  beats  ${userchoice.toUpperCase()}`;
    }

   
    userScoreDisplay.innerText = userscore;
    compScoreDisplay.innerText = compscore;
  }
};
    

choices.forEach((choice)=>{ 
    choice.addEventListener("click",()=>{
        const userchoice= choice.getAttribute("id");
        playgame(userchoice);
    }
   )
})

const reset = () => {
  userscore = 0;
  compscore = 0;
  result.innerText = "🔄 SCORES RESET!";
  userScoreDisplay.innerText = userscore;
  compScoreDisplay.innerText = compscore;
};


msg.addEventListener("click", reset);
