import "../CSS/style.css";
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
  DOMSelectors.triviaContainer.classList.remove("bg-base-100");
}
const user = {
  currentScore: 0,
  totalAnswered: 0,
  streak: 0,
  coins: 10, //change back to 0 + delete comments & console.log
  cards: [],
};

async function main() {
  const data = await getAllData();
  startGame(user);
  displayUserStats(user);
  startPull(user, data);
}

main();

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
    alert("could not retrieve character data");
  }
}

function displayUserStats(user) {
  DOMSelectors.statsBtn.addEventListener("click", function () {
    clearContainers();
    DOMSelectors.statsContainer.insertAdjacentHTML(
      "beforeend",
      `<h2 id="coins-stat">Coins: ${user.coins}</h2> 
      <h2 id="wins-stat">Accuracy: ${user.currentScore}/${user.totalAnswered}</h2>
      <h2 id="streak-stat">Current Streak: ${user.streak}</h2>
      <h2 id="cards-stat-label">Cards: </h2>
      <div class="flex flex-row flex-wrap w-[90vw]" id="cards-stat"></div>`
    );
    user.cards.forEach((card) => {
      document.querySelector("#cards-stat").insertAdjacentHTML(
        "beforeend",
        `<div class="card bg-base-100 w-[21%] shadow-sm m-4 mx-auto">
          <figure class="m-4">
            <img
              src="https://genshin.jmp.blue/characters/${card.id.toLowerCase()}/icon-big"
              alt="${card.name} icon" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              ${card.name}
              <div class="badge badge-secondary">${card.rarity}-star</div>
            </h2>
            <p>${card.description}</p>
          </div>
        </div>`
      );
    });
  });
}

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
    alert("something's wrong with sorting");
  }
  return sorted;
}

function drawWithRates(allData, number) {
  const pulls = [];
  for (let i = 0; i < number; i++) {
    const randomInteger = Math.floor(Math.random() * 100);
    let sorted = [];
    if (randomInteger % 7 === 0) {
      sorted = getSorted(allData, 5);
    } else {
      sorted = getSorted(allData, 4);
    }
    pulls.push(getRandomCharacters(sorted, 1));
  }
  return pulls;
}

function officialPull(user, data, amount) {
  const randomInteger = Math.floor(Math.random() * amount);

  const pulls = drawWithRates(data, randomInteger);
  pulls.forEach((card) => {
    if (user.cards.includes(card)) {
      updateCoins(user, "duplicate");
      document.getElementById("pull-results").insertAdjacentHTML(
        "afterbegin",
        `<div class="card bg-base-100 w-[18%] shadow-sm m-4 mx-auto">
          <figure class="m-4">
            <img
              src="https://genshin.jmp.blue/characters/${card.id.toLowerCase()}/icon-big"
              alt="${card.name} icon" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              ${card.name}
              <div class="badge badge-secondary">${card.rarity}-star</div>
              <div class="badge badge-primary">DUPLICATE (+10 coins)</div>
            </h2>
          </div>
        </div>`
      );
    } else {
      user.cards.push(card);
      document.getElementById("pull-results").insertAdjacentHTML(
        "afterbegin",
        `<div class="card bg-base-100 w-[18%] shadow-sm m-4 mx-auto">
          <figure class="m-4">
            <img
              src="https://genshin.jmp.blue/characters/${card.id.toLowerCase()}/icon-big"
              alt="${card.name} icon" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              ${card.name}
              <div class="badge badge-secondary">${card.rarity}-star</div>
            </h2>
          </div>
        </div>`
      );
    }
  });
  for (let i = 0; i < amount - randomInteger; i++) {
    const randomCoins = updateCoins(user, "random");
    document.getElementById("pull-results").insertAdjacentHTML(
      "afterbegin",
      `<div class="card bg-base-100 w-[18%] shadow-sm m-4 mx-auto" id="coin-result-card">
        <figure class="m-4">
          <img
            src="https://www.onlygfx.com/wp-content/uploads/2020/11/stack-of-gold-coins-1.png"
            alt="coins" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            +${randomCoins} coins
          </h2>
        </div>
      </div>`
    );
  }
  updateCoins(user, "pull");
  document.getElementById("coins-results").innerHTML = `Coins: ${user.coins}`;
  return pulls;
}

