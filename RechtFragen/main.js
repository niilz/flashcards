let rechtFragen = r;
let vokabeln = v;

let allQuestions = [...rechtFragen, ...vokabeln];
console.log(allQuestions);

// gets a random pair (question/answer) from the a given object
function getQuestionPair(dict) {
    let rand = Math.floor(Math.random() * dict.length);
    return Object.entries(dict)[rand][1];
}

// getting the DOM elements 
let card = document.querySelector(".card")
let question = document.querySelector(".question");
let solution = document.querySelector(".solution");
let button = document.querySelector("button");
let wordButton = document.querySelector(".word");
let inputField = document.querySelector(".answer");

// create a random Question-pair and displaying it an the page
let randomPair = getQuestionPair(rechtFragen)
question.textContent = randomPair["Frage"];


// get curser into input-field
if (inputField) inputField.focus();

function addEnterFunctionForNewWord() {
    //attache newWord-funtion to enter Button when on backside
    document.addEventListener("keydown", e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            getNewWord();
        }
    });
}
function splitPhraseIfSeveralNumbers(phrase) {
    let re = /\d\.\s.+\;/;
    if (re.test(phrase)) {
        phrase = phrase.split(";");
    }
    return phrase;
}

// checks whether the input is the right translation
function evaluate() {
    card.classList.add("flipped");
    let answer = document.querySelector(".answer");
    if (answer) {
        answer = answer.value;
        if (answer == randomPair["Antwort"]) solution.innerHTML = "Korrekt!";
        else solution.innerHTML = `Leider nein leider garnischt.<br>Die richtige Antwort wäre <em>"${randomPair[1]}"</em> gewesen.`;
    } else {
        solution.innerHTML = splitPhraseIfSeveralNumbers(randomPair["Antwort"]);
        console.log(splitPhraseIfSeveralNumbers(randomPair["Antwort"]));
    addEnterFunctionForNewWord();
    }
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
