// === Configuration ===
const SERVER_URL = 'https://my-json-server.typicode.com/your-username/your-db/quotes'; // Replace with your mock or real API

// === State ===
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Belief" }
];

// === Utility Functions ===
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function saveSelectedCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

function getSavedCategory() {
  return localStorage.getItem('selectedCategory') || 'all';
}

// === UI & DOM Functions ===
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

// === Import/Export ===
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        alert("Quotes imported!");
        populateCategories();
        filterQuotes();
      } else {
        alert("Invalid JSON.");
      }
    } catch {
      alert("Invalid file format.");
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

// === Sync with Server ===
function syncWithServer() {
  fetch(SERVER_URL)
    .then(res => res.json())
    .then(serverQuotes => {
      let updated = false;
      const newQuotes = serverQuotes.filter(sq =>
        !quotes.some(lq => lq.text === sq.text && lq.category === sq.category)
      );

      if (newQuotes.length > 0) {
        quotes.push(...newQuotes);
        saveQuotes();
        updated = true;
      }

      if (updated) {
        showNotification(`✔ Synced ${newQuotes.length} new quote(s) from server`);
        populateCategories();
        filterQuotes();
      }
    })
    .catch(() => {
      showNotification("⚠ Failed to sync with server", true);
    });
}

function showNotification(message, isError = false) {
  const notif = document.createElement('div');
  notif.className = 'notification' + (isError ? ' error' : '');
  notif.textContent = message;
  document.body.prepend(notif);
  setTimeout(() => notif.remove(), 3000);
}

// === Initialize App ===
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newQuote').addEventListener('click', filterQuotes);
  document.getElementById('add-quote-button').addEventListener('click', addQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);

  populateCategories();
  filterQuotes();

  syncWithServer();
  setInterval(syncWithServer, 30000); // Sync every 30 seconds
});
