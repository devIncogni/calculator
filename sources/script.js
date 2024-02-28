//#region Global Variable Declarations Start

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
const calcView = document.querySelector("#calculationView");

const numString = "0123456789";
const operatorString = "+-*/^%";

//#endregion Global Variable Declarations End

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

function typeOfOperator(pressedKey) {
  return pressedKey;
}

function populateCalculationView(content, op) {
  calcView.textContent = content.toString() + " " + op.toString() + " ";
}

function clearCalculationView() {
  calcView.textContent = "";
}

function populateAnswerView(content) {
  if (
    answerView.textContent * 1 == 0 &&
    content != "." &&
    !answerView.textContent.includes("0.")
  ) {
    answerView.textContent = content;
  } else if (answerView.textContent.includes(".") && content == ".") {
    console.log("Decimal Already Present");
  } else {
    answerView.textContent += content;
  }
}

function clearAnswerView(resetValue = "0") {
  answerView.textContent = resetValue;
}

function parseAnswerView() {
  return answerView.textContent * 1;
}

function operate(o1, o2, op) {
  switch (op) {
    case "+":
      return add(o1, o2);

    case "-":
      return sub(o1, o2);

    case "*":
      return mul(o1, o2);

    case "/":
      return div(o1, o2);

    case "^":
      return pow(o1, o2);

    case "^2":
      return sq(o1);

    case "sqrt":
      return sqrt(o1);
    case "q&r":
      return qr(o1);

    case "1/":
      return reci(o1);

    default:
      console.log("No Operation");
      return o2;
  }
}

//#region Operation Functions Start

function roundOff(number) {
  return Math.round(number * 10000) / 10000;
}

function add(o1, o2) {
  if (o1 == null) {
    o1 = 0;
  }
  if (o2 == null) {
    o2 = 0;
  }

  return o1 + o2;
}

function sub(o1, o2) {
  if (o1 == null) {
    o1 = 0;
  }
  if (o2 == null) {
    o2 = 0;
  }

  return o1 - o2;
}

function mul(o1, o2) {
  if (o1 == null) {
    o1 = 1;
  }
  if (o2 == null) {
    o2 = 1;
  }

  return o1 * o2;
}

function div(o1, o2) {
  if (o1 == null) {
    o1 = 1;
  }
  if (o2 == null) {
    o2 = 1;
  }

  return o1 / o2;
}

function pow(o1, o2) {
  if (o1 == null) {
    o1 = 0;
  }
  if (o2 == null) {
    o2 = 1;
  }

  return o1 ** o2;
}

function sq(o1) {
  if (o1 == null) {
    o1 = 0;
  }

  return o1 ** 2;
}

function sqrt(o1) {
  if (o1 == null) {
    o1 = 0;
  }

  return Math.sqrt(o1);
}

function qr(o1) {
  if (o1 == null) {
    o1 = 0;
  }

  return (
    "(" + Math.floor(o1 / o2).toString() + ", " + (o1 % o2).toString() + ")"
  );
}

function reci(o1) {
  if (o1 == null) {
    o1 = 0;
  }

  return 1 / o1;
}

//#endregion

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

let lastKeyWasOperator = false;

browserWindow.addEventListener("keydown", (event) => {
  let pressedKey = event.key;
  let typeOfKey = typeOfKeyPressed(pressedKey);

  if (typeOfKey == "NUMBER" || typeOfKey == "DECIMAL") {
    console.log(pressedKey);

    if (lastKeyWasOperator) {
      clearAnswerView();
    }

    populateAnswerView(pressedKey);
    scrollToEnd(answerView);
    lastKeyWasOperator = false;
  } else if (typeOfKey == "OPERATOR") {
    console.log(pressedKey);

    if (lastKeyWasOperator) {
      lastKeyWasOperator = true;
      operator = typeOfOperator(pressedKey);
      populateCalculationView(answer, operator);
      scrollToEnd(calcView);
    } else {
      lastKeyWasOperator = true;
      var2 = parseAnswerView();
      answer = roundOff(operate(var1, var2, operator));
      var1 = answer;
      var2 = null;
      operator = typeOfOperator(pressedKey);
      populateCalculationView(answer, operator);
      clearAnswerView();
      populateAnswerView(answer);
      scrollToEnd(answerView);
      scrollToEnd(calcView);
    }
  } else {
    console.log("Key Not Allowed");
  }
});
