let questions = q;

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
let wordButton = document.querySelector(".word");
let inputField = document.querySelector(".answer");

// create a random Question-pair and displaying it an the page
let randomPair = getQuestionPair(questions)
question.textContent = randomPair[0];

// get curser into input-field
inputField.focus();

function addEnterFunctionForNewWord() {
    //attache newWord-funtion to enter Button when on backside
    document.addEventListener("keydown", e => {
        console.log(card.classList)
        if (e.keyCode == 13) {
            e.preventDefault();
            getNewWord();
        }
    });
}

// checks whether the input is the right translation
function evaluate() {
    card.classList.toggle("flipped");
    let answer = document.querySelector(".answer").value;
    if (answer == randomPair[1]) solution.innerHTML = "Korrekt!";
    else solution.innerHTML = `Leider nein leider garnischt.<br>Die richtige Antwort wäre <em>"${randomPair[1]}"<em> gewesen.`;
    addEnterFunctionForNewWord();
}

function getNewWord() {
    window.location.reload();
    document.addEventListener("keydown", e => {
        if (e.keyCode == 13) {
            e.preventDefault(); // otherwise "Enter" reloads the page
            evaluate();
        }
    });
    document.removeEventListener("keydown", evaluate);

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

document.removeEventListener("keydown", evaluate);

// attache newWord-function to button on backside of card
wordButton.addEventListener("click", getNewWord);