function startPull(user, data) {
  DOMSelectors.pullStartBtn.addEventListener("click", function () {
    clearContainers();
    DOMSelectors.pullContainer.insertAdjacentHTML(
      "beforeend",
      `<h2 class="text-xl">Click the Button Below (-10 coins)</h2>
        <button class="btn btn-primary text-xl" id="pull-btn">Pull</button>
        <p class="text-lg" id="coins-results">Coins: ${user.coins}</p>
        <p class="text-lg" id="pull-results-labels">Results: </p>
        <div class="text-lg flex flex-row flex-wrap w-[90vw]" id="pull-results"></div>
        `
    );
    document.querySelector("#pull-btn").addEventListener("click", function () {
      if (user.coins < 10) {
        alert(
          "you don't have enough coins. earn coins from the game and come back again"
        );
        return;
      } else {
        const results = officialPull(user, data, 5);
        return results;
      }
    });
  });
}

function updateCoins(user, type) {
  if (type === "pull") {
    user.coins -= 10;
  } else if (type === "duplicate") {
    user.coins += 10;
  } else if (type === "correct") {
    user.coins += 5;
  } else if (type === "random") {
    const randomInteger = Math.floor(Math.random() * 5);
    user.coins += randomInteger;
    return randomInteger;
  }
}

function updateScore(user, type) {
  if (type === "correct") {
    user.currentScore++;
    user.totalAnswered++;
    user.streak++;
    updateCoins(user, "correct");
    document.querySelector(
      "#score"
    ).innerHTML = `Score: ${user.currentScore}\nCorrect! +5 coins`;
    document.querySelector("#streak").innerHTML = `Streak: ${user.streak}`;
  } else {
    user.totalAnswered++;
    user.streak = 0;
    document.querySelector(
      "#score"
    ).innerHTML = `Score: ${user.currentScore}\nWrong!`;
    document.querySelector("#streak").innerHTML = `Streak: ${user.streak}`;
  }
}

function startGame(user) {
  DOMSelectors.triviaBtn.addEventListener("click", function () {
    game(user);
  });
}

async function game(user) {
  const data = await getAllData();
  clearContainers();
  let test = "";
  let character;
  while (test === "") {
    const randomInteger = Math.floor(Math.random() * data.length);
    character = data[randomInteger];
    test = character.description;
  }
  const names = data.map((c) => c["name"]);
  names.filter((n) => n !== character.name);
  const wrongAns = [];
  const correctAns = character.name;
  for (let i = 0; i < 3; i++) {
    const randomInteger = Math.floor(Math.random() * data.length);
    const name = data[randomInteger].name;
    if (name !== correctAns && !wrongAns.includes(name)) {
      wrongAns.push(name);
    }
  }
  createQuestion(character, wrongAns, correctAns, user);
  checkCorrect(correctAns, user);
}

function createQuestion(characterData, wrongAns, correctAns, user) {
  wrongAns.push(correctAns);
  shuffle(wrongAns);
  DOMSelectors.triviaContainer.insertAdjacentHTML(
    "beforeend",
    `<h2 class="text-2xl font-bold text-center" id="question-text">Which character is being described: ${characterData.description}"</h2>
        <h3 class="text-xl text-center" id="score">Score: ${user.currentScore}</h3>
        <h3 class="text-xl text-center mb-4" id="streak">Streak: ${user.streak}</h3>
        <form id="question-form">
        <button type="submit" class="btn btn-secondary w-full py-2 rounded-md mt-4">Submit</button>
        </form>`
  );
  DOMSelectors.triviaContainer.classList.add("bg-base-100");
  wrongAns.forEach((ans) => {
    document.getElementById("question-form").insertAdjacentHTML(
      "afterbegin",
      `<div class="form-control m-3">
                <label class="label cursor-pointer" id="answer-choice">
                    <span class="label-text">${ans}</span>
                    <input type="radio" name="answer" value="${ans}" class="radio radio-secondary" />
                </label>
            </div>`
    );
  });
}

function checkCorrect(correctAns, user) {
  document
    .getElementById("question-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let selected = null;
      const radios = document.querySelectorAll('input[name="answer"]');
      for (const radio of radios) {
        if (radio.checked) {
          selected = radio.value;
          break;
        }
      }
      if (selected === null) {
        alert("choose an answer please");
      } else {
        if (selected === correctAns) {
          updateScore(user, "correct");
        } else {
          updateScore(user, "wrong");
        }
        game(user);
      }
    });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Credits to genshin.dev api
// Character data from public API: https://github.com/genshindev/api?tab=readme-ov-file
