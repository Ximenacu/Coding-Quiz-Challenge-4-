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
var message =document.querySelector("#message");
var startagain = document.querySelector(".startagain");
var resetscore = document.querySelector(".resetscore");
var namescore=[];
var i=0;
var n=0;

//Questions, options and answers:
var questions =["¿Cuánto quieres a Ximena?","¿Cuál es su serie favorita?","¿A qué concierto NO ha ido Ximena?","¿Cuándo es su cumpleaños?","¿Cuántos tatuajes tiene Ximena?","¿Cómo se llama su psicóloga?","You completed the Quiz."];
var ans1 = ["Nada","Poco","Mucho","Muchísimo","Breaking Bad","Game of Thrones","Arcane","Hunting of Hillhouse","EDC","Billie Eilish","The Killers","Falling in Reverse","14 Nov","15 nov","16 nov","17 nov","2","3","4","1","Ale","Yuri","Moni","Alma"];
var correct = [3,1,3,0,2,1];
var ansclick = [];
var emoji =[];
var score=0;

// Timer control:
var secondsLeft=25;// Initial time available

startQuiz.addEventListener("click", function() {
  var secondsLeft=25;// Initial time available
  var timerID = setInterval(function() {
    secondsLeft--;
    console.log("seconds left"+ secondsLeft);
    time.textContent = "Time: " + secondsLeft;

    if (secondsLeft < 0 || i==6) {
      clearInterval(timerID);
      timesup();
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
    anscheck()
    i++;
    nextq();
   } else {  // you finished your quiz!
    timesup()
   }
}

// Checking answers
function anscheck(){
  if (ansclick[i]!=correct[i]){
    emoji.push("❌");
    wrong.textContent = "Wrong Answer!" + emoji;
    secondsLeft = secondsLeft-5;

    } else {
      score++;
      emoji.push("✅");
      wrong.textContent = "Right Answer!"+ emoji;
    }
}

function timesup(){
  // for (var  y= 0; y < buttons.length; y++) {
  //   buttons[y].style.display = "none";
  // }
  hideoptions()

  if (i<5){
    time.textContent ="Time: Out of time!";
    title.textContent = "You ran out of time!";
  } else {
    time.textContent ="Time: -";
    title.textContent = questions[i];
  }

  if (ansclick!=""){
    wrong.textContent = "You answered: "+ emoji+ ":  "+score+" / 6 correct answers";
  }

  var finalscore=score*100/6;
  p.textContent= "Your final score is: " + Math.round(finalscore) +".";
  form.style.display = "block";
  startagain.style.display = "block";
  // startQuiz.style.display = "block";
}

submit.addEventListener("click", function(event){
  event.preventDefault();
  var name = document.querySelector("#name").value;

  // var user = {
  //   name: name,
  //   score: score
  // };
  // console.log("user.name: "+ user.name)
  // console.log("user.score: "+ user.score)
  // localStorage.setItem("user", JSON.stringify(user));
  n++;
  namescore.push(name);
  namescore.push(score);
  console.log("namescore name: "+ namescore[0])
  console.log("namescore score: "+ namescore[1])
  message.textContent="Thanks for submitting your name, you can now compare your score or try again!"

});

high.addEventListener("click", function(event){
  secondsLeft=0;
  console.log("seconds left after click");
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


// var highscore=JSON.parse(localStorage.getItem("studentGrade"));
//   p.textContent=highscore;
p.textContent=namescore;

});

startagain.addEventListener("click", function(){
  window.location.reload();
})

function hideoptions(){
  for (var  y= 0; y < buttons.length; y++) {
    buttons[y].style.display = "none";
  }
}