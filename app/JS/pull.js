import { updateCoins } from "./statsUpdates";
import { DOMSelectors,clearContainers } from "./dom";

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

function officialPull(user, data, amount) {
    const pulls = drawWithRates(data, amount);
    console.log(pulls);
    // update stats
    pulls.forEach((p) => {
      if (user.cards.includes(p)) {
        console.log("duplicate");
        updateCoins(user, "duplicate");
        //add coins, update coins, display in html
      } else {
        user.cards.push(p);
        document
          .getElementById("pull-results")
          .insertAdjacentHTML("beforeend", `${p.name}, `);
      }
    });
    updateCoins(user, "pull");
    document.getElementById(
      "coins-results"
    ).innerHTML = `Coins: ${user.coins}`;
    return pulls;
  }

function startPull(user) {
    DOMSelectors.pullBtn.addEventListener("click", function () {
      clearContainers();
      DOMSelectors.pullContainer.insertAdjacentHTML(
        "beforeend",
        `<h2>heading</h2>
        <button class="btn btn-primary" id="pull-btn">Pull</button>
        <p id="pull-results">Results: </p>
        <p id="coins-results">Coins: </p>`
      );
    const results = officialPull(user, data, 5);
    return results;
    });
  }

export {startPull}