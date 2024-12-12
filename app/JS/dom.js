const DOMSelectors = {
  container: document.getElementById("cards-container"),
  moreContainer: document.querySelector("#more-container"),
  gameContainer: document.querySelector("#game-container"),
  gameStartBtn: document.querySelector("#game-start-btn"),
};

function clearContainers() {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.moreContainer.innerHTML = "";
  DOMSelectors.gameContainer.innerHTML = "";
}

export { DOMSelectors, clearContainers };
