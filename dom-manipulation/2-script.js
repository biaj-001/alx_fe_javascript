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
