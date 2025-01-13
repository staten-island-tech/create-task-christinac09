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
      document.querySelector("#score").innerHTML = `Score: ${score}\nCorrect!`;
      user.currentScore++
      user.totalAnswered++
      user.streak++
      updateCoins(user, "correct")
    } else {
      document.querySelector("#score").innerHTML = `Score: ${score}\nWrong!`;
      user.totalAnswered++
      user.streak = 0
    }
  }

export {updateCoins, updateScore}