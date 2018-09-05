Flashcards is a simple HTML, CSS, JS implementation of question-answer-flashcards.

It imports a json file which is structured as:
"question": "solution".
The fragen.json for example provides vocabulary pairs:
"german-word": "english-translation"

The flashcard shows a random german word and the user can type in the answer (the translation). By pressing the "übeprüfen" button (or hitting the enter-key) the backside of the card reveals whether the user guessed right. If not the backside shows the actual answer.

Since all files are read into the index.html file via meta-hooks (link-, script-tagy), the entire program can be run locally. You just need to put all files (index.html, main.css, main.js, fragen.json) into one local folder.
NO SERVER, NO XML-requests, NO FETCH or anything of that sort is required.

To swap out the "question: answer"-pairs you could just insert a different set of json-data into the fragen.json file. If you want to call that file anything else, you can, just do not forget to change the file-name inside of the script-tag that reads the json-file into the html-file (in the head-section).
