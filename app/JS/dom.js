const DOMSelectors = {
  homeContainer: document.getElementById("home-container"),
  triviaContainer: document.getElementById("trivia-container"),
  pullContainer: document.getElementById("pull-container"),
  statsContainer: document.getElementById("stats-container"),

  triviaBtn: document.getElementById("trivia-start-btn"),
  pullBtn: document.getElementById("pull-start-btn"),
  statsBtn: document.getElementById("stats-btn"),
};

function clearContainers() {
  DOMSelectors.homeContainer.innerHTML = "";
  DOMSelectors.battleContainer.innerHTML = "";
  DOMSelectors.pullContainer.innerHTML = "";
  DOMSelectors.statsContainer.innerHTML = "";
  //DOMSelectors.forEach((container) => (container.innerHTML = ""));
}

export { DOMSelectors, clearContainers };

