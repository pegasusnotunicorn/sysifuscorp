import * as puzzleFunctions from "./puzzleFunctions.js";

//<editor-fold>------------------------------------------PUZZLE---------------------------------------

//various variables for text
const companyInfluence = puzzleFunctions.constVars.companyInfluence;
const projectCard = puzzleFunctions.constVars.projectCard;
const projectCards = puzzleFunctions.constVars.projectCards;
const opCard = puzzleFunctions.constVars.opCard;
const opCards = puzzleFunctions.constVars.opCards;
const brDesktop = puzzleFunctions.constVars.brDesktop;

//the various steps to the puzzle
const steps = [
  {
    text:`Welcome to the puzzle. ${brDesktop}Do you think you can win in 1 turn?`,
    top:"50%",
    left:"50%",
    func: () => {
      //this step
      puzzleFunctions.deemphasizeAll();
    }
  },
  {
    text:`You start with 0 ${companyInfluence}, 4 ${opCards}, and 3 moves.`,
    top: "75%",
    left: "50%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("playerBoardSection", "class", true);   //also undos next step
    }
  },
  {
    text:`There are 6 ${projectCards} already laid out on the board.`,
    top:"50%",
    left:"50%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("projectCard", "class", true);   //also undos next step
    }
  },
  {
    text: "You are currently on the <span class='is-bold is-monospace'><span class='is-red'>Red</span> Boss</span> card.",
    top:"35%",
    left:"26%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("redBoss", "id", true);   //also undos next step
      puzzleFunctions.emphasizeElement("playerMeeple", "id", false);
    }
  },
  {
    text: "You need to get to the <span class='is-bold is-monospace'>Performance Review</span> card to win.",
    top: "70%",
    left: "54.5%",
    func: () => {
      //this step
      document.getElementById("gameBoardTextButtonWrapper").style = null;
      document.getElementById("gameBoardTextHideButton").classList.add('is-hidden');
      puzzleFunctions.emphasizeElement("perfReview", "id", true);   //also undos next step

      //undos next step
      document.getElementById("puzzleWrapper").setAttribute("step", "notlast");
      puzzleFunctions.toggleHideButton();
    }
  },
  {
    text: `Good luck and have fun! ${brDesktop}If you need to learn the rules again, <a href='/tutorial'>click here for the tutorial</a>.`,
    top: "50%",
    left: "50%",
    func: () => {
      //lets gooo
      puzzleFunctions.setupMobile(topText);
      puzzleFunctions.emphasizeAll();
      document.getElementById("gameBoardTextButtonWrapper").style.flexDirection = "row";
      document.getElementById("gameBoardTextResetButton").classList.add("is-hidden");
      document.getElementById("puzzleWrapper").setAttribute("step", "last");
      puzzleFunctions.toggleHideButton();
    }
  },
];

const topText = `
  <p>If you can solve the following puzzle, I will give you a coupon for free shipping for my board game.</p>
  <p>No strings attached. No signups. No tricks. Just a good ol' fashioned puzzle.</p>
  <p id="startText" class="is-hidden">
    Click the green button below to start.
    <span class="is-hidden-mobile is-hidden-tablet-mobile">If you are on a computer, you can use arrow keys to navigate.</span>
  </p>
`;

//reset the puzzle
export function resetPuzzle(){

  //make OP cards
  puzzleFunctions.setOPCard(0, 18);
  puzzleFunctions.setOPCard(1, 19);
  puzzleFunctions.setOPCard(2, 20);
  puzzleFunctions.setOPCard(3, 1);

  //make random project cards (how many i want, min image id#, max image id#)
  let randomProjects0 = puzzleFunctions.xRandomIntFromInterval(2, 1, 6);
  let randomProjects1 = puzzleFunctions.xRandomIntFromInterval(2, 7, 16);
  let randomProjects2 = puzzleFunctions.xRandomIntFromInterval(1, 17, 21);
  let randomProjects3 = puzzleFunctions.xRandomIntFromInterval(1, 22, 25);
  let projectCardsWrapper = document.getElementById("projectCardsWrapper");
  projectCardsWrapper.innerHTML = "";
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(0, randomProjects1[0], puzzleFunctions.gridCoords[0][1].left, puzzleFunctions.gridCoords[0][1].top, "top"));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(1, randomProjects1[1], puzzleFunctions.gridCoords[1][2].left, puzzleFunctions.gridCoords[1][2].bottom, "bottom", 90));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(2, randomProjects2[0], puzzleFunctions.gridCoords[1][1].left, puzzleFunctions.gridCoords[1][1].bottom, "bottom", 0));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(3, randomProjects0[0], puzzleFunctions.gridCoords[0][2].left, puzzleFunctions.gridCoords[0][2].top, "top", 0));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(4, randomProjects0[1], puzzleFunctions.gridCoords[0][3].left, puzzleFunctions.gridCoords[0][3].top, "top", 180));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(5, randomProjects3[0], puzzleFunctions.gridCoords[1][3].left, puzzleFunctions.gridCoords[1][3].bottom, "bottom", 270));
  puzzleFunctions.emphasizeElement("projectCard", "class", false);

  //show meeple / boss / perf review
  puzzleFunctions.emphasizeElement("playerMeeple", "id", false);
  puzzleFunctions.emphasizeElement("redBoss", "id", false);
  puzzleFunctions.emphasizeElement("perfReview", "id", false);

  //check for mobile sizing
  puzzleFunctions.setupMobile(topText);
}

//start the step when start button is pressed, pass in cb for specific reset
export function runPuzzle() {

  //make OP cards
  let opCardsWrapper = document.getElementById("opCardsWrapper");
  opCardsWrapper.innerHTML = "";
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 0));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 1));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 2));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 3));

  puzzleFunctions.start(steps, resetPuzzle, false, topText);
}

//</editor-fold>
