import "../CSS/style.css";
import { startGame } from "./trivia.js";
import { getAllData, displayUserStats } from "./display.js";
import { startPull } from "./pull.js";

const user = {
    currentScore: 0,
    totalAnswered: 0,
    streak: 0,
    coins: 0,
    cards: [],  // only unique cards
}

let cardHistory = []  //includes duplicates

async function main() {
    const data = await getAllData()
    startGame(user)
    displayUserStats(user);
    startPull(user)
}

main()