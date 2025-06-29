// Initial array of quotes
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  const textEl = document.createElement('p');
  textEl.textContent = `"${quote.text}"`;

  const categoryEl = document.createElement('small');
  categoryEl.textContent = `Category: ${quote.category}`;

  quoteDisplay.appendChild(textEl);
  quoteDisplay.appendChild(categoryEl);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

document.getElementById('add-quote-button').addEventListener('click', function () {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  showRandomQuote();
});

document.addEventListener('DOMContentLoaded', showRandomQuote);
