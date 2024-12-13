import "../CSS/style.css";
import { getAllData } from "./display";

const userStats = {
  // idk
  currency: 0,
  cards: [],
  health: 0,
};

function getRandomCharacters(number, data) {
  const characters = [];
  for (let i = 0; i < number; i++) {
    const randomInteger = Math.floor(Math.random() * data.length);
    const randomCharacter = data[randomInteger];
    characters.push(randomCharacter);
  }
  console.log(characters);
  return characters;
}

const data = await getAllData();
getRandomCharacters(4, data);

function sort(data) {
  const fours = [];
  const fives = [];
  console.log(l);
}
sort(data);
