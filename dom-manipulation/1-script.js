// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote and save index in sessionStorage
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

  sessionStorage.setItem('lastQuoteIndex', index);
}

// Add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  showRandomQuote();
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote();
      } else {
        alert('Invalid JSON format.');
      }
    } catch (err) {
      alert('Failed to import. Make sure the JSON is valid.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
  URL.revokeObjectURL(url);
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('add-quote-button').addEventListener('click', addQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);

  // Load last viewed quote index from sessionStorage
  const lastIndex = sessionStorage.getItem('lastQuoteIndex');
  if (lastIndex && quotes[lastIndex]) {
    const quote = quotes[lastIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
  } else {
    showRandomQuote();
  }
});
