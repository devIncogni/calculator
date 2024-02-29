//#region Global Variable Declarations Start

/** @type {Number} */
let var1 = undefined;
/** @type {Number} */
let var2 = undefined;
/** @type {String} */
let operator = undefined;
/** @type {Number} */
let answer = undefined;

const browserWindow = window;
const answerView = document.querySelector("#answerView");
const calcView = document.querySelector("#calculationView");
const numPadBtnsArray = [...document.querySelectorAll(".column > div")];
const numPadBtnsIDArray = numPadBtnsArray.map(
  (divElementsInArray) => divElementsInArray.id
);

const numString = "0123456789.";
const operatorString = "+-%*/^";
const specialOperatorString = ["sq", "sqrt", "Q,R", "plusMinus", "1/"];
const functionalOperatorString = ["allClear", "Enter", "Backspace"];

let lastKey = null;

//#endregion Global Variable Declarations End

//#region All Functions Here

function typeOfKeyPressed(pressedKey) {
  if (numString.includes(pressedKey)) {
    return "NUMBER";
    // } else if (pressedKey == ".") {
    //   return "DECIMAL";
  } else if (operatorString.includes(pressedKey)) {
    return "OPERATOR";
  } else if (specialOperatorString.indexOf(pressedKey) != -1) {
    return "SPLOP";
  } else if (functionalOperatorString.indexOf(pressedKey) != -1) {
    return "FNOP";
  } else {
    return false;
  }
}

// function typeOfOperator(pressedKey) {
//   return pressedKey;
// }

function populateCalculationView(content) {
  calcView.textContent += content;
}

function clearCalculationView() {
  calcView.textContent = "";
}

function populateAnswerView(content) {
  if (
    answerView.textContent == "0" &&
    content != "." &&
    !answerView.textContent.includes("0.") &&
    content != "plusMinus"
  ) {
    answerView.textContent = content;
  }
  //
  else if (answerView.textContent.includes(".") && content == ".") {
    console.log("Decimal Already Present");
  }
  //
  else if (content == "plusMinus") {
    if (!answerView.textContent.includes("-")) {
      answerView.textContent = "-" + answerView.textContent;
    } else {
      answerView.textContent = answerView.textContent.substring(1);
    }
  }
  //
  else {
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

    case "sq":
      return sq(o1);

    case "sqrt":
      return sqrt(o1);

    case "%":
      return qr(o1, o2);

    case "1/":
      return reci(o1);

    case "plusMinus":
      return plusMinus(o1);

    default:
      console.log("No Operation");
      return o2;
  }
}

//#region Operation Functions Start

function roundOff(number) {
  return Math.round(number * 10000) / 10000;
}

function add(o1 = 0, o2 = 0) {
  return o1 + o2;
}

function sub(o1 = 0, o2 = 0) {
  return o1 - o2;
}

function mul(o1, o2 = 1) {
  return o1 * o2;
}

function div(o1, o2 = 1) {
  if (o2 == 0) {
    return "ERR: Division by 0";
  }

  return o1 / o2;
}

