// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initial quotes array
  const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
  ];

  // Select DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');

  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" — [${randomQuote.category}]`;
  }

  // Function to add a new quote
  function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();

    if (text === '' || category === '') {
      alert('Please enter both a quote and a category.');
      return;
    }

    // Add new quote object to array
    quotes.push({ text, category });

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Confirmation
    alert('New quote added successfully!');
  }

  // ✅ Function to dynamically create the add quote form
  function createAddQuoteForm() {
    const formDiv = document.createElement('div');

    const inputText = document.createElement('input');
    inputText.id = 'newQuoteText';
    inputText.type = 'text';
    inputText.placeholder = 'Enter a new quote';

    const inputCategory = document.createElement('input');
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);

    // Append inputs and button into formDiv
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);

    // Append the formDiv into the body
    document.body.appendChild(formDiv);
  }

  // Attach event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);

  // Show a first random quote on page load
  showRandomQuote();

  // ✅ Create the add quote form dynamically
  createAddQuoteForm();
});

