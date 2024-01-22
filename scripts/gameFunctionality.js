import { DisplayOn } from "./app.js";
import { DisplayOff } from "./app.js";

let startTxt = document.getElementById("startTxt");
let user1Score = document.getElementById("user1Score");
let user2Score = document.getElementById("user2Score");
let userTurnTxt = document.getElementById("userTurn");
let rockBtn = document.getElementById("rockBtn");
let paperBtn = document.getElementById("paperBtn");
let scissorsBtn = document.getElementById("scissorsBtn");
let lizardBtn = document.getElementById("lizardBtn");
let spockBtn = document.getElementById("spockBtn");
let replayBtn = document.getElementById("replayBtn");
let pVp = document.getElementById("pVp");
let pVe = document.getElementById("pVe");

function GameStart(pointGoal, vsMode) {
  let user1Points = 0;
  let user2Points = 0;
  let tie;
  let userInput;
  let user2Input = "Paper";
  DisplayOn(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
  Player1Turn();
  DisplayOn(user1Score, user2Score, userTurnTxt);
  CounterUpdate();

  startTxt.textContent =
    "Choose your weapon.";

  function ChoiceButtons(player1Turn, input, Method) {
    if (player1Turn) {
      userInput = input;
    } else {
      user2Input = input;
    }
    Method();
  }

  function ButtonColor(colorAdd, colorRemove) {
    rockBtn.classList.add(colorAdd);
    paperBtn.classList.add(colorAdd);
    scissorsBtn.classList.add(colorAdd);
    lizardBtn.classList.add(colorAdd);
    spockBtn.classList.add(colorAdd);
    rockBtn.classList.remove(colorRemove);
    paperBtn.classList.remove(colorRemove);
    scissorsBtn.classList.remove(colorRemove);
    lizardBtn.classList.remove(colorRemove);
    spockBtn.classList.remove(colorRemove);
  }

  function ButtonColor(colorAdd, colorRemove) {
    rockBtn.classList.add(colorAdd);
    paperBtn.classList.add(colorAdd);
    scissorsBtn.classList.add(colorAdd);
    lizardBtn.classList.add(colorAdd);
    spockBtn.classList.add(colorAdd);
    rockBtn.classList.remove(colorRemove);
    paperBtn.classList.remove(colorRemove);
    scissorsBtn.classList.remove(colorRemove);
    lizardBtn.classList.remove(colorRemove);
    spockBtn.classList.remove(colorRemove);
  }

  function Player1Turn() {
    userTurnTxt.textContent = "Player 1s turn";
    if (vsMode) {
      ButtonColor("is-primary", "is-error");
    } else {
      ButtonColor("is-primary", "is-disabled");
    }
    rockBtn.onclick = function () {
      ChoiceButtons(true, "Rock", Player2Turn);
    };
    paperBtn.onclick = function () {
      ChoiceButtons(true, "Paper", Player2Turn);
    };
    scissorsBtn.onclick = function () {
      ChoiceButtons(true, "Scissors", Player2Turn);
    };
    lizardBtn.onclick = function () {
      ChoiceButtons(true, "Lizard", Player2Turn);
    };
    spockBtn.onclick = function () {
      ChoiceButtons(true, "Spock", Player2Turn);
    };
  }

  async function Player2Turn() {
    if (vsMode) {
      userTurnTxt.textContent = "Player 2s turn";
      ButtonColor("is-error", "is-primary");
      rockBtn.onclick = function () {
        ChoiceButtons(false, "Rock", gWin);
      };
      paperBtn.onclick = function () {
        ChoiceButtons(false, "Paper", gWin);
      };
      scissorsBtn.onclick = function () {
        ChoiceButtons(false, "Scissors", gWin);
      };
      lizardBtn.onclick = function () {
        ChoiceButtons(false, "Lizard", gWin);
      };
      spockBtn.onclick = function () {
        ChoiceButtons(false, "Spock", gWin);
      };
    } else {
      CPUTurn();
    }
  }

  async function CPUTurn() {
    const promise = await fetch("https://rpslsapi.azurewebsites.net/RPSLS");
    const data = await promise.text();
    user2Input = data;
    gWin();
  }

  function gWin() {
    switch (userInput) {
      case "Rock":
        if (user2Input === "Rock") {
          tie = true;
        } else if (user2Input === "Scissors" || user2Input === "Lizard") {
          user1Points++;
        } else if (user2Input === "Paper" || user2Input === "Spock") {
          user2Points++;
        }
        break;
      case "Paper":
        if (user2Input === "Paper") {
          tie = true;
        } else if (user2Input === "Rock" || user2Input === "Spock") {
          user1Points++;
        } else if (user2Input === "Scissors" || user2Input === "Lizard") {
          user2Points++;
        }
        break;
      case "Scissors":
        if (user2Input === "Scissors") {
          tie = true;
        } else if (user2Input === "Paper" || user2Input === "Lizard") {
          user1Points++;
        } else if (user2Input === "Rock" || user2Input === "Spock") {
          user2Points++;
        }
        break;
      case "Lizard":
        if (user2Input === "Lizard") {
          tie = true;
        } else if (user2Input === "Paper" || user2Input === "Spock") {
          user1Points++;
        } else if (user2Input === "Rock" || user2Input === "Scissors") {
          user2Points++;
        }
        break;
      case "Spock":
        if (user2Input === "Spock") {
          tie = true;
        } else if (user2Input === "Rock" || user2Input === "Scissors") {
          user1Points++;
        } else if (user2Input === "Paper" || user2Input === "Lizard") {
          user2Points++;
        }
        break;
    }
    startTxt.textContent = `Player 1 chose ${userInput} and Player 2 chose ${user2Input}, `;
    if (tie === true) {
      startTxt.textContent += "TIE!";
      tie = false;
      Player1Turn();
    } else if (user1Points >= pointGoal || user2Points >= pointGoal) {

      CounterUpdate();
      DisplayOff(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
      if (user1Points > user2Points) {
        startTxt.textContent += "Player 1 wins!";
      } else {
        startTxt.textContent += "Player 2 wins!";
      }

      DisplayOn(replayBtn);
      replayBtn.onclick = function () {
        user1Points = 0;
        user2Points = 0;
        DisplayOn(pVp, pVe);
        DisplayOff(replayBtn);
        startTxt.textContent = "How would you like to play?";
        CounterUpdate();
      };
    } else {
      CounterUpdate();
      Player1Turn();
    }
  }

  function CounterUpdate() {
    user1Score.textContent = `P2 Score: ${user1Points}`;
    user2Score.textContent = `P2 Score: ${user2Points}`;
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
}
export { GameStart };
