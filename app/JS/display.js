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

export {};