function pow(o1, o2) {
  if (o1 == 0 && o2 == 0) {
    return "ERR: 0^0?";
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

function qr(o1, o2) {
  return o1 % o2;
}

function reci(o1) {
  if (o1 == 0) {
    return "ERR: Division by 0";
  }

  return 1 / o1;
}
//#endregion

function plusMinus(o1) {
  return 1 / o1;
}

function scrollToEnd(scrollableElement) {
  scrollableElement.scrollLeft = scrollableElement.scrollWidth;
  scrollableElement.scrollTop = scrollableElement.scrollHeight;
}

function clear() {
  var1 = undefined;
  var2 = undefined;
  lastKey = null;
  answer = undefined;
  operator = undefined;
  clearAnswerView();
  clearCalculationView();
}

//#endregion All Functions Above

// Main Logic

browserWindow.addEventListener("keydown", (keyEvent) => {
  main(keyEvent.key);
});

numPadBtnsArray.map((divElementsInArray) =>
  divElementsInArray.addEventListener("click", (clickEvent) => {
    let keyPressedFromNumPad = clickEvent.target;

    while (keyPressedFromNumPad != "" && keyPressedFromNumPad.id == "") {
      keyPressedFromNumPad = keyPressedFromNumPad.parentElement;
    }

    main(keyPressedFromNumPad.id);
  })
);

// function main(keyOrKeyLikeEventID) {
//   let pressedKey = keyOrKeyLikeEventID;
//   let typeOfKey = typeOfKeyPressed(pressedKey);

//   console.log(pressedKey);

//   if (typeOfKey == "NUMBER" || typeOfKey == "DECIMAL") {
//     // console.log(pressedKey);

//     if (lastKeyWasOperator) {
//       clearAnswerView();
//     }

//     populateAnswerView(pressedKey);
//     scrollToEnd(answerView);
//     lastKeyWasOperator = false;
//   }
//   //
//   else if (typeOfKey == "OPERATOR") {
//     // console.log(pressedKey);

//     if (lastKeyWasOperator) {
//       lastKeyWasOperator = true;
//       operator = typeOfOperator(pressedKey);
//       populateCalculationView(roundOff(answer), operator);
//       scrollToEnd(calcView);
//     }
//     //
//     else {
//       lastKeyWasOperator = true;

//       var2 = parseAnswerView();
//       answer = operate(var1, var2, operator);
//       var1 = answer;
//       var2 = null;
//       operator = typeOfOperator(pressedKey);

//       populateCalculationView(roundOff(answer), operator);
//       clearAnswerView();
//       populateAnswerView(roundOff(answer));
//       scrollToEnd(answerView);
//       scrollToEnd(calcView);
//     }
//   }
//   //
//   else if (typeOfKey == "SPLOP") {
//     console.log(pressedKey);
//   }
//   //
//   else if (typeOfKey == "FNOP") {
//     lastKeyWasOperator = true;
//     console.log("FNOP");
//     functionalOperatorDisplay(pressedKey);
//   }
//   //
//   else {
//     console.log("Key Not Allowed");
//   }
// }

// function functionalOperatorDisplay(op) {
//   switch (op) {
//     case "allClear":
//       clearAnswerView();
//       clearCalculationView();
//       var1 = null;
//       var2 = null;
//       answer = null;
//       operator = null;
//       break;

//     case "Backspace":
//       let t = answerView.textContent;
//       if (t.length < 2) {
//         clearAnswerView();
//       }
//       //
//       else {
//         t = t.substring(0, t.length - 1);
//         answerView.textContent = t;
//       }

//     case "Enter":
//       var2 = parseAnswerView();
//       var1 = answer;
//       answer = operate(var1, var2, operator);
//       populateCalculationView(roundOff(var1), operator, var2, "=");
//       var2 = null;
//       var1 = answer;
//       clearAnswerView();
//       populateAnswerView(roundOff(answer));
//       scrollToEnd(answerView);
//       scrollToEnd(calcView);
//       // operator = null;
//     default:
//       break;
//   }
// }
function main(pressedKey) {
  if (typeOfKeyPressed(pressedKey) == "NUMBER") {
    if (typeOfKeyPressed(lastKey) == "OPERATOR") {
      clearAnswerView();
    }
    if (typeOfKeyPressed(lastKey) == "FNOP") {
      clear();
    }
    populateAnswerView(pressedKey);
  }
  //
  else if (pressedKey == "plusMinus") {
    populateAnswerView(pressedKey);
  }
  //
  else if (typeOfKeyPressed(pressedKey) == "SPLOP") {
    if (
      typeOfKeyPressed(lastKey) == "SPLOP" ||
      typeOfKeyPressed(lastKey) == "FNOP"
    ) {
      clearCalculationView();
    }
    var2 = parseAnswerView();
    answer = operate(var2, var2, pressedKey);
    clearAnswerView();
    populateAnswerView(answer);
    populateCalculationView(pressedKey + "(" + var2 + ")");
  }
  //
  else if (typeOfKeyPressed(pressedKey) == "OPERATOR") {
    if (typeOfKeyPressed(lastKey) == "OPERATOR") {
      operator = pressedKey;
      clearCalculationView();
      populateCalculationView(var1);
      populateCalculationView(operator);
    }
    //
    else {
      clearCalculationView();
      var2 = parseAnswerView();
      answer = var1 == undefined ? var2 : operate(var1, var2, operator);
      operator = pressedKey;
      var1 = answer;
      populateCalculationView(var1);
      populateCalculationView(operator);
      clearAnswerView();
      populateAnswerView(answer);
    }
  }
  //
  else if (typeOfKeyPressed(pressedKey) == "FNOP") {
    switch (pressedKey) {
      case "Enter":
        if (lastKey == "Enter" || lastKey == null || var1 == undefined) {
          break;
        }
        //
        else {
          clearCalculationView();
          populateCalculationView(var1);
          populateCalculationView(operator);
          var2 = parseAnswerView();
          populateCalculationView(var2);
          populateCalculationView("=");
          answer = var1 == undefined ? var2 : operate(var1, var2, operator);
          operator = pressedKey;
          var1 = undefined;
          clearAnswerView();
          populateAnswerView(answer);
          break;
        }

      default:
        break;
    }
  }
  lastKey = pressedKey;
}
