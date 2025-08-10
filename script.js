// Show tool section and hide others
function showTool(id) {
  document.getElementById("tools-grid").style.display = "none";
  document.querySelectorAll(".tool-section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function goBack() {
  document.getElementById("tools-grid").style.display = "grid";
  document.querySelectorAll(".tool-section").forEach(sec => {
    sec.style.display = "none";
  });
}

/* ===== Loan Calculator ===== */
function calculateLoan() {
  let principal = parseFloat(document.getElementById("loan-amount").value);
  let rate = parseFloat(document.getElementById("loan-rate").value) / 100 / 12;
  let years = parseInt(document.getElementById("loan-years").value);
  if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
    alert("Please fill all fields with valid numbers.");
    return;
  }
  let months = years * 12;
  let monthly = (principal * rate) / (1 - Math.pow(1 + rate, -months));
  document.getElementById("loan-result").innerText = `Monthly Payment: ₱${monthly.toFixed(2)}`;
}

/* ===== Currency Converter ===== */
function convertCurrency() {
  let amount = parseFloat(document.getElementById("currency-amount").value);
  let to = document.getElementById("currency-target").value;

  const rates = { USD: 0.018, EUR: 0.016, JPY: 2.43 }; // Approximate PHP conversion rates
  if (isNaN(amount) || !rates[to]) {
    alert("Enter valid amount and select currency.");
    return;
  }
  let converted = amount * rates[to];
  document.getElementById("currency-result").innerText = `${amount} PHP = ${converted.toFixed(2)} ${to}`;
}

/* ===== Investment Calculator ===== */
function calculateInvestment() {
  let principal = parseFloat(document.getElementById("invest-principal").value);
  let rate = parseFloat(document.getElementById("invest-rate").value) / 100;
  let years = parseInt(document.getElementById("invest-years").value);
  if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
    alert("Please fill all fields with valid numbers.");
    return;
  }
  let futureValue = principal * Math.pow(1 + rate, years);
  document.getElementById("invest-result").innerText = `Future Value: ₱${futureValue.toFixed(2)}`;
}

/* ===== Forecasting Tool ===== */
function calculateForecast() {
  let current = parseFloat(document.getElementById("forecast-current").value);
  let rate = parseFloat(document.getElementById("forecast-rate").value) / 100;
  let periods = parseInt(document.getElementById("forecast-periods").value);
  let type = document.getElementById("forecast-type").value;

  if (isNaN(current) || isNaN(rate) || isNaN(periods)) {
    alert("Please fill all fields with valid numbers.");
    return;
  }

  // Just simple compounding forecast
  let result = current * Math.pow(1 + rate, periods);
  document.getElementById("forecast-result").innerText =
    `Forecasted value after ${periods} ${type}(s): ₱${result.toFixed(2)}`;
}

/* ===== Balancing / T-Account ===== */
function checkBalance() {
  let debit = parseFloat(document.getElementById("balance-debit").value);
  let credit = parseFloat(document.getElementById("balance-credit").value);
  if (isNaN(debit) || isNaN(credit)) {
    alert("Please enter valid numbers for debit and credit.");
    return;
  }
  let balanced = debit === credit;
  document.getElementById("balance-result").innerText = balanced ? "Balanced ✅" : `Not Balanced ❌ (Difference: ₱${(debit - credit).toFixed(2)})`;
}

/* ===== Income Tax Calculator ===== */
/* Simplified Philippine tax brackets for demonstration */
function calculateTax() {
  let income = parseFloat(document.getElementById("tax-income").value);
  if (isNaN(income)) {
    alert("Please enter a valid income.");
    return;
  }
  let tax = 0;
  if (income <= 250000) tax = 0;
  else if (income <= 400000) tax = (income - 250000) * 0.2;
  else if (income <= 800000) tax = 30000 + (income - 400000) * 0.25;
  else if (income <= 2000000) tax = 130000 + (income - 800000) * 0.3;
  else if (income <= 8000000) tax = 490000 + (income - 2000000) * 0.32;
  else tax = 2410000 + (income - 8000000) * 0.35;

  document.getElementById("tax-result").innerText = `Estimated Tax: ₱${tax.toFixed(2)}`;
}

/* ===== Scientific Calculator ===== */
let sciExpression = "";
const sciDisplay = document.getElementById("sci-display");

function sciInput(char) {
  sciExpression += char;
  updateSciDisplay();
}

function sciClear() {
  sciExpression = "";
  updateSciDisplay();
}

function sciBack() {
  sciExpression = sciExpression.slice(0, -1);
  updateSciDisplay();
}

function sciFunc(func) {
  try {
    let val = eval(sciExpression);
    if (isNaN(val)) throw new Error();
    switch (func) {
      case "sqrt":
        sciExpression = Math.sqrt(val).toString();
        break;
      case "log":
        sciExpression = Math.log10(val).toString();
        break;
      case "sin":
        sciExpression = Math.sin(val).toString();
        break;
      case "cos":
        sciExpression = Math.cos(val).toString();
        break;
      case "tan":
        sciExpression = Math.tan(val).toString();
        break;
    }
    updateSciDisplay();
  } catch {
    sciExpression = "";
    updateSciDisplay();
    alert("Invalid Expression");
  }
}

function sciCalculate() {
  try {
    let result = eval(sciExpression);
    sciExpression = result.toString();
    updateSciDisplay();
  } catch {
    sciExpression = "";
    updateSciDisplay();
    alert("Invalid Expression");
  }
}

function updateSciDisplay() {
  sciDisplay.value = sciExpression;
}

