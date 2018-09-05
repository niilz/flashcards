let questions = q;
console.log(questions);

// makes an "object-size-function" available
Object.prototype.size = function() {
    let size = Object.keys(this).reduce(k => k += 1, 0);
    return size;
}

// gets a random pair (question/answer) from the a given object
function getQuestionPair(dict) {
    let rand = Math.floor(Math.random() * dict.size());
    return Object.entries(dict)[rand];
}

// getting the DOM elements 
let card = document.querySelector(".card")
let question = document.querySelector(".question");
let solution = document.querySelector(".solution");
let button = document.querySelector("button");

// create a random Question-pair and displaying it an the page
let randomPair = getQuestionPair(questions)
question.textContent = randomPair[0];


// checks whether the input is the right translation
function evaluate() {
    card.classList.toggle("flipped");
    let answer = document.querySelector(".answer").value;
    if (answer == randomPair[1]) solution.innerHTML = "Korrekt!";
    else solution.innerHTML = `Leider nein leider garnischt.<br>Die richtige Antwort wäre <em>"${randomPair[1]}"<em> gewesen.`;
}

// attache the evaluate function to the button-click
button.addEventListener("click", evaluate);

// attach the evaluate function to "Enter"
document.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
        e.preventDefault(); // otherwise "Enter" reloads the page
        evaluate();
    }
});

