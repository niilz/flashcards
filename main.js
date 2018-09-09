// load questionSets into scope
let rechtFragen = r;
let vokabeln = v;
// choose a questionSet
let questionSet = vokabeln.slice(0, 20).concat(rechtFragen.slice(0, 20)); 
console.log(questionSet)

// getting the DOM elements 
let card = document.querySelector(".card")
let question = document.querySelector(".question");
let solution = document.querySelector(".solution");
let checkAnswerButton = document.querySelector(".check_answer");
let newWordButton = document.querySelector(".new_word");
let inputField = document.querySelector(".answer");


// gets a random pair (question/answer) from the a given array of objects
function getQuestionPair(dict) {
    let rand = Math.floor(Math.random() * dict.length);
    return Object.entries(dict)[rand][1];
}

// innitial randomPair on Page-Load
let randomPair = getQuestionPair(questionSet);

// get curser into input-field
if (inputField) inputField.focus();

// display first question
displayQuestion(randomPair);

// write question on the front of card
function displayQuestion(rP) {
    // remove input field from page if it is not needed (e.g. for rechtFragen)
    if (rP["input"]) document.querySelector("input").classList.remove("hidden");
    else document.querySelector("input").classList.add("hidden");
    card.classList.remove("flipped");
    question.textContent = rP["Frage"];
}

// create a new random Question-pair and displaying it on the page
function displayBack() {
    // display answer on the back of the card
    card.classList.add("flipped");
    showResult();

    // clear the input field
    let answer = document.querySelector(".answer");
    if (answer) answer.value = "";

    // create a new random pair in the global scope
    randomPair = getQuestionPair(questionSet);
}

// flip the card and show the answer
function showResult() {

    // create backside of the card
    let answer = document.querySelector(".answer");
    if (randomPair["input"]) {
        answer = answer.value;
        if (answer == randomPair["Antwort"]) solution.innerHTML = "Korrekt!";
        else solution.innerHTML = `Leider nein leider garnischt.<br>Die richtige Antwort wäre <em>"${randomPair["Antwort"]}"</em> gewesen.`;
    } else {
        let answerList = splitPhraseIfSeveralNumbers(randomPair["Antwort"]);
        if (typeof answerList == "string") solution.innerHTML = randomPair["Antwort"];
        else {
            solution.innerHTML = "";
            let answerListDOM = document.createElement("ul");
            solution.appendChild(answerListDOM);
            answerList.forEach(a => {
                let listElement = document.createElement("li");
                answerListDOM.appendChild(listElement);
                listElement.innerHTML = a;
            });
        }
    } 
}


// if question has several numbers split them into array
function splitPhraseIfSeveralNumbers(phrase) {
    let re = /\d\.\s.+\;/;
    if (re.test(phrase)) {
        phrase = phrase.split(";");
    }
    return phrase;
}



// attach the Flipping-Card-functionality to "Enter"-key
function flipBack(event) {
    if (event.keyCode == 13) {
    displayBack();
    document.removeEventListener("keydown", flipBack);
    document.addEventListener("keydown", flipFront);
    };
    
}

function flipFront(event) {
    if (event.keyCode == 13) {
        displayQuestion(randomPair);
        document.removeEventListener("keydown", flipFront);
        document.addEventListener("keydown", flipBack);
        };
    let ul = document.querySelector("ul");
    if (ul) ul.parentNode.removeChild(ul);
}

// attache the show-result function to the button on frontside of card
checkAnswerButton.addEventListener("click", displayBack);

// attache newWord-function to button on backside of card
newWordButton.addEventListener("click", displayQuestion);

// flip functionality for initial page-load
document.addEventListener("keydown", flipBack);




