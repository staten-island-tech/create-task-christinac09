ideas:

- can choose types of ques (MC, true/false, Sa?)
- can choose # of ques
- ask diff ques abt characters (guess char from info, which desc describes char)
- can pull characters/weapons(?) using coins gained from correct ans
- in middle/end of trivia, maybe have a part where user can do double or nothing based on current points/coins gained (gambling)
- stats for # wins, accuracy %, highest streak
- what they get for winning: 5(?) coins for each ques, and extra # of coins for highest streak
- include commentary for getting ques correct and wrong
- can also use coins to buy hints (eliminate ans, give extra info abt the char, etc.)

algorithms to use for personalized project reference thing:

- getRandomItems(array, amount) - loop inside selection tho, called 3x but all run same part of function
- getRandomPulls(allData, amount) - has everything, but called 1x
- runPull(user, data, amount) - do parameters run diff parts of code?, called 2x
- runTriviaRound(user, data) - if statement doesn't have else, do params run diff parts of code?; called 2x but are same

some functions that could be altered

- updateCoins (called 4x) and updateScore (called 2x) - add iteration
- generateCardHTML - add iteration (loop thru cards); called 2x
- filterByRarity - add iteration; called 2x
