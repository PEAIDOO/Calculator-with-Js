//Accessing the DOM elements of the calculator

const inputBox = document.getElementById("input");
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

//Define expression and result variables

let expression = "";
let result = "";

//Define event handler for button clicks

function buttonClick(event) {
  //Get values from clicked buttons
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;
  //   console.log(target, action, value);

  // switch case to control the calculator

  switch (action) {
    case "number":
      addValue(value);
      break;
    case "clear":
      clear();
      break;
    case "backspace":
      backSpace();
      break;

    //Add the result to the expression as a starting point if expression is empty
    case "addition":
    case "subtraction":
    case "multiplication":
    case "division":
      if (expression === "" && result !== "") {
        startFromResult(value);
      } else if (expression !== "" && !isLastCharOperator()) {
        addValue(value);
      }
      break;
    case "submit":
      submit();
      break;
    case "negate":
      negate();
      break;
    case "mod":
      percentage();
      break;
  }

  updateDisplay(expression, result);
}

inputBox.addEventListener("click", buttonClick);

function addValue(value) {
  // Add value to expression
  expression += value;
  console.log(expression);
}

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;
  resultDiv.textContent = result;
}

function clear() {
  expression = "";
  result = "";
}

function backSpace() {
  expression = expression.slice(0, -1);
}

function isLastCharOperator() {
  return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
  expression = result + value;
}

function submit() {
  result = evaluateExpression();
  expression = "";
}

function evaluateExpression() {
  const evalResult = eval(expression);
  return isNaN(evalResult) || !isFinite(evalResult)
    ? ""
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
  if (expression === "" && result !== "") {
    result = -result;
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

function percentage() {
  if (expression !== "") {
    result = evaluateExpression();
    expression = "";
    if (!isNaN(result) && isFinite(result)) {
      result /= 100;
    } else {
      result = "";
    }
  } else if (result !== "") {
    result = parseFloat(result) / 100;
  }
}
