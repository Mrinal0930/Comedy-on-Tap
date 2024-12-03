document.addEventListener("DOMContentLoaded", () => {
  const jokeSetup = document.getElementById("joke-setup");
  const jokePunchline = document.getElementById("joke-punchline");
  const jokeButton = document.getElementById("get-joke");
  const copyButton = document.getElementById("copy-joke");
  const toggleModeButton = document.getElementById("toggle-mode");
  const toggleIcon = document.getElementById("toggle-icon");
  const loader = document.getElementById("loader");
  const copyIcon = document.getElementById("copy-icon");
  const body = document.body;

  // Fetch and display a random joke
  async function fetchJoke() {
    loader.style.display = "block";
    jokeSetup.style.display = "none";
    jokePunchline.style.display = "none";
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      loader.style.display = "none";
      jokeSetup.textContent = data.setup;
      jokePunchline.textContent = data.punchline;
      jokeSetup.style.display = "block";
      jokePunchline.style.display = "block";
    } catch (error) {
      loader.style.display = "none";
      jokeSetup.textContent = "Oops! Couldn't fetch a joke.";
      jokePunchline.textContent = "";
      jokeSetup.style.display = "block";
    }
  }

  // Copy joke to clipboard
  function copyJoke() {
    const jokeText = `${jokeSetup.textContent}\n${jokePunchline.textContent}`;
    navigator.clipboard.writeText(jokeText).then(() => {
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.classList.remove("copied");
      }, 1000);
    });
  }

  // Toggle dark/light mode
  function toggleMode() {
    body.classList.toggle("light");
    toggleIcon.classList.toggle("fa-moon");
    toggleIcon.classList.toggle("fa-sun");
  }

  // Event listeners
  jokeButton.addEventListener("click", fetchJoke);
  copyButton.addEventListener("click", copyJoke);
  toggleModeButton.addEventListener("click", toggleMode);
});
