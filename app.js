const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let cnt = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  cnt = 0;
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const drawGame = () => {
  msg.innerText = "The Game was Draw!";
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("Winner", pos1Val);
        showWinner(pos1Val);
      }
    }
  }
};

boxes.forEach((box) => {
  //forEach creates array of boxes
  box.addEventListener("click", () => {
    // console.log("Box was clicked");
    cnt++;
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ca2e55";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#462521";
      turnO = true;
    }
    box.disabled = true;
    if (cnt >= 9) {
      checkWinner() === false;
      msg.innerText = "Game was draw";
      msgContainer.classList.remove("hide");
      cnt = 0;
    } else {
      checkWinner();
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
