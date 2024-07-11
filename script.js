const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const history = document.getElementById("history");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let historyEntries = [];

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      // If output has '%', replace with '/100' before evaluating.
      output = eval(output.replace("%", "/100"));
      // Add the calculation to the history.
      historyEntries.push(display.value + " = " + output);
      updateHistory();
    } catch (e) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  // Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Function to update the history display.
const updateHistory = () => {
  history.innerHTML = historyEntries
    .map((entry) => `<div>${entry}</div>`)
    .join("");
};
