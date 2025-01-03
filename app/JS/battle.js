/* function attack(offense, defense, attackType) {
    if (attackType==="")
}

function updateHealth(player, type) {
    if (type==="normal damage") {
        player.health -= //smth
    }
} */

async function getCharacterSkills(character) {
  try {
    const response = await fetch(
      `https://genshin.jmp.blue/characters/${character}`
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data.skillTalents;
    }
  } catch (error) {
    alert("character not found");
  }
}

function getRandomAttackValue(attackType, characterSkills) {
  let damageString;
  if (attackType === "normal") {
    damageString = characterSkills[0]["attribute-scaling"][0].value;
  } else if (attackType === "elemental") {
    damageString = characterSkills[1]["attribute-scaling"][0].value;
  } else if (attackType === "elemental burst") {
    damageString = characterSkills[2]["attribute-scaling"][0].value;
  } else {
    alert("somethings wrong w attack type");
  }
  const damageList = damageString.split(" ");
  console.log(damageList);
  const randomInt = Math.floor(Math.random() * damageList.length);
  const randomDamage = damageList[randomInt];
  return randomDamage;
}
const skills = await getCharacterSkills("albedo");
/* console.log(getRandomAttackValue("normal", skills)); */

document.getElementById("normal").addEventListener("click", function () {
  // define damage variable
  const damage = getRandomAttackValue("normal", skills);
  // run damage function w damage parameter + update health & commentary stuff
});

export { getCharacterSkills };
