// Global Variable Declarations Start

/** @type {Number} */
let var1 = null;
/** @type {Number} */
let var2 = null;
/** @type {String} */
let operator = null;
/** @type {Number} */
let answer = null;

const browserWindow = window;
const answerView = document.querySelector("#answerView");

const numString = "0123456789";
const operatorString = "+-*/^%";

// Global Variable Declarations End

// All Functions Here

function typeOfKeyPressed(pressedKey) {
  if (numString.indexOf(pressedKey) != -1) {
    return "NUMBER";
  } else if (pressedKey == ".") {
    return "DECIMAL";
  } else if (
    operatorString.indexOf(pressedKey) != -1 ||
    pressedKey == "Enter" ||
    pressedKey == "Backspace"
  ) {
    return "OPERATOR";
  } else {
    return false;
  }
}

function populateCalculationView() {
  pass;
}

function clearCalculationView() {
  pass;
}

function populateAnswerView(pressedKey) {
  if (answerView.textContent*1 == 0) {
    answerView.textContent = pressedKey;
  }
  else if (answerView.textContent.includes(".") && pressedKey == ".") {
    console.log("Decimal Already Present");
  }
  else {
    answerView.textContent += pressedKey;
  }
}

function clearAnswerView() {
  pass;
}

function parseAnswerView() {
    return answerView.textContent*1;
}

function operate() {
  pass;
}

function roundOff(number) {
  pass;
}

/**
 * @param {KeyboardEvent} event
 */
function test(event) {
  console.log(event);
  answerView.textContent = null;
  answerView.textContent += event.key;
}

function scrollToEnd(scrollableElement) {
    scrollableElement.scrollLeft = scrollableElement.scrollWidth;
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
}

// All Functions Above

// Main Logic

browserWindow.addEventListener("keydown", (event) => {
  let pressedKey = event.key;
  let typeOfKey = typeOfKeyPressed(pressedKey);
  if (typeOfKey == "NUMBER" || typeOfKey == "DECIMAL") {
    
    console.log(pressedKey);
    populateAnswerView(pressedKey);
    scrollToEnd(answerView);

  } else if (typeOfKey == "OPERATOR") {
    
    console.log("OP");
    parseAnswerView()



  } else {
    console.log("Key Not Allowed");
  }
});
