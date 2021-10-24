import * as puzzleFunctions from "./puzzleFunctions.js";

//<editor-fold>------------------------------------------TUTORIAL---------------------------------------

//the various steps to the tutorial
const steps = [
  {
    text:"This is the bottom half of the game board. It is a 5 x 5 grid.",
    top:"50%",
    left:"50%",
    func: () => {
      //this step
      puzzleFunctions.hideElement("playerMeeple", "id");

      //undo next step
      puzzleFunctions.emphasizeElement("gameboard", "id");
    }
  },
  {
    text: "This is you.",
    top:"42%",
    left:"20%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("playerMeeple", "id", true);

      //undo next step
      puzzleFunctions.hideElement("redBoss", "id");
    }
  },
  {
    text: "You are currently on the <span class='is-bold'><span class='is-red'>Red</span> Boss</span> card.",
    top:"35%",
    left:"21%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("redBoss", "id", true);

      //undo next step
      puzzleFunctions.hideElement("perfReview", "id");
    }
  },
  {
    text: "You need to get to the <span class='is-bold'>Performance Review</span> card to win.",
    top: "70%",
    left: "58.5%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("perfReview", "id", true);

      //undo next step
      projectCardsWrapper.innerHTML = "";
    }
  },
  {
    text: "These are <span class='is-bold'>Project Cards</span>.",
    top: "65%",
    left: "23%",
    func: () => {
      //this step
      let randomProjects = puzzleFunctions.xRandomIntFromInterval(3, 7, 16);
      let projectCardsWrapper = document.getElementById("projectCardsWrapper");
      projectCardsWrapper.innerHTML = "";
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(0, randomProjects[0], puzzleFunctions.gridCoords[0][1].left, puzzleFunctions.gridCoords[0][1].top, "top"));
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(1, randomProjects[1], puzzleFunctions.gridCoords[1][2].left, puzzleFunctions.gridCoords[1][2].bottom, "bottom", 180));
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(2, randomProjects[2], puzzleFunctions.gridCoords[0][3].left, puzzleFunctions.gridCoords[0][3].top, "top", 90));
      puzzleFunctions.emphasizeElement("projectCard", "class", true);

      //undo next step
      puzzleFunctions.hideElement("arrow", "class");
    }
  },
  {
    text: "The yellow sticky notes on the edges indicate where you can move.",
    top: "80%",
    left: "77%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("arrow", "class", true);
      puzzleFunctions.emphasizeElement("squareCard", "class");

      //undo next step
      puzzleFunctions.hideElement("influenceCircle", "class");
    }
  },
  {
    text: "The top left number shows how much  <span class='is-bold'>Company Influence</span> you receive every time you move onto a <span class='is-bold'>Project Card</span>.",
    top: "50%",
    left: "50%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("influenceCircle", "class", true);
      puzzleFunctions.hideElement("arrow", "class");

      //undo next step
      puzzleFunctions.emphasizeElement("projectCard", "class");
      puzzleFunctions.setOPCard(0, 0);
      puzzleFunctions.setOPCard(1, 0);
      puzzleFunctions.setOPCard(2, 0);
    }
  },
  {
    text: "You have 3 moves and 3 <span class='is-bold'>Office Politics</span> cards in your hand. Click on a card to see more details.",
    top: "80%",
    left: "50%",
    func: () => {
      //this step
      puzzleFunctions.hideElement("influenceCircle", "class");
      puzzleFunctions.setOPCard(0, 18);
      puzzleFunctions.setOPCard(1, 25);
      puzzleFunctions.setOPCard(2, 14);

      //order matters V high all, emphasize OP cards & player board
      puzzleFunctions.emphasizeElement("playerBoardSection", "class", true);   //also undos next step
      puzzleFunctions.emphasizeElement("opCard", "class");
    }
  },
  {
    text: "Can you win in 1 turn? Click next to see the answer.",
    top: "15%",
    left: "42%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("fadeable", "class");

      //undo next step
      puzzleFunctions.resetGameObj("playerMeeple", true);
      document.getElementById("companyInfNum").innerHTML = "1";
      document.getElementById("movesLeftNum").innerHTML = "3";
    }
  },
  {
    text: "Step 1. Move once. Gain 1 <span class='is-bold'>Company Influence</span>.",
    top: "69%",
    left: "39%",
    func: () => {
      //this step / also undo's next step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"16%", left:"27%"});
      document.getElementById("companyInfNum").innerHTML = "2";
      document.getElementById("movesLeftNum").innerHTML = "2";
    }
  },
  {
    text: "Step 2. Move again. Gain 1 <span class='is-bold'>Company Influence</span>.",
    top: "26%",
    left: "60%",
    func: () => {
      //this step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"69%", left:"46%"});
      document.getElementById("companyInfNum").innerHTML = "3";
      document.getElementById("movesLeftNum").innerHTML = "1";

      //undo next step
      puzzleFunctions.resetEmphasis();
      puzzleFunctions.highlightOpCard(false);
    }
  },
  {
    text: "Step 3. Use the card <span class='is-bold'>Spread a rumor</span> by paying 1 <span class='is-bold'>Company Influence</span>.",
    top: "79%",
    left: "71%",
    func: () => {
      //this step
      document.getElementById("companyInfNum").innerHTML = "2";
      puzzleFunctions.emphasizeElement("opCard1", "id", true);
      puzzleFunctions.emphasizeElement("influenceSection", "id", false);
      puzzleFunctions.highlightOpCard(0);

      //undo next step
      puzzleFunctions.moveGameObj("projectCard2", {transform:"rotate(90deg)"});
    }
  },
  {
    text: "Which lets us rotate this card.",
    top: "19%",
    left: "41%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("projectCard2", "id", true);
      puzzleFunctions.emphasizeElement("opCard1", "id", false);
      puzzleFunctions.moveGameObj("projectCard2", {transform:"rotate(0deg)"});

      //undo next step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"69%", left:"46%"});
      document.getElementById("companyInfNum").innerHTML = "2";
      document.getElementById("movesLeftNum").innerHTML = "1";

      //order below matters V need to keep card highlighted
      puzzleFunctions.hideOrShowOpCard(0, false);
      puzzleFunctions.highlightOpCard(0);
    }
  },
  {
    text: "Now we can move once more. Gain 1 <span class='is-bold'>Company Influence</span>.",
    top: "19%",
    left: "41%",
    func: () => {
      //this step
      puzzleFunctions.resetEmphasis();
      puzzleFunctions.moveGameObj("playerMeeple", {top:"17%", left:"70%"});
      document.getElementById("companyInfNum").innerHTML = "3";
      document.getElementById("movesLeftNum").innerHTML = "0";
      puzzleFunctions.hideOrShowOpCard(0, true);

      //undo next step
      puzzleFunctions.emphasizeElement("squareCard", "class");
      puzzleFunctions.emphasizeElement("playerMeeple", "id");
      puzzleFunctions.emphasizeElement("gameboard", "id");
      puzzleFunctions.emphasizeElement("playerBoardSection", "class");
    }
  },
  {
    text: "But now we are out of moves!",
    top: "82%",
    left: "21%",
    func: () => {
      //undo next step
      document.getElementById("companyInfNum").innerHTML = "3";
      puzzleFunctions.highlightOpCard(false);
      puzzleFunctions.hideOrShowOpCard(0, true);
      puzzleFunctions.hideOrShowOpCard(2, false);

      //this step, order matters here cuz the above functions deemphasize OP cards
      puzzleFunctions.emphasizeElement("movesSection", "id", true);
    }
  },
  {
    text: "Use the card <span class='is-bold'>Work overtime</span> by paying 3 <span class='is-bold'>Company Influence</span> and discarding 1 additional card.",
    top: "76%",
    left: "71%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("opCard1", "id", true);
      puzzleFunctions.emphasizeElement("influenceSection", "id", false);
      document.getElementById("companyInfNum").innerHTML = "0";
      document.getElementById("movesLeftNum").innerHTML = "0";    //also undos next step
      puzzleFunctions.highlightOpCard(1);
      puzzleFunctions.hideOrShowOpCard(2, true);
    }
  },
  {
    text: "Which gives us 1 more move.",
    top: "80%",
    left: "21%",
    func: () => {
      //this step, order matters here cuz the above functions deemphasize OP cards
      document.getElementById("movesLeftNum").innerHTML = "1";
      puzzleFunctions.emphasizeElement("movesSection", "id", true);
      puzzleFunctions.emphasizeElement("opCard1", "id", false);

      //undo next step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"17%", left:"70%"});

      //keep card highlighted
      puzzleFunctions.hideOrShowOpCard(1, false);
      puzzleFunctions.highlightOpCard(1);
    }
  },
  {
    text: "Move onto the <span class='is-bold'>Performance Review</span> card. You just won!",
    top: "73%",
    left: "61%",
    func: () => {
      //this step, no undos bc final step
      puzzleFunctions.resetEmphasis();
      puzzleFunctions.moveGameObj("playerMeeple", {top:"60%", left:"90%"});
      puzzleFunctions.hideOrShowOpCard(1, true);
      document.getElementById("movesLeftNum").innerHTML = "0";
    }
  },
];

//reset the tutorial
export function resetTutorial(){

  //reset player
  puzzleFunctions.resetGameObj("playerMeeple", true);

  //reset OP cards
  puzzleFunctions.highlightOpCard(false);
  puzzleFunctions.resetOPCards();

  //set moves and company influence
  document.getElementById("movesLeftNum").innerHTML = "3";
  document.getElementById("companyInfNum").innerHTML = "1";
}

//delay for 1 sec, then start the steps, pass in cb for tutorial specific reset
export function runTutorial() {

  //set random player color, changes per page refresh
  let playerMeeple = document.getElementById("playerMeeple");
  playerMeeple.src = `../assets/images/puzzle/meeple${puzzleFunctions.randomIntFromInterval(0, 3)}.png`;

  //make OP cards
  let opCardsWrapper = document.getElementById("opCardsWrapper");
  opCardsWrapper.innerHTML = "";
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 0));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 1));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 2));

  //click button to start
  let startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    puzzleFunctions.showPuzzleText(steps, 0, resetTutorial, true);
    startButton.classList.add("is-hidden");
  });

  //resizing for mobile
  window.addEventListener('resize', puzzleFunctions.setupMobile);

}

//</editor-fold>
