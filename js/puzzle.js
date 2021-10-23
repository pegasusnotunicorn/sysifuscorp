//<editor-fold>------------------------------------------GLOBAL---------------------------------------

//hide all descriptive text and show next
function hideTextShowNext(textToShowClass){
  const textToHide = document.getElementsByClassName("puzzle-section");
  for (let i = 0; i < textToHide.length; i++) {
    textToHide[i].classList.add("is-hidden");
  }

  //show next text
  const textToShow = document.getElementById(textToShowClass);
  textToShow.classList.remove("is-hidden");
}

//wait time before running some function
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//random between two numbers
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//X amount of random numbers between two numbers
function xRandomIntFromInterval(total, min, max){
  let arr = [];
  while (arr.length < total){
    let r = randomIntFromInterval(min, max);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

//coordinates for cards on the 2x5 grid
const gridCoords = [
  [{top:"6.5%",left:"0.5%"}, {top:"6.5%",left:"20.5%"}, {top:"6.5%",left:"40.5%"}, {top:"6.5%",left:"60.5%"}, {top:"6.5%",left:"80.5%"}], //first column
  [{bottom:"1%",left:"0.5%"}, {bottom:"1%",left:"20.5%"}, {bottom:"1%",left:"40.5%"}, {bottom:"1%",left:"60.5%"}, {bottom:"1%",left:"80.5%"}], //second column
]

//</editor-fold>

//<editor-fold>------------------------------------------TUTORIAL---------------------------------------

export function runTutorial() {
  hideTextShowNext("tutorial-text");
  document.getElementById("puzzleWrapper").classList.remove('is-hidden');

  resetTutorial();

  //make OP cards
  let opCardsWrapper = document.getElementById("opCardsWrapper");
  opCardsWrapper.appendChild(createOPCard(18, 0));
  opCardsWrapper.appendChild(createOPCard(14, 1));
  opCardsWrapper.appendChild(createOPCard(25, 2));

  let steps = [
    {
      text:"This is the bottom half of the game board.</br>It is originally a 5 x 5 grid.",
      top:"50%",
      left:"50%"
    },
    {
      text: "This is you.",
      top:"45%",
      left:"20%",
      func: () => { showElement("playerMeeple", "id", true); }
    },
    {
      text: "You are currently on the</br><span class='is-bold'><span class='is-red'>Red</span> Boss</span> card.",
      top:"35%",
      left:"21%",
      func: () => { showElement("redBoss", "id", true); }
    },
    {
      text: "You need to get to the</br><span class='is-bold'>Performance Review</span> card to win.",
      top: "70%",
      left: "58.5%",
      func: () => { showElement("perfReview", "id", true); }
    },
    {
      text: "These are <span class='is-bold'>Project Cards</span>.",
      top: "65%",
      left: "23%",
      func: () => {
        let randomProject1 = xRandomIntFromInterval(3, 7, 16);
        let projectCardsWrapper = document.getElementById("projectCardsWrapper");
        projectCardsWrapper.appendChild(createProjectCard(randomProject1[0], gridCoords[0][1].left, gridCoords[0][1].top, "top"));
        projectCardsWrapper.appendChild(createProjectCard(randomProject1[1], gridCoords[1][2].left, gridCoords[1][2].bottom, "bottom", 180));
        projectCardsWrapper.appendChild(createProjectCard(randomProject1[2], gridCoords[0][3].left, gridCoords[0][3].top, "top", 90));
        showElement("projectCard", "class", true);
      }
    },
    {
      text: "The yellow sticky notes on the</br>edges indicate where you can move.",
      top: "80%",
      left: "77%",
      func: () => {
        showElement("arrow", "class", true);
        showElement("squareCard", "class", false);
      }
    },
    {
      text: "You have 3 moves and 3 <span class='is-bold'>Office Politics</span> cards</br>in your hand. Click on a card to see more details.",
      top: "80%",
      left: "50%",
      func: () => {
        hideElement("arrow", "class");
        showElement("playerBoard", "id", true);
        showElement("opCard", "class", false);
      }
    },
  ];

  delay(1000).then(() => showPuzzleText(steps, 0));
}

//reset the tutorial
function resetTutorial(){
  //set random player color
  let playerMeeple = document.getElementById("playerMeeple");
  playerMeeple.src = `../assets/images/puzzle/meeple${randomIntFromInterval(0, 3)}.png`;

  document.getElementById("playerBoard").classList.add("deemphasized", "is-active");
}

//</editor-fold>

//<editor-fold>------------------------------------------PUZZLE---------------------------------------

export function runPuzzle() {
  hideTextShowNext("puzzle-text");
}

//</editor-fold>

//<editor-fold>------------------------------------------PUZZLE BOARD---------------------------------------

//reset the puzzle, add active to gameboard
function resetPuzzle(){
  let gameObjs = document.getElementsByClassName("gameObj");
  for (let i = 0; i < gameObjs.length; i++) {
    gameObjs[i].classList.remove("deemphasized", "is-active");
  }
  document.getElementById("gameboard").classList.add("is-active");
  resetTutorial();
}

//show text on the puzzle
function showPuzzleText(steps, nextStep){

  //reset puzzle first if starting over
  if (nextStep === 0){
    resetPuzzle();
  }

  //position the gameboard text
  let gameBoardTextWrapper = document.getElementById("gameBoardTextWrapper");
  gameBoardTextWrapper.style.top = steps[nextStep].top;
  gameBoardTextWrapper.style.left = steps[nextStep].left;
  gameBoardTextWrapper.classList.add("is-active");

  //fill in the gameboard text
  let gameBoardText = document.getElementById("gameBoardText");
  gameBoardText.innerHTML = steps[nextStep].text;

  //click to go next
  let gameBoardTextNextButton = document.getElementById("gameBoardTextNextButton");

  //if there's no next step, start from the beginning
  let nextStepNum = (steps.length > nextStep + 1) ? nextStep + 1 : 0;
  gameBoardTextNextButton.innerHTML = (steps.length > nextStep + 1) ? "Next step →" : "Start over";

  //clone button and attach new event listener
  let buttonClone = gameBoardTextNextButton.cloneNode(true);
  buttonClone.addEventListener('click', () => {showPuzzleText(steps, nextStepNum)}, false);
  gameBoardTextNextButton.parentNode.replaceChild(buttonClone, gameBoardTextNextButton);

  //if theres a function to run, run it
  if (typeof steps[nextStep].func != "undefined"){
    steps[nextStep].func();
  }
}

//show a specific element and opaque the other objects
function showElement(elementIdOrClass, idOrClass, deemphasizeOthers){

  //deemphasize other game objects so we can highlight the object appearing
  if (deemphasizeOthers){
    let gameObjs = document.getElementsByClassName("gameObj");
    for (let i = 0; i < gameObjs.length; i++) {
      gameObjs[i].classList.add("deemphasized");
    }
  }

  //show either an ID or class
  if (idOrClass === "id"){
    //show the game obj and remove deemphasis
    let elementToShow = document.getElementById(elementIdOrClass);
    elementToShow.classList.add('is-active');
    elementToShow.classList.remove('deemphasized');
  }
  else if (idOrClass === "class"){
    let elementsToShow = document.getElementsByClassName(elementIdOrClass);
    for (let i = 0; i < elementsToShow.length; i++) {
      elementsToShow[i].classList.add("is-active");
      elementsToShow[i].classList.remove("deemphasized");
    }
  }
}

//hide a specific element (never to show again)
function hideElement(elementIdOrClass, idOrClass){
  if (idOrClass === "id"){
    let elementToShow = document.getElementById(elementIdOrClass);
    elementToShow.classList.remove('is-active', 'deemphasized');
  }
  else if (idOrClass === "class"){
    let elementsToShow = document.getElementsByClassName(elementIdOrClass);
    for (let i = 0; i < elementsToShow.length; i++) {
      elementsToShow[i].classList.remove('is-active', 'deemphasized');
    }
  }
}

//create a project card and return it
function createProjectCard(imageNum, left, y, topOrBot, rotationDeg){
  let projectCard = document.createElement("img");
  projectCard.src = `../assets/images/puzzle/projectCards/Project Cards${imageNum}.jpg`;
  projectCard.classList.add("squareCard", "gameObj", "fade", "projectCard");
  projectCard.style.left = left;
  if (topOrBot === "top"){
    projectCard.style.top = y;
  }
  else if (topOrBot === "bottom"){
    projectCard.style.bottom = y;
  }
  if (rotationDeg){
    projectCard.style.transform = `rotate(${rotationDeg}deg)`;
  }
  return projectCard;
}

//create a OP card and add to hand
function createOPCard(imageNum, index){
  let opCard = document.createElement("img");
  opCard.src = `../assets/images/puzzle/opCards/Office Politics${imageNum}.jpg`;
  opCard.classList.add("opCard", "fade", "is-active");
  opCard.style.left = `${index * 150}px`;
  opCard.style.zIndex = 3 - index;
  return opCard;
}

//</editor-fold>
