import { getAllData } from "./display.js";
import { DOMSelectors, clearContainers } from "./dom.js";

function startGame(currentScore) {
  DOMSelectors.gameStartBtn.addEventListener("click", function () {
    game(currentScore);
  });
}

async function game(score) {
  console.log("game clicked");
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
    wrongAns.push(name);
  }
  createQuestion(character, wrongAns, correctAns, score);
  checkCorrect(correctAns, score);
}

function createQuestion(characterData, wrongAns, correctAns, score) {
  wrongAns.push(correctAns);
  shuffle(wrongAns);
  console.log(wrongAns);
  DOMSelectors.gameContainer.insertAdjacentHTML(
    "beforeend",
    `<h2 class="text-2xl font-bold text-center" id="question-text">Which character is being described: ${characterData.description}</h2>
      <h3 class="text-xl text-center mb-4" id="score">Score: ${score}</h3><form id="question-form"><button type="submit" class="btn btn-secondary w-full py-2 rounded-md mt-4">Submit</button></form>`
  );
  DOMSelectors.gameContainer.classList.add("bg-base-100");
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

function checkCorrect(correctAns, score) {
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
          score++;
          console.log(score);
          updateScore(score, "correct");
        } else {
          updateScore(score, "wrong");
        }
        game(score);
      }
    });
}

function updateScore(score, type) {
  if (type === "correct") {
    document.querySelector("#score").innerHTML = `Score: ${score}\nCorrect!`;
  } else {
    document.querySelector("#score").innerHTML = `Score: ${score}\nWrong!`;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { startGame };
