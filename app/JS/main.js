import "../CSS/style.css";
import { getAllData } from "./display";
import { getCharacterSkills } from "./battle";
import { DOMSelectors } from "./dom";

const playerStats = [
  {
    // idk
    name: "player1",
    currency: 200,
    cards: [],
    health: 0,
  },
  {
    name: "player2",
    health: 0,
    cards: [],
  },
];

const data = await getAllData();

function getRandomCharacters(data, number) {
  // returns only 1 object if number is 1, returns an array of objects if number > 1
  if (number === 1) {
    const randomInteger = Math.floor(Math.random() * data.length);
    const randomCharacter = data[randomInteger];
    return randomCharacter;
  } else {
    const characters = [];
    for (let i = 0; i < number; i++) {
      const randomInteger = Math.floor(Math.random() * data.length);
      const randomCharacter = data[randomInteger];
      characters.push(randomCharacter);
    }
    return characters;
  }
}

function getSorted(data, rarity) {
  let sorted = [];
  if (rarity === 4) {
    sorted = data.filter((c) => c.rarity === 4);
  } else if (rarity === 5) {
    sorted = data.filter((c) => c.rarity === 5);
  } else {
    console.log("somethings wrong");
  }
  return sorted;
}

function drawWithRates(allData, number) {
  // taking rarity into account --> based on a random number, get either 4 or 5 rarity characters
  const pulls = [];
  for (let i = 0; i < number; i++) {
    const randomInteger = Math.floor(Math.random() * 100);
    console.log("Random Integer: " + randomInteger);
    let sorted = [];
    if (randomInteger % 7 === 0) {
      //change this condition later
      console.log("5 STAR !!");
      sorted = getSorted(allData, 5); // if the random int is divisible by 7, they get a random five star, otherwise, 4 star
    } else {
      sorted = getSorted(allData, 4);
    }
    pulls.push(getRandomCharacters(sorted, 1));
  }
  return pulls;
}

function updateUserCoins(type) {
  if (type === "pull") {
    playerStats[0].currency -= 5;
    document.getElementById(
      "coins-stat"
    ).innerHTML = `Currency: ${playerStats[0].currency}`;
  }
}

function officialPull(data, amount) {
  const pulls = drawWithRates(data, amount);
  console.log(pulls);
  // update stats
  playerStats[0].cards.push(pulls);
  pulls.forEach((card) => {
    document
      .getElementById("cards-stat")
      .insertAdjacentHTML("beforeend", `${card.name}, `);
  });

  updateUserCoins("pull");
  return pulls;
}

function start() {
  document
    .getElementById("pull-start-btn")
    .addEventListener("click", function () {
      console.log("clicked");
      DOMSelectors.pullContainer.insertAdjacentHTML(
        "beforeend",
        `<h2>heading</h2>
      <button class="btn btn-primary" id="pull-btn">Pull</button>
      <p id="pull-results-text">Results: </p>
      <p id="coins-results-text">Coins: </p>`
      );
      console.log(document.getElementById("pull-btn"));
      something();
    });
}

function something() {
  console.log("clicked", document.getElementById("pull-btn"));
  document.getElementById("pull-btn").addEventListener("click", function () {
    const results = officialPull(data, 5);
    //results.forEach((r)=>document.getElementById("pull-results-text"))
    results.forEach((r) =>
      document
        .getElementById("pull-results-text")
        .insertAdjacentHTML("beforeend", `${r.name} `)
    );
  });
}

start();
