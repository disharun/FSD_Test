const USERNAME = "admin";
const PASSWORD = "admin";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("login-error");

  if (username === USERNAME && password === PASSWORD) {

    document.getElementById("login-page").style.display = "none";
    document.getElementById("currency-converter").style.display = "block";
    loginError.textContent = "";
  } else {
    
    loginError.textContent = "Invalid username or password.";
  }
}


async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultElement = document.getElementById("conversion-result");

  if (isNaN(amount) || amount <= 0) {
    resultElement.textContent = "Please enter a valid amount.";
    return;
  }

  try {

    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates.");
    }

    const data = await response.json();
    const conversionRate = data.rates[toCurrency];

    if (!conversionRate) {
      resultElement.textContent = `Conversion rate for ${toCurrency} not found.`;
      return;
    }
    const convertedAmount = amount * conversionRate;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
  } catch (error) {
    resultElement.textContent = "An error occurred. Please try again later.";
    console.error("Error:", error);
  }
}
