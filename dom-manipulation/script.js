document.addEventListener('DOMContentLoaded', () => {
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
    { text: "Believe you can and you're halfway there.", category: "Belief" },
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const addQuoteBtn = document.getElementById('addQuoteBtn');

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>${quote.category}:</strong> "${quote.text}"`;
  }

  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });

      // Clear input fields
      textInput.value = '';
      categoryInput.value = '';

      alert('New quote added!');
    } else {
      alert('Please fill out both fields.');
    }
  }

  // Event Listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  addQuoteBtn.addEventListener('click', addQuote);
});
