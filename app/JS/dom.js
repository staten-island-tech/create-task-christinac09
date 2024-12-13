const DOMSelectors = {
  homeContainer: document.getElementById("home-container"),
  battleContainer: document.getElementById("battle-container"),
  pullContainer: document.getElementById("pull-container"),
  statsContainer: document.getElementById("stats-container"),
};

function clearContainers() {
  DOMSelectors.forEach((container) => (container.innerHTML = ""));
}

export { DOMSelectors, clearContainers };
