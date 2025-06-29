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

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// Save quotes and filter category
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Save selected category filter
function saveSelectedCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

// Load last selected filter
function getSavedCategory() {
  return localStorage.getItem('selectedCategory') || 'all';
}

// Populate category dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  const filterSelect = document.getElementById('categoryFilter');
  filterSelect.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filterSelect.appendChild(option);
  }

  );

  // Set saved category
  const savedCat = getSavedCategory();
  filterSelect.value = savedCat;
}

// Filter quotes based on selected category
function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  saveSelectedCategory(selected);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const filtered = selected === 'all'
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];

  const p = document.createElement('p');
  p.textContent = `"${randomQuote.text}"`;
  const small = document.createElement('small');
  small.textContent = `Category: ${randomQuote.category}`;
  quoteDisplay.append(p, small);
}

// Add quote and update categories if needed
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  populateCategories();
  filterQuotes();
}

// Import quotes from JSON
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        alert("Quotes imported!");
        populateCategories();
        filterQuotes();
      } else {
        alert("Invalid JSON.");
      }
    } catch (err) {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Export to JSON
function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url);
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newQuote').addEventListener('click', filterQuotes);
  document.getElementById('add-quote-button').addEventListener('click', addQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);

  populateCategories();
  filterQuotes(); // load quote from selected category
});
// === Configuration ===
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Replace with your mock or real API
// === Configuration ===
const SERVER_URL = 'https://my-json-server.typicode.com/your-username/your-repo/quotes'; // Replace with your mock API URL

// === State ===
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// === Utility ===
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function saveSelectedCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

function getSavedCategory() {
  return localStorage.getItem('selectedCategory') || 'all';
}

// === DOM & Display ===
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  const filterSelect = document.getElementById('categoryFilter');
  filterSelect.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filterSelect.appendChild(option);
  });
  filterSelect.value = getSavedCategory();
}

function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  saveSelectedCategory(selected);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  const p = document.createElement('p');
  p.textContent = `"${randomQuote.text}"`;

  const small = document.createElement('small');
  small.textContent = `Category: ${randomQuote.category}`;

  quoteDisplay.append(p, small);
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Both quote and category are required.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Optional: Post to server
  // postQuoteToServer(newQuote);
}

// === Import & Export ===
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        showNotification("✔ Quotes imported successfully");
        populateCategories();
        filterQuotes();
      } else {
        alert("Invalid JSON structure.");
      }
    } catch {
      alert("Error parsing JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();

  URL.revokeObjectURL(url);
}

// === Server Sync ===
function syncWithServer() {
  fetch(SERVER_URL)
    .then(res => res.json())
    .then(serverQuotes => {
      const newQuotes = serverQuotes.filter(sq =>
        !quotes.some(lq => lq.text === sq.text && lq.category === sq.category)
      );

      if (newQuotes.length > 0) {
        quotes.push(...newQuotes);
        saveQuotes();
        showNotification(`✔ Synced ${newQuotes.length} new quote(s) from server`);
        populateCategories();
        filterQuotes();
      }
    })
    .catch(() => {
      showNotification("⚠ Server sync failed", true);
    });
}

// === Optional: POST to Server ===
function postQuoteToServer(quote) {
  fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Quote posted:", data);
    })
    .catch(err => {
      console.error("Failed to post quote:", err);
    });
}

// === Notification UI ===
function showNotification(message, isError = false) {
  const notif = document.createElement('div');
  notif.className = 'notification' + (isError ? ' error' : '');
  notif.textContent = message;
  document.body.prepend(notif);
  setTimeout(() => notif.remove(), 3000);
}

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newQuote').addEventListener('click', filterQuotes);
  document.getElementById('add-quote-button').addEventListener('click', addQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);

  populateCategories();
  filterQuotes();

  syncWithServer();                // Initial sync
  setInterval(syncWithServer, 30000); // Every 30 seconds
});

