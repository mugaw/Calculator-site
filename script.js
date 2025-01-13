let display = document.getElementById("display");
let historyPanel = document.getElementById("history");
let unitResult = document.getElementById("unitResult");
let darkModeIcon = document.getElementById("darkModeIcon");

// Append numbers or operators to the display
function appendNumber(number) {
  display.value += number;
}

function appendOperator(operator) {
  display.value += operator;
}

// Append mathematical functions
function appendFunction(func) {
  display.value += func;
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Delete the last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate the result using math.js
function calculate() {
  try {
    const result = math.evaluate(display.value);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Add calculation to history
function addToHistory(entry) {
  const historyEntry = document.createElement("p");
  historyEntry.textContent = entry;
  historyEntry.className = "text-sm";
  historyPanel.appendChild(historyEntry);
}

// Unit Conversion
function convertUnit() {
  const inputValue = parseFloat(document.getElementById("unitInput").value);
  const unitType = document.getElementById("unitType").value;
  let result;

  switch (unitType) {
    case "metersToFeet":
      result = inputValue * 3.28084;
      break;
    case "feetToMeters":
      result = inputValue / 3.28084;
      break;
    case "celsiusToFahrenheit":
      result = (inputValue * 9) / 5 + 32;
      break;
    case "fahrenheitToCelsius":
      result = ((inputValue - 32) * 5) / 9;
      break;
    default:
      result = "Invalid unit";
  }

  unitResult.textContent = `Result: ${result.toFixed(2)}`;
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  if (darkModeIcon.textContent === "🌙") {
    darkModeIcon.textContent = "☀️";
  } else {
    darkModeIcon.textContent = "🌙";
  }
}

// Keyboard Input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
