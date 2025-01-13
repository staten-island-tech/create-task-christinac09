const DOMSelectors = {
  homeContainer: document.querySelector("#home-container"),
  triviaContainer: document.querySelector("#trivia-container"),
  pullContainer: document.querySelector("#pull-container"),
  statsContainer: document.querySelector("#stats-container"),

  triviaBtn: document.querySelector("#trivia-start-btn"),
  pullStartBtn: document.querySelector("#pull-start-btn"),
  statsBtn: document.querySelector("#stats-btn"),
};

function clearContainers() {  
  DOMSelectors.homeContainer.innerHTML = "";
  DOMSelectors.triviaContainer.innerHTML = "";
  DOMSelectors.pullContainer.innerHTML = "";
  DOMSelectors.statsContainer.innerHTML = "";
  //DOMSelectors.forEach((container) => (container.innerHTML = ""));
}

export { DOMSelectors, clearContainers };

