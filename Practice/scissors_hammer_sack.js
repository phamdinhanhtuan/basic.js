function computerChoice() {
  let choices = ["Scissors", "Hammer", "Sack"];
  let randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playGame(playerChoice) {
  let computer = computerChoice();
  console.log(`You Choose: ${playerChoice}`);
  console.log(`Computer Choose: ${computer}`);

  if (playerChoice === computer) {
    console.log("Draw");
  } else if (
    (playerChoice === "Scissors" && computer === "Sack") ||
    (playerChoice === "Hammer" && computer === "Scissors") ||
    (playerChoice === "Sack" && computer === "Hammer")
  ) {
    console.log("You Win 😀");
  } else {
    console.log("Computer Lose 😔");
  }
}

let playerChoice = prompt("Choose: 'Scissors', 'Hammer', or 'Sack':");

if (playerChoice) {
  playerChoice = playerChoice.trim();
  playerChoice =
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();

  if (["Scissors", "Hammer", "Sack"].includes(playerChoice)) {
    playGame(playerChoice);
  } else {
    console.log(
      "Invalid choice! Please choose 'Scissors', 'Hammer', or 'Sack'."
    );
  }
} else {
  console.log("Game cancelled.");
}
