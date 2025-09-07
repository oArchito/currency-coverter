let boxes=document.querySelectorAll(".box");
let rsrbtn=document.querySelector("#rst");
let trn=document.getElementById("turn");
let scoreO = 0;
let scoreX = 0;
const placeSound = document.getElementById("placeSound");
const winSound = document.getElementById("winSound");


const scoreODisplay = document.getElementById("scoreO");
const scoreXDisplay = document.getElementById("scoreX");


let turnO=true;
 const winptrn=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

 ];
 boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO==true){
         box.innerText="O";
         turnO=false;
         placeSound.play();
         trn.innerText= "Player X-It's your turn now";
        }
        else{
         box.innerText="X";
         turnO=true;
         placeSound.play();
          trn.innerText= "Player O-It's your turn now";
        }
        
          box.disabled=true;
          checkwinner();
    }
    );
 });
 checkwinner = () => {
  for(let pattern of winptrn){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
      if(pos1 === pos2 && pos2 === pos3){
        boxes[pattern[0]].classList.add("win");
        boxes[pattern[1]].classList.add("win");
        boxes[pattern[2]].classList.add("win");

        trn.innerText = ` 🎉 WINNER IS ${pos1}`;
        winSound.play();
        disablebox();

        if (pos1 === "O") {
          scoreO++;
          scoreODisplay.innerText = scoreO;
        } else {
          scoreX++;
          scoreXDisplay.innerText = scoreX;
        }
        return;  
      }
    }
  }

  
  const allFilled = [...boxes].every(box => box.innerText !== ""); /*[...boxes] to convert
   NodeList to Array before .every() is .. use kiya hai and allfilled true kiya condition se
  */
  if (allFilled) {
    trn.innerText = "It's a Draw! 🤝";
    disablebox();
  }
};



 function disablebox() {
for(let box of boxes){
   box.disabled=true;
}
 }

 

 const reset=()=>{
   turnO=true;
   enableboxes();
 }
  function enableboxes() {
for(let box of boxes){
   box.disabled=false;
   box.innerText="";
   box.style.backgroundColor="";
   
   box.classList.remove("win");
}
trn.innerText="Player O -It's ur turn";
 }
rsrbtn.addEventListener("click", reset);
 