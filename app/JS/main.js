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
  DOMSelectors.triviaContainer.classList.remove("bg-base-100", "my-10", "p-6");
}

const user = {
  currentScore: 0,
  totalAnswered: 0,
  currentStreak: 0,
  highStreak: 0,
  coins: 0,
  cards: [],
};

async function main() {
  const data = await getAllData();
  startGame(user, data);
  displayUserStats(user);
  startPull(user, data);
}

main();

async function getAllData() {
  try {
    // Credits to genshin.dev api
    // API: Genshin Impact API
    // Purpose: Fetch character data of Genshin Impact characters
    // Docs: https://github.com/genshindev/api?tab=readme-ov-file
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

function generateCardHTML(card, isDuplicate = false, isStat = false) {
  return `
    <div class="card bg-base-200 ${
      isStat ? `w-[30%]` : `w-[18%]`
    } shadow-sm m-4 mx-auto">
      <figure class="m-6">
        <img src="https://genshin.jmp.blue/characters/${card.id.toLowerCase()}/icon-big" alt="${
    card.name
  } icon" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${card.name}</h2>
        <div class="badge badge-secondary font-semibold">${
          card.rarity
        }-star</div>
        ${
          isDuplicate
            ? `<div class="badge badge-primary font-semibold">DUPLICATE (+10 coins)</div>`
            : ""
        }
        ${isStat ? `<p class="">${card.description}</p>` : ""}
      </div>
    </div>`;
}

function generateCoinHTML(amount) {
  return `
    <div class="card bg-base-100 w-[18%] shadow-sm m-4 mx-auto" id="coin-result-card">
      <figure class="m-6">
        <img src="../coin.png" alt="coins" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">+${amount} coins</h2>
      </div>
    </div>`;
}

function generateStatsHTML(user) {
  const accuracy =
    Math.round((user.currentScore / user.totalAnswered) * 100) || 0;
  return `
    <div class="flex flex-col lg:flex-row gap-8 bg-base-200 p-4 m-6 rounded-lg w-[100%] h-[85vh]">
      <div class="lg:w-1/3 space-y-6">
        <h2 class="text-3xl font-bold text-center lg:text-left">User Stats</h2>
        <div class="space-y-4">
          <div class="stat">
            <div class="stat-title">Coins</div>
            <div class="stat-value text-primary" id="coins-stat">${user.coins}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Accuracy</div>
            <div class="stat-value text-secondary" id="wins-stat">${accuracy}% (${user.currentScore}/${user.totalAnswered})</div>
          </div>
          <div class="stat">
            <div class="stat-title">Highest Streak</div>
            <div class="stat-value text-accent" id="high-streak-stat">${user.highStreak}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Current Streak</div>
            <div class="stat-value text-accent" id="current-streak-stat">${user.currentStreak}</div>
          </div>
        </div>
      </div>

      <div class="lg:w-2/3 bg-base-100 p-2">
        <h3 class="text-2xl font-semibold mb-4">Cards</h3>
        <div class="flex flex-row flex-wrap max-h-[70vh] overflow-y-auto" id="cards-stat"></div>
      </div>
    </div>
  `;
}

function displayUserStats(user) {
  DOMSelectors.statsBtn.addEventListener("click", function () {
    clearContainers();
    DOMSelectors.statsContainer.insertAdjacentHTML(
      "beforeend",
      generateStatsHTML(user)
    );
    const isStat = true;
    const cardsContainer = document.getElementById("cards-stat");
    user.cards.forEach((card) => {
      cardsContainer.insertAdjacentHTML(
        "beforeend",
        generateCardHTML(card, isStat)
      );
    });
  });
}

function getRandomItems(array, amount) {
  if (amount === 1) {
    const randomInteger = Math.floor(Math.random() * array.length);
    const randomItem = array[randomInteger];
    return randomItem;
  } else {
    const randomItems = [];
    for (let i = 0; i < number; i++) {
      const randomInteger = Math.floor(Math.random() * data.length);
      const randomItem = data[randomInteger];
      randomItems.push(randomItem);
    }
    return randomItems;
  }
}

function filterByRarity(data, rarity) {
  let sorted = [];
  if (rarity === 4) {
    sorted = data.filter((c) => c.rarity === 4);
  } else if (rarity === 5) {
    sorted = data.filter((c) => c.rarity === 5);
  } else {
    alert("something's wrong with filtering by rarity");
  }
  return sorted;
}

function getRandomPulls(allData, number) {
  const pulls = [];
  for (let i = 0; i < number; i++) {
    const randomInteger = Math.floor(Math.random() * 100);
    let sorted = [];
    if (randomInteger % 10 === 0) {
      sorted = filterByRarity(allData, 5);
    } else {
      sorted = filterByRarity(allData, 4);
    }
    pulls.push(getRandomItems(sorted, 1));
  }
  return pulls;
}

function runPull(user, data, amount) {
  const guaranteedCardCount = Math.floor(Math.random() * amount);
  const pulledCards = getRandomPulls(data, guaranteedCardCount);
  const pullResultsContainer = document.getElementById("pull-results");
  pullResultsContainer.innerHTML = "";
  pulledCards.forEach((card) => {
    const isDuplicate = user.cards.includes(card);
    if (isDuplicate) {
      updateCoins(user, "duplicate");
    } else {
      user.cards.push(card);
    }
    pullResultsContainer.insertAdjacentHTML(
      "afterbegin",
      generateCardHTML(card, isDuplicate)
    );
  });
  for (let i = 0; i < amount - guaranteedCardCount; i++) {
    const randomCoins = updateCoins(user, "random");
    pullResultsContainer.insertAdjacentHTML(
      "afterbegin",
      generateCoinHTML(randomCoins)
    );
  }
  updateCoins(user, `pull ${amount}`);
  document.getElementById("coins-results").innerHTML = `Coins: ${user.coins}`;
  return pulledCards;
}

function startPull(user, data) {
  DOMSelectors.pullStartBtn.addEventListener("click", function () {
    clearContainers();
    DOMSelectors.pullContainer.insertAdjacentHTML(
      "beforeend",
      `<h2 class="text-2xl font-bold mt-6">Click a Button Below</h2>
      <div class="flex flex-row w-full justify-evenly" id="pull-btn-container">
        <div class="flex flex-col items-center">
          <button class="btn btn-primary text-xl" id="pull-1-btn">Pull 1</button>
          <span class="text-sm text-gray-300 mt-1">-2 Coins</span>
        </div>
        <div class="flex flex-col items-center">
          <button class="btn btn-accent text-xl" id="pull-5-btn">Pull 5</button>
          <span class="text-sm text-gray-300 mt-1">-10 Coins</span>
        </div>
      </div>
        <p class="text-lg font-semibold" id="coins-results">Coins: ${user.coins}</p>
        <p class="text-lg font-semibold" id="pull-results-labels">Results: </p>
        <div class="text-lg flex flex-row flex-wrap w-[90vw] rounded-lg" id="pull-results"></div>`
    );
    document
      .querySelector("#pull-1-btn")
      .addEventListener("click", function () {
        if (user.coins < 2) {
          alert(
            "you don't have enough coins. earn coins from the game and come back again"
          );
          return;
        } else {
          const results = runPull(user, data, 1);
          return results;
        }
      });
    document
      .querySelector("#pull-5-btn")
      .addEventListener("click", function () {
        if (user.coins < 10) {
          alert(
            "you don't have enough coins. earn coins from the game and come back again"
          );
          return;
        } else {
          const results = runPull(user, data, 5);
          return results;
        }
      });
  });
}

function updateCoins(user, type) {
  if (type.slice(0, 4) === "pull") {
    user.coins -= type.slice(-1) * 2;
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
    user.currentStreak++;
    if (user.currentStreak > user.highStreak) {
      user.highStreak = user.currentStreak;
    }
    updateCoins(user, "correct");
    document.querySelector(
      "#score"
    ).innerHTML = `Score: ${user.currentScore}\nCorrect! +5 coins`;
  } else {
    user.totalAnswered++;
    user.currentStreak = 0;
    document.querySelector(
      "#score"
    ).innerHTML = `Score: ${user.currentScore}\nWrong!`;
  }
  document.querySelector(
    "#streak"
  ).innerHTML = `Current Streak: ${user.currentStreak}`;
}

function startGame(user, data) {
  DOMSelectors.triviaBtn.addEventListener("click", function () {
    runTriviaRound(user, data);
  });
}

async function runTriviaRound(user, data) {
  clearContainers();
  const withDescription = data.filter((char) => char.description !== "");
  const correctCharacter = getRandomItems(withDescription, 1);
  const wrongAnswers = [];
  while (wrongAnswers.length < 3) {
    const randomName = getRandomItems(data, 1).name;
    if (
      randomName !== correctCharacter.name &&
      !wrongAnswers.includes(randomName)
    ) {
      wrongAnswers.push(randomName);
    }
  }
  const allAnswers = shuffle([...wrongAnswers, correctCharacter.name]);
  displayTriviaQuestion(correctCharacter, allAnswers, user);
  checkAnswer(correctCharacter.name, user, data);
}

function displayTriviaQuestion(character, answers, user) {
  DOMSelectors.triviaContainer.insertAdjacentHTML(
    "beforeend",
    `<h2 class="text-2xl font-bold text-center" id="question-text">Which character is being described: ${character.description}"</h2>
    <h3 class="text-xl text-center" id="score">Score: ${user.currentScore}</h3>
    <h3 class="text-xl text-center mb-4" id="streak">Current Streak: ${user.currentStreak}</h3>
    <form id="question-form">
    <button type="submit" class="btn btn-secondary w-full py-2 rounded-md mt-4">Submit</button>
    </form>`
  );
  DOMSelectors.triviaContainer.classList.add("bg-base-100", "my-10", "p-6");
  answers.forEach((ans) => {
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

function checkAnswer(correctAns, user, data) {
  document
    .getElementById("question-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const selected = document.querySelector('input[name="answer"]:checked');
      if (!selected) {
        alert("Choose an answer please!");
        return;
      }
      if (selected.value === correctAns) {
        updateScore(user, "correct");
      } else {
        updateScore(user, "wrong");
      }
      setTimeout(() => runTriviaRound(user, data), 500);
    });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