/* ===== Gross Profit & Margin Tool ===== */
function calculateGross() {
  let sales = parseFloat(document.getElementById("gross-sales").value);
  let cogs = parseFloat(document.getElementById("gross-cogs").value);
  if (isNaN(sales) || isNaN(cogs)) {
    alert("Please enter valid sales and COGS.");
    return;
  }
  let grossProfit = sales - cogs;
  let margin = sales !== 0 ? (grossProfit / sales) * 100 : 0;
  document.getElementById("gross-result").innerText =
    `Gross Profit: ₱${grossProfit.toFixed(2)}\nGross Margin: ${margin.toFixed(2)}%`;
}

/* ===== COGS & Markup Tool ===== */
function calculateMarkup() {
  let cost = parseFloat(document.getElementById("cogs-cost").value);
  let markup = parseFloat(document.getElementById("cogs-markup").value);
  if (isNaN(cost) || isNaN(markup)) {
    alert("Please enter valid cost and markup.");
    return;
  }
  let sellingPrice = cost + (cost * markup / 100);
  document.getElementById("cogs-result").innerText =
    `Selling Price: ₱${sellingPrice.toFixed(2)}`;
}

/* ===== Scheduling Tool ===== */
let scheduleTasks = [];

function addSchedule() {
  let task = document.getElementById("schedule-task").value.trim();
  let date = document.getElementById("schedule-date").value;
  let time = document.getElementById("schedule-time").value;
  if (!task || !date || !time) {
    alert("Please fill all fields for scheduling.");
    return;
  }
  scheduleTasks.push({ task, date, time });
  renderSchedule();
  document.getElementById("schedule-task").value = "";
  document.getElementById("schedule-date").value = "";
  document.getElementById("schedule-time").value = "";
}

function renderSchedule() {
  const ul = document.getElementById("schedule-list");
  ul.innerHTML = "";
  scheduleTasks.sort((a,b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time));
  scheduleTasks.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.task} - ${item.date} at ${item.time}`;
    ul.appendChild(li);
  });
}

/* ===== Inventory Management ===== */
let inventory = {};

function addInventoryItem() {
  let name = document.getElementById("inv-item-name").value.trim();
  let qty = parseInt(document.getElementById("inv-quantity").value);
  if (!name || isNaN(qty) || qty < 0) {
    alert("Please enter valid item name and quantity.");
    return;
  }
  if (inventory[name]) {
    inventory[name] += qty;
  } else {
    inventory[name] = qty;
  }
  renderInventory();
  document.getElementById("inv-item-name").value = "";
  document.getElementById("inv-quantity").value = "";
}

function renderInventory() {
  const tbody = document.querySelector("#inventory-table tbody");
  tbody.innerHTML = "";
  Object.keys(inventory).forEach((key) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${key}</td>
      <td>${inventory[key]}</td>
      <td><button onclick="removeInventoryItem('${key}')">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function removeInventoryItem(name) {
  delete inventory[name];
  renderInventory();
}

/* ===== Decision Analysis ===== */
let decisionData = {};

function startDecision() {
  const criteriaInput = document.getElementById("decision-criteria").value.trim();
  const weightsInput = document.getElementById("decision-weights").value.trim();
  const optionsInput = document.getElementById("decision-options").value.trim();

  if (!criteriaInput || !weightsInput || !optionsInput) {
    alert("Please fill all fields for decision analysis.");
    return;
  }

  const criteria = criteriaInput.split(",").map(c => c.trim());
  const weights = weightsInput.split(",").map(w => parseFloat(w.trim()));
  const options = optionsInput.split(",").map(o => o.trim());

  if (criteria.length !== weights.length) {
    alert("Criteria and weights count must match.");
    return;
  }
  if (weights.some(isNaN)) {
    alert("Weights must be numbers.");
    return;
  }

  decisionData = { criteria, weights, options, scores: {} };
  decisionData.options.forEach(opt => {
    decisionData.scores[opt] = new Array(criteria.length).fill(0);
  });

  renderDecisionForm();
  document.getElementById("decision-scoring").style.display = "block";
  document.getElementById("decision-result").innerText = "";
}

function renderDecisionForm() {
  const form = document.getElementById("decision-form");
  form.innerHTML = "";

  decisionData.options.forEach((opt) => {
    let div = document.createElement("div");
    div.innerHTML = `<h4>${opt}</h4>`;
    decisionData.criteria.forEach((crit, j) => {
      div.innerHTML += `
        <label>${crit} (Weight: ${decisionData.weights[j]}): 
          <input type="number" min="0" max="10" step="0.1" 
          oninput="updateDecisionScore('${opt}', ${j}, this.value)" />
        </label><br/>
      `;
    });
    form.appendChild(div);
  });
}

function updateDecisionScore(option, criterionIndex, value) {
  let val = parseFloat(value);
  if (isNaN(val)) val = 0;
  decisionData.scores[option][criterionIndex] = val;
}

function calculateDecision() {
  let results = [];
  for (const opt of decisionData.options) {
    let total = 0;
    for (let i = 0; i < decisionData.criteria.length; i++) {
      total += decisionData.scores[opt][i] * decisionData.weights[i];
    }
    results.push({ option: opt, score: total });
  }
  results.sort((a,b) => b.score - a.score);

  let resultText = "Decision Rankings:\n";
  results.forEach((r,i) => {
    resultText += `${i+1}. ${r.option} (Score: ${r.score.toFixed(2)})\n`;
  });
  document.getElementById("decision-result").innerText = resultText;
}
