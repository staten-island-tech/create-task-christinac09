
function attack(offense, defense, attackType) {
    if (attackType==="")
}

function updateHealth(player, type) {
    if (type==="normal damage") {
        player.health -= //smth
    }
}

async function getCharacterSkills(character) {
    try {
        const response = `https://genshin.jmp.blue/characters/${character}`
        if (response.status != 200) {
            throw new Error(response)
        } else {
            const data = response.json()
            return data.skillTalents
        }
    } catch (error){
        alert("character not found")
    }
}