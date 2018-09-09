let rechtFragen = require("./fragenTest.json");

// gets a random pair (question/answer) from the a given object
function getQuestionPair(dict) {
    let rand = Math.floor(Math.random() * dict.length);
    return Object.entries(dict)[rand][1];
}

// function addNewLines(phrase) {
//     let re = /\d\.\s.+\;/g;
//     let question = getQuestionPair(phrase)["Antwort"];
//     let phrases = question.match(re);
//     console.log(phrases);
// }

function addNewLines(phrase) {
    let re = /\d\.\s.+\;/;
    let response = getQuestionPair(phrase)["Antwort"];
    if (re.test(response)) {
        let results = response.split(";");
        response = results.join("\n");
    }
    return response;
}

console.log(addNewLines(rechtFragen));