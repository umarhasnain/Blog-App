import { auth, onAuthStateChanged } from "./firebase.js";
import {
  db,
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "./firebase.js";

//Current SIgnIn User

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("Current User", uid, user);
    let userGreeting = document.getElementById("userName");
    userGreeting.innerHTML = user.displayName;

    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }
});

//Show Results

  const showResults = () => {
    const q = collection(db,'results');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Clear existing rows

        let rows = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            
            rows += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.date || 'N/A'}</td>
                    <td>${data.score || 'N/A'}</td>
                    <td>${data.quizName || 'N/A'}</td>
                   
                </tr> 
            `;
        });

        tableBody.innerHTML = rows;
    });
};

showResults();

let question = document.getElementById("question");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let numberCount = document.getElementById("numberCount");
let time = document.getElementById("timer");


let htmlQuizStart = document.getElementById("htmlQuizStart");
// let cssQuizStart = document.getElementById("cssQuizStart");

let nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
  nextQuestion();
});   

function changePageLocation() {
  setTimeout(function () {
    window.location.href = "quizCourse.html";
  }, 5000); // Redirect after 4 seconds
}

let index = 0;
let score = 0;
// let quizName = document.getElementById('quizName');
// console.log(quizName)

function nextQuestion() {
  var options = document.getElementsByName("opt");
  

  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      var selected = options[i].value;
      var userAnswer = htmlQuestions[index - 1][`option${selected}`];
      var correctAnswer = htmlQuestions[index - 1].correctOption;
      if (userAnswer === correctAnswer) {
        score++;
      }
      console.log();
    }

    options[i].checked = false;
    nextBtn.disabled = true;
  }

  if (index > htmlQuestions.length - 1) {
    
    var scoreBoard = (score / htmlQuestions.length) * 100 + "%";

    function result() {
      
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    var date = new Date().toDateString()
    console.log("Current User", uid, user);
    const docRef = addDoc(collection(db, "results"), {
      score: scoreBoard,
      name:user.displayName,
      email:user.email,
      uid:user.uid,
      date : date,
     quizName:"HTML5"

    });
    console.log("result Submitted", docRef.id);
    
  } else {
    // User is signed out
    console.log("Current User SignOUt");
  }
});
    
    }
    result();

    if (scoreBoard >= "70") {
      Swal.fire(
        "Congratulation! 🎉",
        "You are Passed!" + "<br>" + "Your Score is " + scoreBoard,
        "success"
      );

      changePageLocation();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are Failed!" + "  " + "Your Score is " + scoreBoard,
        footer: '<a href="quizDetails.html">RETAKE QUIZ</a>',
      });
      changePageLocation();
    }
  } else {
    numberCount.innerHTML = index;
    question.innerHTML = htmlQuestions[index].question;
    option1.innerText = htmlQuestions[index].option1;
    option2.innerText = htmlQuestions[index].option2;
    option3.innerText = htmlQuestions[index].option3;
    option4.innerText = htmlQuestions[index].option4;

    index++;
  }
}
nextQuestion();


function enableBtn() {
  nextBtn.disabled = false;
}

window.enableBtn = enableBtn;


// TIMER

// var min = 1;
var sec = 59;

var timer = document.getElementById("timer");

var interval = setInterval(function () {
  timer.innerHTML = `Time: ${sec}`;
  sec--;

  if (sec == 0) {
    nextQuestion();
    // min = 1;
    sec = 59;
  } else if (nextBtn == true) {
    sec = 59;
  }
}, 1000);


console.log(htmlQuestions);




