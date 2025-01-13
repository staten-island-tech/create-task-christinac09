import { DOMSelectors, clearContainers } from "./dom";

async function getAllData() {
  try {
    const response = await fetch(`https://genshin.jmp.blue/characters/all`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    alert("could not find that character");
  }
}

async function getCharacterData(character) {
  try {
    const response = await fetch(
      `https://genshin.jmp.blue/characters/${character}`
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const characterData = await response.json();
      return characterData;
    }
  } catch (error) {
    alert("could not find that character");
  }
}

/* async function getWeaponData(){
  try {
    const response = await fetch(`https://genshin.jmp.blue/weapons/all`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    alert("could not find that weapon");
  } 
} */

function displayUserStats(user) {
  /* DOMSelectors.statsContainer.classList.add(
    "max-w-xl mx-auto p-6 rounded-lg shadow-lg"
  ); */
  
  DOMSelectors.statsBtn.addEventListener("click", function(){
    clearContainers()
    DOMSelectors.statsContainer.insertAdjacentHTML(
      "beforeend",
      `<h2 id="coins-stat">Coins: ${user.coins}</h2> 
      <h2 id="wins-stat">Accuracy: ${user.currentScore}/${user.totalAnswered}</h2>
      <h2 id="streak-stat">Current Streak: ${user.streak}</h2>
      `
    );
    user.cards.forEach((card) => {
      DOMSelectors.statsContainer.insertAdjacentHTML("beforeend",
        `<h2 id="cards-stat">Cards: ${card.name} (${card.rarity}-star)</h2>`
      )
    });
  })
  
}

export { getAllData, getCharacterData, displayUserStats };
