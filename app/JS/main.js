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
}
const user = {
    currentScore: 0,
    totalAnswered: 0,
    streak: 0,
    coins: 0,
    cards: [],  // only unique cards
}
const data = await getAllData()

let cardHistory = []  //includes duplicates

async function main() {
    startGame(user)
    displayUserStats(user);
    startPull(user)
}

main()

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

function displayUserStats(user) {
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
      console.log("something's wrong");
    }
    return sorted;
  }

function drawWithRates(allData, number) {
    const pulls = [];
    for (let i = 0; i < number; i++) {
      const randomInteger = Math.floor(Math.random() * 100);
      console.log("Random Integer: " + randomInteger);
      let sorted = [];
      if (randomInteger % 7 === 0) {
        console.log("5 STAR !!");
        sorted = getSorted(allData, 5); 
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
    pulls.forEach((p) => {
      if (user.cards.includes(p)) {
        console.log("duplicate");
        updateCoins(user, "duplicate");
        document
          .getElementById("pull-results")
          .insertAdjacentHTML("beforeend", `${p.name} (duplicate +10 coins), `);
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
  DOMSelectors.pullStartBtn.addEventListener("click", function () {
    clearContainers();
    DOMSelectors.pullContainer.insertAdjacentHTML(
      "beforeend",
      `<h2>Click the Button Below</h2>
      <button class="btn btn-primary" id="pull-btn">Pull</button>
      <p id="pull-results">Results: </p>
      <p id="coins-results">Coins: </p>`
    );
  document.querySelector("#pull-btn").addEventListener("click", function(){
      document.querySelector("#pull-results").innerHTML=""
      if (user.coins < 5) {
        alert("you don't have enough coins. get coins from the game and come back later")
        return
      } else {
        const results = officialPull(user, data, 5);
        return results;
      }
      
  })
  });
}

function updateCoins(user, type) {
    if (type === "pull") {
      user.coins -= 5;
    } else if (type === "duplicate") {
      user.coins += 10;
    } else if (type === "correct") {
        user.coins += 5
    }
  }

function updateScore(user, type) {
    if (type === "correct") {
      user.currentScore++
      user.totalAnswered++
      user.streak++
      updateCoins(user, "correct")
      document.querySelector("#score").innerHTML = `Score: ${user.currentScore}\nCorrect! +5 coins`;
      document.querySelector("#streak").innerHTML = `Streak: ${user.streak}`
    } else {
      user.totalAnswered++
      user.streak = 0
      document.querySelector("#score").innerHTML = `Score: ${user.currentScore}\nWrong!`;
      document.querySelector("#streak").innerHTML = `Streak: ${user.streak}`
    }
  }

function startGame(user) {
    DOMSelectors.triviaBtn.addEventListener("click", function () {
      game(user);
    });
  }
  
async function game(user) {
    console.log("game clicked");
    clearContainers();
    const data = await getAllData()
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
      if (wrongAns !== correctAns) {
        wrongAns.push(name);
      }
    }
    createQuestion(character, wrongAns, correctAns, user);
    checkCorrect(correctAns, user);
  }
  
function createQuestion(characterData, wrongAns, correctAns, user) {
    wrongAns.push(correctAns);
    shuffle(wrongAns);
    console.log(wrongAns);
    DOMSelectors.triviaContainer.insertAdjacentHTML(
      "beforeend",
      `<h2 class="text-2xl font-bold text-center" id="question-text">Which character is being described: ${characterData.description}"</h2>
        <h3 class="text-xl text-center mb-4" id="score">Score: ${user.currentScore}</h3>
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
        /* selected = document.querySelector('input[name="answer"]:checked').value; this causes an error bc there's no checked radiobtns yet */
        console.log(selected);
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