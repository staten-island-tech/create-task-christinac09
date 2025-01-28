function updateCoins(user, type) {
    if (type === "pull") {
      user.coins -= 10;
    } else if (type === "duplicate") {
      user.coins += 10;
    } else if (type === "correct") {
        user.coins += 5
    } else if (type === "random") {
      const randomInteger = Math.floor(Math.random()*5)
      user.coins += randomInteger
      return randomInteger
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

export {updateCoins, updateScore}