import * as puzzleFunctions from "./puzzleFunctions.js";

//<editor-fold>------------------------------------------TUTORIAL---------------------------------------

//various variables for text
const companyInfluence = puzzleFunctions.constVars.companyInfluence;
const projectCard = puzzleFunctions.constVars.projectCard;
const projectCards = puzzleFunctions.constVars.projectCards;
const opCard = puzzleFunctions.constVars.opCard;
const opCards = puzzleFunctions.constVars.opCards;
const brDesktop = puzzleFunctions.constVars.brDesktop;

//the various steps to the tutorial
const steps = [
  {
    text:`This is the bottom half of the 5 x 5 game board. Click next to continue.`,
    top:"50%",
    left:"50%",
    func: () => {
      //this step
      puzzleFunctions.hideElement("playerMeeple", "id");

      //undo next step
      puzzleFunctions.emphasizeElement("gameboard", "id", true);
    }
  },
  {
    text: "This meeple is you.",
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
    text: "You are currently on the <span class='is-bold is-monospace'><span class='is-red'>Red</span> Boss</span> card.",
    top:"35%",
    left:"26%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("redBoss", "id", true);

      //undo next step
      puzzleFunctions.hideElement("perfReview", "id");
    }
  },
  {
    text: "You need to get to the <span class='is-bold is-monospace'>Performance Review</span> card to win.",
    top: "70%",
    left: "54.5%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("perfReview", "id", true);

      //undo next step
      projectCardsWrapper.innerHTML = "";
    }
  },
  {
    text: `These are ${projectCards}.`,
    top: "71%",
    left: "21%",
    func: () => {
      //this step
      let randomProjects1 = puzzleFunctions.xRandomIntFromInterval(3, 7, 16);
      let projectCardsWrapper = document.getElementById("projectCardsWrapper");
      projectCardsWrapper.innerHTML = "";
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(0, randomProjects1[0], puzzleFunctions.gridCoords[0][1].left, puzzleFunctions.gridCoords[0][1].top));
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(1, randomProjects1[1], puzzleFunctions.gridCoords[1][2].left, puzzleFunctions.gridCoords[1][2].top, 180));
      projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(2, randomProjects1[2], puzzleFunctions.gridCoords[0][3].left, puzzleFunctions.gridCoords[0][3].top, 90));
      puzzleFunctions.emphasizeElement("projectCard", "class", true);

      //undo next step
      puzzleFunctions.hideElement("arrow", "class");
    }
  },
  {
    text: `The yellow sticky notes on the edges indicate where you can move. You cannot move to spaces without a ${projectCard}.`,
    top: "91%",
    left: "72%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("arrow", "class", true);
      puzzleFunctions.emphasizeElement("squareCard", "class");

      //undo next step
      puzzleFunctions.hideElement("influenceCircle", "class");
    }
  },
  {
    text: `The top left number shows exactly how much ${companyInfluence} you receive every time you move onto a ${projectCard}.`,
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
    text: `You have 3 moves and 3 ${opCards} in your hand. Click on a card to see more details.`,
    top: "75%",
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
    text: `Do you think you can win in 1 turn? ${brDesktop}Click next to see the answer.`,
    top: "68%",
    left: "86%",
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
    text: `Step 1. Move once. ${brDesktop}Gain 1 ${companyInfluence}.`,
    top: "76%",
    left: "39%",
    func: () => {
      //this step / also undo's next step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"16%", left:"27%"});
      document.getElementById("companyInfNum").innerHTML = "2";
      document.getElementById("movesLeftNum").innerHTML = "2";
    }
  },
  {
    text: `Step 2. Move again. ${brDesktop}Gain 1 ${companyInfluence}.`,
    top: "26%",
    left: "60%",
    func: () => {
      //this step
      puzzleFunctions.moveGameObj("playerMeeple", {top:"69%", left:"46%"});
      document.getElementById("companyInfNum").innerHTML = "3";
      document.getElementById("movesLeftNum").innerHTML = "1";

      //undo next step
      puzzleFunctions.emphasizeAll();
      puzzleFunctions.highlightOpCard(false);
    }
  },
  {
    text: `Step 3. Use the card <span class='is-bold is-monospace'>Spread a rumor</span> by paying 1 ${companyInfluence}.`,
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
    left: "34%",
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
    text: `Now we can move once more. ${brDesktop}Gain 1 ${companyInfluence}.`,
    top: "19%",
    left: "41%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeAll();
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
    top: "93%",
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
    text: `Use the card <span class='is-bold is-monospace'>Work overtime</span> by paying 3 ${companyInfluence} and discarding 1 additional ${opCard}.`,
    top: "87%",
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
    top: "93%",
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
    text: `Move onto the <span class='is-bold is-monospace'>Performance Review</span> card. ${brDesktop}You just won!`,
    top: "76%",
    left: "55%",
    func: () => {
      //this step, no undos bc final step
      puzzleFunctions.emphasizeAll();
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

//start the step when start button is pressed, pass in cb for specific reset
export function runTutorial() {

  //make OP cards
  let opCardsWrapper = document.getElementById("opCardsWrapper");
  opCardsWrapper.innerHTML = "";
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 0));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 1));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 2));

  //scroll to middle so that it's obvious theres more on mobile
  opCardsWrapper.scrollLeft = (opCardsWrapper.scrollWidth - opCardsWrapper.offsetWidth) / 2;

  let topText = `
    <h2 class="is-hidden-desktop">Interactive Tutorial</h2>
    <p>This is a simplied tutorial on how to play the game <span class="is-bold">Welcome to Sysifus Corp</span>.</p>
    <p>It should only take about 5 minutes to complete.</p>
    <p id="startText" class="is-hidden-mobile is-hidden-tablet-mobile">
      If you are on a computer, you can use the arrow keys to navigate.
    </p>
  `;
  puzzleFunctions.start(steps, resetTutorial, false, topText);
}

//</editor-fold>
