//Coding Quiz Challenge
// Media Queries
var time = document.querySelector("#time");
var title = document.querySelector(".title");
var p = document.querySelector("#p");
var startQuiz = document.querySelector(".startQuiz");
var buttons = document.querySelectorAll(".button");
var b1 = document.querySelector("#b1");
var b2 = document.querySelector("#b2");
var b3 = document.querySelector("#b3");
var b4 = document.querySelector("#b4");
var wrong = document.querySelector("#wrong");
var form = document.querySelector(".form");
var submit = document.querySelector("#submit");
var high = document.querySelector("#high");
var message = document.querySelector("#message");
var startagain = document.querySelector("#startagain");
var resetscore = document.querySelector(".resetscore");
var high1 = document.querySelector(".high1");
var high2 = document.querySelector(".high2");
var high3 = document.querySelector(".high3");
var high4 = document.querySelector(".high4");
var high5 = document.querySelector(".high5");
var namescore=[];  
var i=0;
var omg;
var secondsLeft = 25;
var secondsLeftout = 25;
var finalscore;

//Questions, options and answers:
var questions =["1.- This is Question #1?","2.- This is Question #2?","3.- This is Question #3?","4.- This is Question #4?","5.- This is Question #5?","6.- This is Question #6?","You completed the Quiz."];
var ans1 = ["A","B","C","D","Breaking Bad","Game of Thrones","Arcane","Hunting of Hillhouse","EDC","Billie Eilish","The Killers","Falling in Reverse","14 Nov","15 feb","16 dic","17 Mar","2","3","4","1","Ale","Yuri","Moni","Alma"];
var correct = [3,1,3,0,2,1];
var ansclick = [];
var emoji =[];
var score=0;

// Retrieving stored names and scores:
init()

// Timer control:
startQuiz.addEventListener("click", function() {
  var timerID = setInterval(function() {
    if (secondsLeftout<secondsLeft){
      secondsLeft=secondsLeftout;
    }
    secondsLeft--;
    time.textContent = "Time: " + secondsLeft;

    if (secondsLeft < 1 || i==6) {
      clearInterval(timerID);
      timesup();
    }

    if (omg==true) {
      clearInterval(timerID);
    }
  }
  ,1000)
  go();
});

// Setup For Questions
function go(){
  p.textContent =" ";
  startQuiz.style.display = "none";
  nextq();

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "block";
  }
}

// Event listenners for Quiz options buttons
b1.addEventListener("click", function() {
    ansclick.push(0);
    buttonlis()
});
b2.addEventListener("click", function() {
    ansclick.push(1);
    buttonlis()
});
b3.addEventListener("click", function() {
    ansclick.push(2);
    buttonlis()
});
b4.addEventListener("click", function() {
    ansclick.push(3);
    buttonlis()
});

// Next question Function
function nextq(){
      title.textContent =questions[i];
      if (i<6){
        b1.textContent = "A) " + ans1[i*4];
        b2.textContent = "B) " + ans1[(i*4)+1];
        b3.textContent = "C) " + ans1[(i*4)+2];
        b4.textContent = "D) " + ans1[(i*4)+3];
      }
  }

// Button listener commands:
function buttonlis(){
  if (i<6){
    anscheck(secondsLeft)
    i++;
    nextq();
   } else {  // you finished your quiz!
    timesup()
   }
}

// Checking answers
function anscheck(secondsLeft){
  
  if (ansclick[i]!=correct[i]){
    emoji.push("❌");
    wrong.textContent = "Wrong Answer!" + emoji;
    secondsLeftout = secondsLeft-4;

    } else {
      score++;
      emoji.push("✅");
      wrong.textContent = "Right Answer!"+ emoji;
    }
}

// Display when timer is over or quiz is finished:
function timesup(){
  hideoptions()

  if (i<6){
    time.textContent ="Time: Out of time!";
    title.textContent = "You ran out of time!";
  } else {
    time.textContent ="Time: -";
    title.textContent = "You completed the Quiz.";
  }

  if (ansclick!=""){
    wrong.textContent = "You answered: "+ emoji+ ":  "+score+" / 6 correct answers";
  }

  finalscore=Math.round(score*100/6); // IF THE TOTAL NUMBER OF QUESTIONS IS 6
  p.textContent= "Your final score is: " + finalscore +" / 100";
  form.style.display = "block";
  startagain.style.display = "block";
  document.getElementById("startagain").style.margin = "0 0 0 9.5%";
}

//Retrieving name and score from local storage:
function init(){
  var stored = JSON.parse(localStorage.getItem("StoredNamescore"));
  if (stored != null){
    namescore = stored;
  }

}

// When submit is clicked: Storing name and score. 
submit.addEventListener("click", function(event){
  event.preventDefault();
  var name = document.querySelector("#nameInput").value;

  if (namescore.length>9){
    namescore.shift();
    namescore.shift();
  }

  namescore.push(name);
  namescore.push(finalscore);

  localStorage.setItem("StoredNamescore", JSON.stringify(namescore));
  message.textContent="Thanks for submitting your name, you can now compare your score or try again!"
});

// when highscores is clicked:
high.addEventListener("click", function(event){
  omg = true;
  title.textContent = "Scores";
  startQuiz.style.display = "none";
  time.style.display = "none";
  wrong.style.display = "none";
  form.style.display = "none";
  message.style.display = "none";
  high.style.display = "none";
  hideoptions()
  startagain.style.display = "block";
  resetscore.style.display = "block";
   if (namescore == ""){
     p.textContent="No scores to display yet.";    
   } else { 

  p.textContent="";
  if(namescore[0]!==undefined){
    high1.textContent=namescore[0]+"   with:  "+namescore[1]+"  pts";
  }
  if(namescore[2]!==undefined){
    high2.textContent=namescore[2]+"   with:  "+namescore[3]+"  pts";
  }
  if(namescore[4]!==undefined){
    high3.textContent=namescore[4]+"   with:  "+namescore[5]+"  pts";
  }
  if(namescore[6]!==undefined){
    high4.textContent=namescore[6]+"   with:  "+namescore[7]+"  pts";
  }
  if(namescore[8]!==undefined){
    high5.textContent=namescore[8]+"   with:  "+namescore[9]+"  pts";
  }
  }

});

// to errase stored scores:
resetscore.addEventListener("click", function(){
  window.localStorage.removeItem('StoredNamescore');
  namescore == "";
  p.textContent="No scores to display yet."; 
  high1.style.display = "none";
  high2.style.display = "none";
  high3.style.display = "none";
  high4.style.display = "none";
  high5.style.display = "none";

});

// go back to main 
startagain.addEventListener("click", function(){
  window.location.reload();
})

// hide buttons
function hideoptions(){
  for (var  y= 0; y < buttons.length; y++) {
    buttons[y].style.display = "none";
  }
}