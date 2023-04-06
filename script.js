// media queries
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
var i=0;

//Questions, options and answers:
var questions =["¿Cuánto quieres a Ximena?","¿Cuál es su serie favorita?","¿A qué concierto NO ha ido Ximena?","¿Cuándo es su cumpleaños?","¿Cuántos tatuajes tiene Ximena?","¿Cómo se llama su psicóloga?","You are done!"];
var ans1 = ["Nada","Poco","Mucho","Muchísimo","Breaking Bad","Game of Thrones","Arcane","Hunting of Hillhouse","EDC","Billie Eilish","The Killers","Falling in Reverse","14 Nov","15 nov","16 nov","17 nov","2","3","4","1","Ale","Yuri","Moni","Alma"];
var correct = [3,1,3,0,2,1];
var ansclick = [];
var emoji =[];

// Timer control:
var secondsLeft=60;
startQuiz.addEventListener("click", function() {
  go();

   // Initial time available
  var timerID = setInterval(function() {
    secondsLeft--;
    time.textContent = "Time: " + secondsLeft;

      if(secondsLeft === 0) {
        clearInterval(timerID);
        time.textContent ="";
        // Calls function 
        chema(8);
      }

  },1000)
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

// Event listenners for buttons
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
      b1.textContent = ans1[i*4];
      b2.textContent = ans1[(i*4)+1];
      b3.textContent = ans1[(i*4)+2];
      b4.textContent = ans1[(i*4)+3];
  }

function buttonlis(){
  if (i<5){
    anscheck()
    i++;
    console.log("i: "+i);
    nextq();
   } else {
    title.textContent =questions[6];
    wrong.textContent = "You answered: "+ emoji;
     for (var  y= 0; y < buttons.length; y++) {
       buttons[y].style.display = "none";
     }
   }
}

// Checking answers
function anscheck(){
  console.log("ansclick: "+ ansclick[i]);
  console.log("correct: "+ correct[i]);
  // console.log("i: "+i);
  if (ansclick[i]!=correct[i]){
    emoji.push("❌");
    wrong.textContent = "Wrong Answer!" + emoji;
    secondsLeft = secondsLeft-5;

    } else {
      emoji.push("✅");
      wrong.textContent = "Right Answer!"+ emoji; }
}

function resetmsg(){
  wrong.textContent = "";
}



 function chema(age){
   console.log("your age is: "+age);}