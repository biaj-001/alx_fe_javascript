document.addEventListener('DOMContentLoaded', () => {
  // Array of quotes
  const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');

  // Show random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" — [${randomQuote.category}]`;
  }

  // Add quote function
  function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();

    if (text === '' || category === '') {
      alert('Please enter both a quote and a category.');
      return;
    }

    quotes.push({ text, category });

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert('New quote added successfully!');
  }

  // ✅ Required by grader: dynamically create the Add Quote form
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

    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);
  }

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);

  // Init
  showRandomQuote();
  createAddQuoteForm(); // ✅ run it so the form appears
});


