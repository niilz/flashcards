// load questionSets into scope
let arbeitsRechtFragen = ar;
let vokabelFragen = v;
let hgbFragen = hgb;
let orgaFragen = orga;
let interkulturelleFragen = ik;

// getting the DOM elements 
// Card Elements
let card = document.querySelector(".card")
let question = document.querySelector(".question");
let solution = document.querySelector(".solution");
let inputField = document.querySelector(".answer");
// Buttons
let checkAnswerButton = document.querySelector(".check_answer");
let newWordButton = document.querySelector(".new_word");
let buttonCorrect = document.querySelector(".correct");
let buttonWrong = document.querySelector(".wrong");
let reloadButton = document.querySelector(".reload");
// choiceButtons
let interkulturell = document.querySelector("#interkulturelle_fragen");
let organisation = document.querySelector("#orga_fragen");
let arbeitsRecht = document.querySelector("#arbeits_recht");
let handelsRecht = document.querySelector("#handels_recht");
let vokabeln = document.querySelector("#vokabeln");
// Text outside the Card
let remainingCards = document.querySelector(".remaining");

// define question-set
// global questionSet
let questionSet = orgaFragen;

function defineQuestionSet(set) {
    questionSet = set;
}

interkulturell.addEventListener("change", () => {
    defineQuestionSet(interkulturelleFragen);
    newCard();
});
arbeitsRecht.addEventListener("change", () => {
    defineQuestionSet(arbeitsRechtFragen);
    newCard();
});
vokabeln.addEventListener("change", () => {
    defineQuestionSet(vokabelFragen);
    newCard();
});
handelsRecht.addEventListener("change", () => {
    defineQuestionSet(hgbFragen);
    newCard();
});
organisation.addEventListener("change", () => {
    defineQuestionSet(orgaFragen);
    newCard();
});


// gets a random pair (question/answer) from the a given array of objects
function getQuestionPair(dict) {
    let rand = Math.floor(Math.random() * dict.length);
    return Object.entries(dict)[rand][1];
}

// innitial randomPair on Page-Load
let randomPair = getQuestionPair(questionSet);

// display first question
displayQuestion(randomPair);

// write question on the front of card
function displayQuestion(rP) {
    // get curser into input-field
    if (inputField) inputField.focus(); 
    // remove input field from page if it is not needed (e.g. for rechtFragen)
    if (rP["input"]) {
        inputField.classList.remove("hidden");
        buttonWrong.classList.add("hidden");
        buttonCorrect.classList.add("hidden");
    } else {
        inputField.classList.add("hidden");
        buttonWrong.classList.remove("hidden");
        buttonCorrect.classList.remove("hidden");
    }
    // turn card to frons-side
    card.classList.remove("flipped");
    // write question on front-side of the card
    question.textContent = rP["Frage"];

    // display current stack of cards
    remainingCards.innerHTML = `Es sind noch ${questionSet.length} Karten im Deck`
}

// used inside of "flipBackAndDisplayAnswer" to split multiple answers
function splitPhraseIfSeveralNumbers(phrase) {
    let re = /\d\.\s.+\;/;
    if (re.test(phrase)) {
        phrase = phrase.split(";");
    }
    return phrase;
}

// flip card to back-side and display/render answer(s)
function flipBackAndDisplayAnswer() {
    // display answer on the back of the card
    card.classList.add("flipped");

    // if no input no "nächste Frage"
    if (randomPair["input"]) newWordButton.classList.remove("hidden");
    else newWordButton.classList.add("hidden");

    // create backside of the card
    let answer = document.querySelector(".answer");
    if (randomPair["input"]) {
        answer = answer.value;
        if (answer == randomPair["Antwort"]) solution.innerHTML = "Korrekt!";
        else solution.innerHTML = `Leider nein leider garnischt.<br>Die richtige Antwort wäre <em>"${randomPair["Antwort"]}"</em> gewesen.`;
    } else {
        // create List of possible multiple-answer
        let answerList = splitPhraseIfSeveralNumbers(randomPair["Antwort"]);
        // if it is just one answer display it
        if (typeof answerList == "string") solution.innerHTML = randomPair["Antwort"];
        // if muslitple answers display them as a list
        else {
            solution.innerHTML = "";
            let answerListDOM = document.createElement("ol");
            solution.appendChild(answerListDOM);
            answerList.forEach(a => {
                // check if a number is in front and delete it so the ordered list tag provides numbers;
                let numRegEx = /^\s*\d+\.\s/g;
                a = a.replace(numRegEx, "");
                let listElement = document.createElement("li");
                answerListDOM.appendChild(listElement);
                listElement.innerHTML = a;
            });
        }
    } 

    // clear the input field if there is one for next questions
    let answerInput = document.querySelector(".answer");
    if (answerInput) answerInput.value = "";
}

// get a new card
function newCard() {
    // create new randomPair in global scope
    randomPair = getQuestionPair(questionSet);
    displayQuestion(randomPair);
}

// removes current randomPair of question Answer from global questionSet-Array of objects
function removeCardFromSet() {
    let idx = questionSet.findIndex(qa => qa["Frage"] == randomPair["Frage"]);
    questionSet.splice(idx, 1);
}

// attache the show-result function to the button on frontside of card
checkAnswerButton.addEventListener("click", flipBackAndDisplayAnswer);

// attache newWord-function to button on backside of card
newWordButton.addEventListener("click", newCard);

// attache functionality "newCard" to wrong-button
buttonWrong.addEventListener("click", newCard);
buttonCorrect.addEventListener("click", () => {
    removeCardFromSet();
    newCard();
});

// reload the page / begin from the beginning
reloadButton.addEventListener("click", () => location.reload());




