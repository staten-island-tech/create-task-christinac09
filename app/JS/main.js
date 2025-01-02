import "../CSS/style.css";
import { getAllData } from "./display";
import { getCharacterSkills } from "./battle";

const userStats = {
  // idk
  currency: 200,
  cards: [],
  health: 0,
};

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
    userStats.currency -= 5;
    document.getElementById(
      "coins"
    ).innerHTML = `Currency: ${userStats.currency}`;
  }
}

function officialPull(data, amount) {
  console.log(drawWithRates(data, amount));
  updateUserCoins("pull");
}

document.getElementById("pull-btn").addEventListener("click", function () {
  officialPull(data, 5);
});
