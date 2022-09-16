import * as puzzleFunctions from "./puzzleFunctions.js";

//<editor-fold>------------------------------------------GLOBAL HELPERS---------------------------------------

//delete all elements of class
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

//slowly scroll to the playerboard if mobile
function mobileScrollToElem(elem){
  if (document.getElementById("topTextWrapper").getAttribute("viewType") != "desktop"){
    document.getElementById(elem).scrollIntoView({behavior:"smooth"});
  }
}

function addCompanyInfluence(amount){
  let compInf = document.getElementById("companyInfNum");
  let currentInfluence = parseInt(compInf.innerHTML);
  let newInfluence = currentInfluence + amount;
  compInf.innerHTML = (newInfluence > 5) ? 5 : (newInfluence < 0) ? 0 : newInfluence;
}

function setCompanyInfluence(amount){
  document.getElementById("companyInfNum").innerHTML = amount;
}

function getCompanyInfluence(){
  return (document.getElementById("companyInfNum").innerHTML);
}

function getAmountMoves(){
  return (document.getElementById("movesLeftNum").innerHTML);
}

//</editor-fold>

//<editor-fold>------------------------------------------SETUP PUZZLE---------------------------------------

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
    text:`Welcome to the puzzle. ${brDesktop}Do you think you can win in 1 turn? ${brDesktop}Don't know the rules? <a href='/tutorial'>Click here for the 5 minute tutorial</a>.`,
    top:"50%",
    left:"50%",
    func: () => {
      //this step
      let enemyMeeple = document.getElementById("enemyMeeple");
      enemyMeeple.classList.remove("is-hidden");
      enemyMeeple.classList.add("is-active");
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
    text: `There is another player on the board. ${brDesktop}If you don't win in this turn, they will win on their next turn.`,
    top:"47%",
    left:"64%",
    func: () => {
      //this step
      puzzleFunctions.emphasizeElement("projectCard5", "id", true);   //also undos next step
      puzzleFunctions.emphasizeElement("enemyMeeple", "id", false);
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
      puzzleFunctions.emphasizeElement("perfReview", "id", true);   //also undos next step
    }
  },
  {
    text: `Good luck and have fun! ${brDesktop}If you need to learn the rules again, <a href='/tutorial'>click here for the tutorial</a>.`,
    top: "50%",
    left: "50%",
    func: () => {
      //this step
      puzzleFunctions.setupMobile(topText);
      puzzleFunctions.emphasizeAll();

      //undos next step(s)
      pausePuzzle();
    }
  },
  {
    text: `<p id='puzzleText'>What do you want to do?</p>
           <div class="puzzleButtonWrapper">
            <p id="moveButton" class="moveButton puzzleButton gamebutton noselect is-green">Move your Meeple</p>
            <p id="opButton" class="opButton puzzleButton gamebutton noselect is-yellow">Use an ${opCard}</p>
           </div>`,
    top: "50%",
    left: "50%",
    func: (bindKeyboard, cloneButton, steps, nextStep, specificReset) => {

      //only reset if we're using the reset button, prevents flashing of image files
      if (document.getElementById("puzzleWrapper").getAttribute("puzzle") === "started"){
        resetPuzzle();
      }

      //this step
      startPuzzle(bindKeyboard, cloneButton, steps, nextStep, specificReset);
      setupPuzzleHandlers();
    }
  }
];

const topText = `
  <h2 class="is-hidden-desktop">Win free shipping!</h2>
  <p>If you can solve the following puzzle, I will give you a coupon for free shipping for my board game.</p>
  <p>No strings attached. No signups. No tricks. Just a good ol' fashioned puzzle.</p>
  <p id="startText" class="is-hidden-mobile is-hidden-tablet-mobile">
    If you are on a computer, you can use the arrow keys to navigate.
  </p>
`;

//set OP cards to the 4 for the puzzle
function resetOPCards(){
  let puzzleStarted = document.getElementById("puzzleWrapper").getAttribute("puzzle") === "started";
  puzzleFunctions.setOPCard(0, 18, puzzleStarted);
  puzzleFunctions.setOPCard(1, 19, puzzleStarted);
  puzzleFunctions.setOPCard(2, 20, puzzleStarted);
  puzzleFunctions.setOPCard(3, 1, puzzleStarted);
  redrawAllOPCards();
}

//set the puzzle text
function setPuzzleText(text, reset){
  let puzzleText = document.getElementById("puzzleText");
  if (puzzleText) puzzleText.innerHTML = (reset) ? "What do you want to do?" : text;
}

//reset the puzzle
export function resetPuzzle(){

  //make OP cards
  resetOPCards();
  setPuzzleText("", true);

  //playerboard
  document.getElementById("movesLeftNum").innerHTML = 3;
  setCompanyInfluence(0);

  //make random project cards (how many i want, min image id#, max image id#)
  let randomProjects0 = puzzleFunctions.xRandomIntFromInterval(2, 1, 6);
  let randomProjects1 = puzzleFunctions.xRandomIntFromInterval(2, 7, 16);
  let randomProjects2 = puzzleFunctions.xRandomIntFromInterval(1, 17, 21);
  let randomProjects3 = puzzleFunctions.xRandomIntFromInterval(1, 22, 25);
  let projectCardsWrapper = document.getElementById("projectCardsWrapper");
  projectCardsWrapper.innerHTML = "";

  //top row
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(0, randomProjects1[0], puzzleFunctions.gridCoords[0][1].left, puzzleFunctions.gridCoords[0][1].top, 0, "one", 1, 0));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(1, randomProjects0[0], puzzleFunctions.gridCoords[0][2].left, puzzleFunctions.gridCoords[0][2].top, 0, "zero", 2, 0));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(2, randomProjects0[1], puzzleFunctions.gridCoords[0][3].left, puzzleFunctions.gridCoords[0][3].top, 180, "zero", 3, 0));

  //bot row
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(3, randomProjects2[0], puzzleFunctions.gridCoords[1][1].left, puzzleFunctions.gridCoords[1][1].top, 0, "two", 1, 1));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(4, randomProjects1[1], puzzleFunctions.gridCoords[1][2].left, puzzleFunctions.gridCoords[1][2].top, 90, "one", 2, 1));
  projectCardsWrapper.appendChild(puzzleFunctions.createProjectCard(5, randomProjects3[0], puzzleFunctions.gridCoords[1][3].left, puzzleFunctions.gridCoords[1][3].top, 270, "three", 3, 1));

  puzzleFunctions.emphasizeElement("projectCard", "class", false);

  //show meeple / boss / perf review
  puzzleFunctions.emphasizeElement("playerMeeple", "id", false);
  puzzleFunctions.emphasizeElement("redBoss", "id", false);
  puzzleFunctions.emphasizeElement("perfReview", "id", false);

  //card type for boss / perf review, player location ID of the card
  let redBoss = document.getElementById("redBoss");
  redBoss.setAttribute("cardType", "boss");
  redBoss.setAttribute("xCoord", 0);
  redBoss.setAttribute("yCoord", 1);
  redBoss.style.left = "0.5%";
  redBoss.style.top = "57%";

  let perfReview = document.getElementById("perfReview");
  perfReview.setAttribute("cardType", "boss");
  perfReview.setAttribute("xCoord", 4);
  perfReview.setAttribute("yCoord", 1);
  perfReview.style.left = "80.5%";
  perfReview.style.top = "57%";

  let playerMeeple = document.getElementById("playerMeeple");
  playerMeeple.setAttribute("location", "redBoss");
  playerMeeple.removeAttribute("style");

  let enemyMeeple = document.getElementById("enemyMeeple");
  enemyMeeple.setAttribute("location", "projectCard5");
  enemyMeeple.removeAttribute("style");

  //check for mobile sizing
  puzzleFunctions.setupMobile(topText);
  actionsTaken = [];
}

//start the step when start button is pressed, pass in cb for specific reset
export function setupPuzzle() {

  //make OP cards
  let opCardsWrapper = document.getElementById("opCardsWrapper");
  opCardsWrapper.innerHTML = "";
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 0));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 1));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 2));
  opCardsWrapper.appendChild(puzzleFunctions.createOPCard(0, 3));

  //scroll to middle so that it's obvious theres more on mobile
  opCardsWrapper.scrollLeft = (opCardsWrapper.scrollWidth - opCardsWrapper.offsetWidth) / 2;

  puzzleFunctions.start(steps, resetPuzzle, false, topText);
}

//game win!
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//-------------------------------HELLO MR LAZY DEVELOPER---------------------------------
//-------------------------------EMAIL ME AT 1MIN@UNICORNWITHWINGS>COM-------------------
//---------------------------------------------------------------------------------------
//-------------------------------THANK YOU-----------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function youWon(){
  puzzleFunctions.unhidePuzzleText();
  puzzleFunctions.deemphasizeAll();
  showUndoButton(true);

  //fill in the gameboard text
  let gameBoardText = document.getElementById("gameBoardText");
  gameBoardText.innerHTML = `<h1>🎉 You just won! 🎉</h1><p>Congratulations!!</p><p>As promised, here's the coupon for free shipping. 😊</p><p><span class='is-monospace is-bold'>IHATESHIPPING</span></p>`;
}

//can't move and can't use any OP
function checkForLoss(){
  if (!canUseOPCard() && !checkCanMove()){
    youLose();
  }
}

//check if you can use a OP card
function canUseOPCard(){
  let rotateNotUsed = document.getElementById("opCard0").getAttribute("used") != "true";
  let swapNotUsed = document.getElementById("opCard3").getAttribute("used") != "true";
  let standInNotUsed = document.getElementById("opCard1").getAttribute("used") != "true";
  let creditNotUsed = document.getElementById("opCard2").getAttribute("used") != "true";
  let numCards = getNumAvailOPCards();

  //if we have less or = to 1 influence but we dont have either green card
  let currentInfluence = getCompanyInfluence();
  let canUseOP = (currentInfluence > 0 && (rotateNotUsed || swapNotUsed)) || (currentInfluence >= 2 && (numCards > 2 || standInNotUsed) && creditNotUsed);

  return canUseOP;
}

//check if you can move
function checkCanMove(){
  let cardPlayerIsOn = document.getElementById(document.getElementById("playerMeeple").getAttribute("location"));
  let connectedCards = getConnectedCards(cardPlayerIsOn);
  let cantMove = getAmountMoves() <= 0 || connectedCards.length === 0;
  return !cantMove;
}

//loser
function youLose(){
  puzzleFunctions.unhidePuzzleText();
  puzzleFunctions.deemphasizeAll();
  showUndoButton(true);

  //fill in the gameboard text
  let gameBoardText = document.getElementById("gameBoardText");
  gameBoardText.innerHTML = `<h1>☠️ Uh oh! ☠️</h1><p>You cannot do anything else!</p><p>Click the blue button to restart the puzzle!</p>`;
}

//</editor-fold>

//<editor-fold>------------------------------------------RUN PUZZLE---------------------------------------

//remove all puzzle event handlers
function pausePuzzle(){
  let prevButton = document.getElementById("gameBoardTextPrevButton");
  prevButton.classList.remove("is-hidden");

  let nextButton = document.getElementById("gameBoardTextNextButton");
  nextButton.classList.remove("is-hidden");

  let hideButton = document.getElementById("gameBoardTextHideButton");
  hideButton.classList.add("is-hidden");

  let resetButton = document.getElementById("gameBoardTextResetButton");
  resetButton.classList.add("is-hidden");

  document.getElementById("gameBoardTextButtonWrapper").style = null;

  document.getElementById("puzzleWrapper").setAttribute("puzzle", "notStarted");
}

//start the actual clickable puzzle
function startPuzzle(bindKeyboard, cloneButton, steps, nextStep, specificReset){
  let prevButton = document.getElementById("gameBoardTextPrevButton");
  prevButton.classList.add("is-hidden");

  let nextButton = document.getElementById("gameBoardTextNextButton");
  nextButton.classList.add("is-hidden");

  document.getElementById("puzzleWrapper").setAttribute("puzzle", "started");

  //cancel keyboard listener
  bindKeyboard.cancel("keyboardListener");

  //hide start text if it exists
  let startText = document.getElementById("startText");
  if (startText) startText.classList.add("is-hidden");

  //hide button if on desktop
  let hideButton = document.getElementById("gameBoardTextHideButton");
  let hideButtonClone = hideButton.cloneNode(true);
  hideButton.parentNode.replaceChild(hideButtonClone, hideButton);
  hideButtonClone.addEventListener("click", puzzleFunctions.hidePuzzleText);

  //hide the button if mobile
  if (document.getElementById("topTextWrapper").getAttribute("viewType") != "desktop"){
    hideButton.classList.add('is-hidden');
  }

  //puzzle reset button, sends back to last step
  let resetButton = document.getElementById("gameBoardTextResetButton");
  resetButton = cloneButton(resetButton, steps, steps.length - 1, specificReset, false, bindKeyboard);
}

//set up the clickable buttons in puzzle steps
function setupPuzzleHandlers(){

  showCancelButton(false); //hide cancel button
  setPuzzleText("", true);

  //setup the two main buttons
  setupMoveButton();
  setupOPButton();

  checkForLoss();
}

//cancel the choice of move / OP card
function cancelChoice(){

  //set up the clickable buttons in puzzle steps
  setupPuzzleHandlers();
  setPuzzleText("", true);

  //project card related stuff
  unhighlightConnectedCards();

  //payment related event handling
  paymentEls.removeEls();
  paymentEls.undoPayment();
  paymentEls.els = [];

  //remove any OP related buttons
  cancelRumor();   //removes all shit from rumor OP
  cancelBelittle();   //removes all shit from swap OP
  cancelStealCredit();    //removes shit from steal credit OP

  //hide cancel button
  showCancelButton(false);
  showUndoButton();
}

//set up move button if we have moves left
function setupMoveButton(){
  let moveButton = document.getElementById("moveButton");
  if (checkCanMove()){
    moveButton.addEventListener("click", clickedMoveButton);
    moveButton.classList.remove("disabled");
  }
  else {
    moveButton.removeEventListener("click", clickedMoveButton);
    moveButton.classList.add("disabled");
  }
}

//set up office politics button if we have company influence
function setupOPButton(){
  let opButton = document.getElementById("opButton");
  if (canUseOPCard()){
    opButton.addEventListener("click", clickedOPButton);
    opButton.classList.remove("disabled");
  }
  else {
    opButton.removeEventListener("click", clickedOPButton);
    opButton.classList.add("disabled");
  }
}

//show the cancel button
function showCancelButton(show){
  let cancelButton = document.getElementById("gameBoardTextCancelButton");
  let undoButton = document.getElementById("gameBoardTextUndoButton");
  showUndoButton();

  //showing cancel so hide undo
  if (show){
    showUndoButton(true);
    cancelButton.classList.remove("is-hidden");
    cancelButton.addEventListener("click", cancelChoice);
  }
  //hiding cancel so show undo
  else {
    cancelButton.classList.add("is-hidden");
    cancelButton.removeEventListener("click", cancelChoice);
  }

}

//show the undo button
function showUndoButton(forceHide){
  let undoButton = document.getElementById("gameBoardTextUndoButton");

  //if being forced to hide or if there are no undoable actions
  if (forceHide || actionsTaken.length <= 0){
    undoButton.classList.add("is-hidden");
    undoButton.removeEventListener("click", undoLastChoice);
  }
  //show undo if there are any actions that have been taken
  else {
    undoButton.classList.remove("is-hidden");
    undoButton.addEventListener("click", undoLastChoice);
  }
}

//undos the last action taken
let actionsTaken = [];
function undoLastChoice() {
  if (actionsTaken.length > 0){
    let lastAction = actionsTaken[actionsTaken.length - 1];
    if (lastAction && lastAction.undo) {
      lastAction.undo();
      actionsTaken.pop();
      setupPuzzleHandlers();
    }
  }
}

//</editor-fold>

//<editor-fold>------------------------------------------SQUARE CARD MOVEMENT---------------------------------------

//move meeple handler, remove after clicking
function clickedMoveButton(e){

  //set puzzle text
  setPuzzleText(`Select a card to move to.`);
  if (document.getElementById("topTextWrapper").getAttribute("viewType") === "desktop") puzzleFunctions.hidePuzzleText();

  //remove the event listener during the move
  let moveButton = document.getElementById("moveButton");
  moveButton.removeEventListener("click", clickedMoveButton);
  moveButton.classList.add("disabled");

  //hide the use OP card buttons
  document.getElementById("effectButtonsWrapper").classList.add("is-hidden");

  //prevent clicking OP button
  let opButton = document.getElementById("opButton");
  opButton.removeEventListener("click", clickedOPButton);
  opButton.classList.add("disabled");

  let playerMeeple = document.getElementById("playerMeeple");
  let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));

  showCancelButton(true);

  //highlight connected cards
  highlightConnectedCards(cardPlayerIsOn);
}

//emphasize every square card, remove event listener
let undoArray = [];   //used to keep track of the event listeners and cards
let unhighlightConnectedCards = () => {
  for (let k = 0; k < undoArray.length; k++){
    if (undoArray[k].card && undoArray[k].el){
      undoArray[k].card.removeEventListener("click", undoArray[k].el);
      undoArray[k].card.style.cursor = "default";
    }
  }

  puzzleFunctions.emphasizeAll();
  undoArray = [];
}

//returns list of all connected (by both ends) cards
function getConnectedCards(card){
  let adjacentCards = getConnectableCards(card);

  //check to see if the adjacent are connected by sticky notes
  let connectedCards = [];
  for (let i = 0; i < adjacentCards.length; i++){
    let nestedAdjacentCards = getConnectableCards(adjacentCards[i]);

    //if that card is also connected by sticky notes
    if (nestedAdjacentCards.includes(card)){
      connectedCards.push(adjacentCards[i]);
    }
  }

  return connectedCards;
}

//function to highlight all connected cards
function highlightConnectedCards(cardPlayerIsOn){

  //check to see if the adjacent are connected by sticky notes
  let connectedCards = getConnectedCards(cardPlayerIsOn);

  //dehighlight everything except current card and player
  puzzleFunctions.emphasizeElement(cardPlayerIsOn.id, "id", true);
  puzzleFunctions.emphasizeElement("playerMeeple", "id", false);

  //highlight connected cards and add move event listeners
  for (let j = 0; j < connectedCards.length; j++){

    //event listener to call when project call is clicked on
    let eventListener = (e) => {
      clickToMove(connectedCards[j]);
    }
    undoArray.push({
      card: connectedCards[j],
      el: eventListener
    });

    //highlight the card, add cursor click
    puzzleFunctions.emphasizeElement(connectedCards[j].id, "id", false);
    connectedCards[j].addEventListener("click", eventListener);
    connectedCards[j].style.cursor = "pointer";
  }
}

//click a square card to move to it
function clickToMove(cardToMoveTo, undo, oldInf){
  let playerMeeple = document.getElementById("playerMeeple");
  let oldPlayerMeeple = playerMeeple.cloneNode(true);

  moveMeeple(playerMeeple, cardToMoveTo);

  //moves left (reverse if undo-ing)
  let movesLeft = parseInt(document.getElementById("movesLeftNum").innerHTML);
  document.getElementById("movesLeftNum").innerHTML = (undo) ? movesLeft + 1 : movesLeft - 1;

  let influence = getCompanyInfluence();  //for undo
  let influenceFromCard = parseInt(cardToMoveTo.getAttribute("influence")) || 0;

  //undoing move
  if (oldInf){
    setCompanyInfluence(oldInf);
  }
  else {
    addCompanyInfluence(influenceFromCard);
  }

  if (!undo){

    //if not undo-ing add to list of actions taken
    actionsTaken.push({
      type: "move",
      undo: ()=>{
        clickToMove(document.getElementById(oldPlayerMeeple.getAttribute("location")), true, influence)
      }
    });

    //finished moving, reset the board
    unhighlightConnectedCards();
    puzzleFunctions.emphasizeAll();
    puzzleFunctions.unhidePuzzleText();
    setupPuzzleHandlers();

    //win!
    if (cardToMoveTo.id === "perfReview"){
      youWon();
    }
  }

}

//move a meeple piece to a card
function moveMeeple(meepleToMove, cardToMoveTo){

  meepleToMove.setAttribute("location", cardToMoveTo.id);   //attributes

  //visual movement
  let newLeft = parseFloat(cardToMoveTo.style.left) || 0;
  meepleToMove.style.left = `${newLeft + 10.0}%`;
  meepleToMove.style.top = `${parseFloat(cardToMoveTo.style.top) - 6.0}%`;
}

//get a card at a specific coordinate
function getCardAtXY(xCoord, yCoord){
  let allSquareCards = document.getElementsByClassName("squareCard");
  let card = false;
  for (let i = 0; i < allSquareCards.length; i++){
    let currentX = parseInt(allSquareCards[i].getAttribute("xCoord"));
    let currentY = parseInt(allSquareCards[i].getAttribute("yCoord"));
    if (currentX === xCoord && currentY === yCoord){
      card = allSquareCards[i];
      break;
    }
  }
  return card;
}

//get all connectable cards to the passed card
function getConnectableCards(currentCard, forceBoss){
  let currentX = currentCard.getAttribute("xCoord");
  let currentY = currentCard.getAttribute("yCoord");
  let currentType = currentCard.getAttribute("cardType");
  let currentRotation = currentCard.getAttribute("rotation") || 0;

  let coordsToCheck = [];
  if (forceBoss || currentType === "boss"){
    coordsToCheck = checkBossSurroundings(currentX, currentY);
  }
  else {
    switch (currentType) {
      case "zero":
        coordsToCheck = checkZeroSurroundings(currentX, currentY, currentRotation);
        break;
      case "one":
        coordsToCheck = checkOneSurroundings(currentX, currentY, currentRotation);
        break;
      case "two":
        coordsToCheck = checkTwoSurroundings(currentX, currentY, currentRotation);
        break;
      case "three":
        coordsToCheck = checkThreeSurroundings(currentX, currentY, currentRotation);
        break;
    }
  }

  //check through the coordinates to see if cards exist
  let adjacentCards = [];
  for (let i = 0; i < coordsToCheck.length; i++){
    let currentCard = getCardAtXY(coordsToCheck[i].xCoord, coordsToCheck[i].yCoord);
    if (currentCard){
      adjacentCards.push(currentCard);
    }
  }

  return adjacentCards;
}

//reset all cursors on project cards
function resetSquareCardCursors(){
  let squareCards = document.getElementsByClassName("squareCard");
  for (let x = 0; x < squareCards.length; x++){
    squareCards[x].style.cursor = "default"
  }
}

//<editor-fold>------------------------------------------SQUARE CARD HELPERS---------------------------------------

//functions to check the surrounding coordinates
function checkLeft(xCoord, yCoord){
  if (xCoord > 0){
    return {
      xCoord: xCoord - 1,
      yCoord: yCoord
    }
  }
}
function checkRight(xCoord, yCoord){
  if (xCoord < 4){
    return {
      xCoord: xCoord + 1,
      yCoord: yCoord
    }
  }
}
function checkTop(xCoord, yCoord){
  if (yCoord > 0){
    return {
      xCoord: xCoord,
      yCoord: yCoord - 1
    }
  }
}
function checkBot(xCoord, yCoord){
  if (yCoord < 1){
    return {
      xCoord: xCoord,
      yCoord: yCoord + 1
    }
  }
}
function checkTopLeft(xCoord, yCoord){
  if (xCoord > 0 && yCoord > 0){
    return {
      xCoord: xCoord - 1,
      yCoord: yCoord - 1
    }
  }
}
function checkTopRight(xCoord, yCoord){
  if (xCoord < 4 && yCoord > 0){
    return {
      xCoord: xCoord + 1,
      yCoord: yCoord - 1
    }
  }
}
function checkBotLeft(xCoord, yCoord){
  if (xCoord > 0 && yCoord < 1){
    return {
      xCoord: xCoord - 1,
      yCoord: yCoord + 1
    }
  }
}
function checkBotRight(xCoord, yCoord){
  if (xCoord < 4 && yCoord < 1){
    return {
      xCoord: xCoord + 1,
      yCoord: yCoord + 1
    }
  }
}

//check for boss surroundings
function checkBossSurroundings(xC, yC){
  let cards = [];
  let xCoord = parseInt(xC);
  let yCoord = parseInt(yC);
  cards.push(checkLeft(xCoord, yCoord));
  cards.push(checkRight(xCoord, yCoord));
  cards.push(checkTop(xCoord, yCoord));
  cards.push(checkBot(xCoord, yCoord));
  cards.push(checkTopLeft(xCoord, yCoord));
  cards.push(checkTopRight(xCoord, yCoord));
  cards.push(checkBotLeft(xCoord, yCoord));
  cards.push(checkBotRight(xCoord, yCoord));
  return cards.filter(function( element ) {
     return element !== undefined;
  });
}

//check for zero surroundings depending on rotation
function checkZeroSurroundings(xC, yC, currentRotation){
  let cards = [];
  let xCoord = parseInt(xC);
  let yCoord = parseInt(yC);

  let rotations = parseInt(currentRotation) % 360;
  switch (rotations) {
    case 90: //rotated clockwise 90deg
    case -270:
      cards.push(checkTop(xCoord, yCoord));
      cards.push(checkTopLeft(xCoord, yCoord));
      cards.push(checkLeft(xCoord, yCoord));
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      break;
    case 180: //rotated clockwise 180deg
    case -180:
      cards.push(checkLeft(xCoord, yCoord));
      cards.push(checkTopLeft(xCoord, yCoord));
      cards.push(checkTop(xCoord, yCoord));
      cards.push(checkTopRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      break;
    case 270: //rotated clockwise 270deg
    case -90:
      cards.push(checkTop(xCoord, yCoord));
      cards.push(checkTopRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      cards.push(checkBotRight(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      break;
    case 0: //no rotation
      cards.push(checkLeft(xCoord, yCoord));
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      cards.push(checkBotRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      break;
  }
  return cards.filter(function( element ) {
     return element !== undefined;
  });
}

//check for one surroundings depending on rotation
function checkOneSurroundings(xC, yC, currentRotation){
  let cards = [];
  let xCoord = parseInt(xC);
  let yCoord = parseInt(yC);

  let rotations = parseInt(currentRotation) % 360;
  switch (rotations) {
    case 90: //rotated clockwise 90deg
    case -270:
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkLeft(xCoord, yCoord));
      cards.push(checkTopLeft(xCoord, yCoord));
      break;
    case 180: //rotated clockwise 180deg
    case -180:
      cards.push(checkTopLeft(xCoord, yCoord));
      cards.push(checkTop(xCoord, yCoord));
      cards.push(checkTopRight(xCoord, yCoord));
      break;
    case 270: //rotated clockwise 270deg
    case -90:
      cards.push(checkTopRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      cards.push(checkBotRight(xCoord, yCoord));
      break;
    case 0: //no rotation
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      cards.push(checkBotRight(xCoord, yCoord));
      break;
  }
  return cards.filter(function( element ) {
     return element !== undefined;
  });
}

//check for two surroundings depending on rotation
function checkTwoSurroundings(xC, yC, currentRotation){
  let cards = [];
  let xCoord = parseInt(xC);
  let yCoord = parseInt(yC);

  let rotations = parseInt(currentRotation) % 360;
  switch (rotations) {
    case 90: //rotated clockwise 90deg
    case -270:
      cards.push(checkTop(xCoord, yCoord));
      cards.push(checkTopLeft(xCoord, yCoord));
      cards.push(checkLeft(xCoord, yCoord));
      break;
    case 180: //rotated clockwise 180deg
    case -180:
      cards.push(checkRight(xCoord, yCoord));
      cards.push(checkTopRight(xCoord, yCoord));
      cards.push(checkTop(xCoord, yCoord));
      break;
    case 270: //rotated clockwise 270deg
    case -90:
      cards.push(checkBot(xCoord, yCoord));
      cards.push(checkBotRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      break;
    case 0: //no rotation
      cards.push(checkLeft(xCoord, yCoord));
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      break;
  }
  return cards.filter(function( element ) {
     return element !== undefined;
  });
}

//check for three surroundings depending on rotation
function checkThreeSurroundings(xC, yC, currentRotation){
  let cards = [];
  let xCoord = parseInt(xC);
  let yCoord = parseInt(yC);

  let rotations = parseInt(currentRotation) % 360;
  switch (rotations) {
    case 90: //rotated clockwise 90deg
    case -270:
      cards.push(checkTopLeft(xCoord, yCoord));
      cards.push(checkLeft(xCoord, yCoord));
      break;
    case 180: //rotated clockwise 180deg
    case -180:
      cards.push(checkTopRight(xCoord, yCoord));
      cards.push(checkTop(xCoord, yCoord));
      break;
    case 270: //rotated clockwise 270deg
    case -90:
      cards.push(checkBotRight(xCoord, yCoord));
      cards.push(checkRight(xCoord, yCoord));
      break;
    case 0: //no rotation
      cards.push(checkBotLeft(xCoord, yCoord));
      cards.push(checkBot(xCoord, yCoord));
      break;
  }
  return cards.filter(function( element ) {
     return element !== undefined;
  });
}

//</editor-fold>

//</editor-fold>

//<editor-fold>------------------------------------------OP CARDS---------------------------------------

  //<editor-fold>------------------------------------------GENERAL---------------------------------------

  //clicked to use an op card
  function clickedOPButton(e){

    //set the puzzle text
    setPuzzleText(`Select an ${opCard} to use.`);
    if (document.getElementById("topTextWrapper").getAttribute("viewType") === "desktop") puzzleFunctions.hidePuzzleText();

    //remove event listener during OP selection
    let opButton = document.getElementById("opButton");
    opButton.removeEventListener("click", clickedOPButton);
    opButton.classList.add("disabled");

    //slowly scroll to the playerboard if mobile
    mobileScrollToElem("playerBoard");

    //unhide the use OP card buttons
    document.getElementById("effectButtonsWrapper").classList.remove("is-hidden");

    //prevent clicking move button
    let moveButton = document.getElementById("moveButton");
    moveButton.removeEventListener("click", clickedMoveButton);
    moveButton.classList.add("disabled");

    showCancelButton(true);

    //highlight the OP cards that can be used
    highlightUsableOPCards();
  }

  //function to highlight usable OP cards
  function highlightUsableOPCards(){
    puzzleFunctions.deemphasizeAll();

    //available cards
    let spreadARumorCard = document.getElementById("opCard0");
    let standInForSomeoneCard = document.getElementById("opCard1");
    let stealTheCreditCard = document.getElementById("opCard2");
    let belittleTheCompetitionCard = document.getElementById("opCard3");

    //disable all cards
    disableAllOPCards();

    //highlight only the cards that are playable
    let influence = getCompanyInfluence();
    if (influence >= 1){
      highlightOPCardForPuzzle(spreadARumorCard);
      highlightOPCardForPuzzle(belittleTheCompetitionCard);
    }

    //enough cards to pay for steal the credit
    if (influence >= 2 && checkIfEnemyIsNextToMe() && (standInForSomeoneCard.getAttribute("used") != "true" || (belittleTheCompetitionCard.getAttribute("used") != "true" && spreadARumorCard.getAttribute("used") != "true"))){
      highlightOPCardForPuzzle(stealTheCreditCard);
    }
  }

  //function to dehighlight, emphasize, and disable all OP cards
  function disableAllOPCards(exceptCard){
    let opCards = document.getElementsByClassName("opCard");
    for (let x = 0; x < opCards.length; x++){
      if (opCards[x] != exceptCard){
        //by default undetailable and unusable and disabled
        opCards[x].setAttribute("detailable", "false");
        opCards[x].setAttribute("usable", "false");
        opCards[x].classList.add("disabled", "deemphasized");
        opCards[x].style.top = "";

        //attach the event handler
        if (opCards[x].getAttribute("listener") != "true"){
          opCards[x].addEventListener("click", ()=>{
            clickedOPCardToUse(opCards[x]);
          });
        }
      }
    }
  }

  //highlight a specific OP card
  function highlightOPCardForPuzzle(opCard){
    puzzleFunctions.highlightOpCard(getOPCardIndex(opCard), true);
    opCard.setAttribute("detailable", "true");
    opCard.setAttribute("usable", "true");
    opCard.classList.remove("disabled");
  }

  //get the number of unused cards
  function getNumAvailOPCards(){
    let num = 0;
    let availOPCards = document.getElementsByClassName("opCard");
    for (let x = 0; x < availOPCards.length; x++){
      if (availOPCards[x].getAttribute("used") != "true"){
        if (availOPCards[x].id === "opCard1"){
          num += 2;
        }
        else {
          num++;
        }
      }
    }
    return num;
  }

  //click on a OP card. show effects that can be used
  function clickedOPCardToUse(opCard){

    //effect buttons
    let effectButton0 = document.getElementById("effectButton0");
    let effectButton1 = document.getElementById("effectButton1");

    //reset styles for buttons
    effectButton0.classList.add("is-hidden");
    effectButton1.classList.add("is-hidden");

    //only do the rest if it's a usable card (aka not in the middle of choose a card for payment)
    if (opCard.getAttribute("usable") === "true"){
      effectButton0.style.top = "";
      effectButton1.style.top = "";

      opCard.setAttribute("listener", "true");

      let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));
      let playerOnProject = cardPlayerIsOn.classList.contains("projectCard");

      //remove event listeners
      let clone0 = effectButton0.cloneNode(true);
      let clone1 = effectButton1.cloneNode(true);
      effectButton0.parentNode.replaceChild(clone0, effectButton0);
      effectButton1.parentNode.replaceChild(clone1, effectButton1);
      effectButton0 = clone0;
      effectButton1 = clone1;

      //only show effect buttons if we have enough influence + cards
      let influence = getCompanyInfluence();
      let numCards = getNumAvailOPCards();
      let standInForSomeone = document.getElementById("opCard1").getAttribute("used") != "true";

      switch (opCard.id){
        //spread a rumor
        case "opCard0":
          if (influence >= 1){
            effectButton0.classList.remove("is-hidden");
            effectButton0.addEventListener("click", ()=>{choseSpreadARumor(false, opCard)});

            //addon only if 2+ and player is on a project card
            if (numCards > 1 && playerOnProject){
              effectButton1.style.top = "81%";
              effectButton1.classList.remove("is-hidden");
              effectButton1.addEventListener("click", ()=>{choseSpreadARumor(true, opCard)});
            }
          }
          break;
        //stand in for someone always
        case "opCard1":
          break;
        //steal the credit only if 2+ influence and 3+ cards or stand in
        case "opCard2":
          if (influence >= 2 && (numCards > 3 || standInForSomeone) && checkIfEnemyIsNextToMe()){
            effectButton0.style.top = "71.5%";
            effectButton0.classList.remove("is-hidden");
            effectButton0.addEventListener("click", ()=>{choseStealTheCredit(opCard)});
          }
          break;
        //belittle the competition
        case "opCard3":
          if (influence >= 1){
            effectButton0.style.top = "69.5%";
            effectButton0.classList.remove("is-hidden");
            effectButton0.addEventListener("click", ()=>{choseBelittleTheCompetition(false, opCard)});

            //addon only if 3+ or if stand in exists and if player is on a project card
            if ((numCards > 2 || standInForSomeone) && playerOnProject){
              effectButton1.style.top = "85%";
              effectButton1.classList.remove("is-hidden");
              effectButton1.addEventListener("click", ()=>{choseBelittleTheCompetition(true, opCard)});
            }
          }
          break;
      }
    }
  }

  //object to hold cb to remove all event listeners / cb to redraw any paid
  let paymentEls = {
    els: [],
    removeEls: () => {
      for (let x = 0; x < paymentEls.els.length; x++){
        paymentEls.els[x].card.removeEventListener("click", paymentEls.els[x].el);
      }
    },
    undoPayment: () =>{
      for (let y = 0; y < paymentEls.els.length; y++){
        redrawOPCard(paymentEls.els[y].card);
      }
    }
  };
  //choose a card for payment for OP
  function chooseCardForPayment(exceptCard, costInCards, cb){

    //remove detailed view of OP card
    puzzleFunctions.removeAllOpCardFixed();
    puzzleFunctions.unhighlightAllOPCards();
    exceptCard.classList.add("deemphasized");
    exceptCard.setAttribute("usable", "false");

    //puzzle text
    if (costInCards > 1){
      setPuzzleText(`Choose other ${opCards} to use as payment for this card.`);
    }
    else {
      setPuzzleText(`Choose a ${opCard} to use as payment for this card.`);
    }

    //highlight everything except the exceptCard
    let cardsBeingPaid = document.getElementsByClassName("opCard");
    let cardsPaidAmount = 0;
    let cardsPaid = [];

    for (let x = 0; x < cardsBeingPaid.length; x++){
      if (cardsBeingPaid[x] != exceptCard) {
        highlightOPCardForPuzzle(cardsBeingPaid[x]);
        cardsBeingPaid[x].setAttribute("detailable", "false");   //prevent clicking for detailed view

        //choose card to pay, it hides
        //remove event listener as soon as we submit
        let el = () => {
          cardsPaidAmount += discardOPCard(cardsBeingPaid[x]);
          cardsPaid.push(cardsBeingPaid[x]);

          //all cards paid, activate the effect
          if (cardsPaidAmount >= costInCards) {
            paymentEls.removeEls();
            cb(cardsBeingPaid[x], cardsPaid);
          };
        }
        cardsBeingPaid[x].addEventListener("click", el);

        //add to array of els so we can remove all later
        paymentEls.els.push({
          card: cardsBeingPaid[x],
          el: el
        });
      }
    }
  }

  //hide this card and mark it as used
  function discardOPCard(clickedCard){
    let clickedCardIDIndex = getOPCardIndex(clickedCard);
    puzzleFunctions.hideOrShowOpCard(clickedCardIDIndex, true);

    //so it scrolls out of view not just disappears
    setTimeout(()=>{
      clickedCard.classList.add("is-hidden");
    }, 250);

    clickedCard.setAttribute("used", "true");
    return (clickedCardIDIndex === 1) ? 2 : 1;    //yellow card worth 2
  }

  //undo discard of a card
  function redrawOPCard(paidCard){
    let paidCardIDIndex = getOPCardIndex(paidCard);
    paidCard.classList.remove("is-hidden");
    puzzleFunctions.hideOrShowOpCard(paidCardIDIndex, false);
    paidCard.setAttribute("used", "false");
  }

  //undo discard of all cards
  function redrawAllOPCards(){
    let opCards = document.getElementsByClassName("opCard");
    for (let x = 0; x < opCards.length; x++){
      redrawOPCard(opCards[x]);
    }
  }

  //get the ID index of a OP card
  function getOPCardIndex(opCard){
    return parseInt(opCard.id.charAt(opCard.id.length - 1));
  }

  //</editor-fold>

  //<editor-fold>------------------------------------------SPREAD A RUMOR---------------------------------------

  //object to hold cb to remove all event listeners / cb to redraw any paid
  let rotateEls = {
    els: [],
    removeEls: (els) => {
      for (let x = 0; x < els.length; x++){
        els[x].card.removeEventListener("click", els[x].el);
      }
    },
    chosenCard: false,
  };

  //chose to use spread a rumor
  function choseSpreadARumor(addon, opCard){

    //hide detailed view, deemphasize everything
    puzzleFunctions.removeAllOpCardFixed();
    puzzleFunctions.deemphasizeAll();

    let playerMeeple = document.getElementById("playerMeeple");
    let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));

    //function to activate spread a rumor
    let activateCardEffect = (exceptCard, cardsPaid) => {

      //get all rotateable cards to the current card (depending on addon or not)
      let rotateableCards = (addon) ? [cardPlayerIsOn] : getConnectableCards(cardPlayerIsOn, true);

      //if project card, show buttons to rotate / finish
      for (let x = 0; x < rotateableCards.length; x++){
        if (rotateableCards[x].classList.contains("projectCard")){
          puzzleFunctions.emphasizeElement(rotateableCards[x].id, "id", false);
          rotateableCards[x].style.cursor = "pointer";

          //event listener for project card
          let el = () => {
            spawnRotateButtons(rotateableCards[x], addon, opCard, cardsPaid);
          }

          rotateEls.els.push({
            card: rotateableCards[x],
            el: el
          });

          rotateableCards[x].addEventListener("click", el)
        }
      }

      //slowly scroll to the playerboard if mobile
      mobileScrollToElem("puzzleText");
      setPuzzleText(`Select a ${projectCard} to rotate.`);

      //disable all other OP cards
      disableAllOPCards(exceptCard);
      highlightOPCardForPuzzle(opCard);
      opCard.setAttribute("usable", "false");   //but keep this card unusable so we dont get double usage after cancel button
    }

    //choose a card to use as payment
    if (addon) {
      chooseCardForPayment(opCard, 1, activateCardEffect);
    }
    //no card payment required, just activate
    else {
      activateCardEffect();
    }
  }

  //create buttons to rotate the card
  function spawnRotateButtons(cardToRotate, addon, opCard, cardsPaid){
    rotateEls.removeEls(rotateEls.els);
    resetSquareCardCursors();

    //emphasize the cart rotating
    puzzleFunctions.emphasizeElement(cardToRotate.id, "id", true);
    puzzleFunctions.emphasizeElement(opCard.id, "id", false);

    //increase z-index for now
    cardToRotate.style.zIndex = 10;

    //generate the buttons / wrapper
    let buttonsWrapper = document.createElement("div");
    buttonsWrapper.id = `${cardToRotate.id}RotateButtonsWrapper`;
    buttonsWrapper.classList.add("rotateButtonsWrapper", "noselect");

    let antiRotation = -parseInt(cardToRotate.getAttribute("rotation"));
    buttonsWrapper.setAttribute("rotation", antiRotation);
    buttonsWrapper.style.transform = `rotate(${antiRotation}deg)`;

    let clockwiseButton = document.createElement("div");
    clockwiseButton.classList.add("rotateButton", "cw", "is-blue");
    let ccwButton = document.createElement("div");
    ccwButton.classList.add("rotateButton", "ccw", "is-blue");
    clockwiseButton.innerHTML = ccwButton.innerHTML = "⟲";

    let finishedButton = document.createElement("div");
    finishedButton.classList.add("finishedButton", "is-green", "disabled");
    finishedButton.innerHTML = "✓";

    //attach to wrapper
    buttonsWrapper.appendChild(ccwButton);
    buttonsWrapper.appendChild(finishedButton);
    buttonsWrapper.appendChild(clockwiseButton);
    cardToRotate.appendChild(buttonsWrapper);

    //clockwise rotation if not disabled
    clockwiseButton.addEventListener("click", ()=>{
      if (!cardToRotate.querySelector(".rotateButtonsWrapper").classList.contains("disabled")){
        rotateACard(cardToRotate, true);
      }
    });

    //counter clockwise rotation if not disabled
    ccwButton.addEventListener("click", ()=>{
      if (!cardToRotate.querySelector(".rotateButtonsWrapper").classList.contains("disabled")){
        rotateACard(cardToRotate, false);
      }
    });

    //finished, set new original rotation if not disabled
    finishedButton.addEventListener("click", ()=>{
      if (!cardToRotate.querySelector(".rotateButtonsWrapper").classList.contains("disabled")){
        confirmRotation(cardToRotate, addon, opCard, cardsPaid);
      }
    });
  }

  //rotate a card cw or ccw
  function rotateACard(cardToRotate, clockwise){

    //rotate the card
    let originalRotation = parseInt(cardToRotate.getAttribute("originalRotation"));
    let currentRotation = parseInt(cardToRotate.getAttribute("rotation"));
    currentRotation += (clockwise) ? 90 : -90;
    cardToRotate.setAttribute("rotation", currentRotation);
    cardToRotate.style.transform = `rotate(${currentRotation}deg)`;

    //counter rotate the buttons if not undoing
    let buttonsWrapper = cardToRotate.querySelector(".rotateButtonsWrapper");
    let wrapperRotation = parseInt(buttonsWrapper.getAttribute("rotation"));
    wrapperRotation += (!clockwise) ? 90 : -90;
    buttonsWrapper.setAttribute("rotation", wrapperRotation);
    buttonsWrapper.style.transform = `rotate(${wrapperRotation}deg)`

    rotateEls.chosenCard = cardToRotate;

    //returned to original rotation (aka did not rotate this card)
    if (Math.abs(currentRotation % 360) === Math.abs(originalRotation % 360)){
      enableButtonsWrappers(true, buttonsWrapper);
    }
    //rotated this card, so disable others
    else {
      enableButtonsWrappers(false, buttonsWrapper);
    }
  }

  //set a specific rotation
  function setRotation(cardToRotate, rotation){
    cardToRotate.setAttribute("rotation", rotation);
    cardToRotate.setAttribute("originalRotation", rotation);
    cardToRotate.style.transform = `rotate(${rotation}deg)`;
  }

  //confirmed the rotate
  function confirmRotation(cardToRotate, addon, opCard, cardsPaid){

    //for undo, calculate a originalRotation to avoid super spins
    let originalRotation = getSpinnyOldRotate(cardToRotate);

    cardToRotate.setAttribute("originalRotation", cardToRotate.getAttribute("rotation"));
    removeElementsByClass("rotateButtonsWrapper");
    addCompanyInfluence(-1);

    //add to list of actions taken
    //undoes rotation
    actionsTaken.push({
      type: "op",
      undo: ()=>{

        //any cards paid? redraw them
        if (cardsPaid){
          for (let x = 0; x < cardsPaid.length; x++){
            redrawOPCard(cardsPaid[x]);
          }
        }

        //undo the rotation
        setRotation(cardToRotate, originalRotation);
        addCompanyInfluence(1);
        redrawOPCard(opCard);
      }
    });

    rotateEls.removeEls(rotateEls.els);
    rotateEls.chosenCard = false;

    discardOPCard(opCard);
    puzzleFunctions.unhighlightAllOPCards();
    puzzleFunctions.emphasizeAll();
    puzzleFunctions.unhidePuzzleText();
    setupPuzzleHandlers();
  }

  //function to disable or enable buttons for rotate
  function enableButtonsWrappers(enable, clickedButton){
    let buttonsWrappers = document.getElementsByClassName("rotateButtonsWrapper");
    for (let x = 0; x < buttonsWrappers.length; x++){

      //enable or disable other buttons
      if (enable){
        buttonsWrappers[x].classList.remove("disabled");
      }
      else {
        buttonsWrappers[x].classList.add("disabled");
      }

      //disable finish button
      buttonsWrappers[x].querySelector(".finishedButton").classList.add("disabled");
    }

    //showing the current button if disabling others
    if (!enable){
      clickedButton.classList.remove("disabled");
      clickedButton.parentNode.querySelector(".finishedButton").classList.remove("disabled");
    }
  }

  //for undo and cancel, calculate a originalRotation to avoid super spins
  function getSpinnyOldRotate(cardToRotate){
    let originalRotation = parseInt(cardToRotate.getAttribute("originalRotation"));
    let rotation = parseInt(cardToRotate.getAttribute("rotation"));
    let numRots = Math.floor(Math.abs(rotation / 360));
    let negOrPos = parseInt(rotation) > 0 ? 1 : -1;
    originalRotation = originalRotation + (360 * numRots * negOrPos);
    return originalRotation;
  }

  //cancel all spread rumor related stuff
  function cancelRumor(){
    puzzleFunctions.unhighlightAllOPCards();
    removeElementsByClass("rotateButtonsWrapper");
    resetSquareCardCursors();

    //remove all event handlers
    rotateEls.removeEls(rotateEls.els);
    rotateEls.els = new Array();

    //undo rotations and zIndex
    if (rotateEls.chosenCard){
      if (rotateEls.chosenCard.getAttribute("rotation") != rotateEls.chosenCard.getAttribute("originalRotation")){
        setRotation(rotateEls.chosenCard, getSpinnyOldRotate(rotateEls.chosenCard));
      }
      rotateEls.chosenCard.style.zIndex = "";
      rotateEls.chosenCard = false;
    }
  }

  //</editor-fold>

  //<editor-fold>------------------------------------------BELITTLE THE COMPETITION---------------------------------------

  //object to hold cb to remove all event listeners / cb to redraw any paid
  let swapEls = {
    firstEls: [],
    secondEls: [],
    removeEls: (els) => {
      for (let x = 0; x < els.length; x++){
        els[x].card.removeEventListener("click", els[x].el);
      }
    },
  };

  //chose to use belittle the competition
  function choseBelittleTheCompetition(addon, opCard){

    //hide detailed view, deemphasize everything
    puzzleFunctions.removeAllOpCardFixed();
    puzzleFunctions.deemphasizeAll();

    let playerMeeple = document.getElementById("playerMeeple");
    let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));

    //function to activate spread a rumor
    let activateCardEffect = (exceptCard, cardsPaid) => {

      //get all swappable cards to the current card
      let adjacentCards = getConnectableCards(cardPlayerIsOn, true);

      //if project card, add event listener to start swap
      for (let x = 0; x < adjacentCards.length; x++){
        if (adjacentCards[x].classList.contains("projectCard")){
          puzzleFunctions.emphasizeElement(adjacentCards[x].id, "id", false);
          adjacentCards[x].style.cursor = "pointer";

          //add to swapEls el array to remove later
          let el = () => {
            firstCardInSwapSelected(adjacentCards[x], addon, opCard, cardsPaid);
          }
          swapEls.firstEls.push({
            card: adjacentCards[x],
            el: el
          });

          adjacentCards[x].addEventListener("click", el);
        }
      }

      //slowly scroll to the playerboard if mobile
      mobileScrollToElem("puzzleText");
      setPuzzleText(`Select the first ${projectCard} you want to swap.`);

      //disable all other OP cards
      disableAllOPCards(exceptCard);
      highlightOPCardForPuzzle(opCard);
      opCard.setAttribute("usable", "false");   //but keep this card unusable so we dont get double usage after cancel button
    }

    //choose a card to use as payment
    if (addon) {
      chooseCardForPayment(opCard, 2, activateCardEffect);
    }
    //no card payment required, just activate
    else {
      activateCardEffect();
    }
  }

  //picked the first card to swap
  function firstCardInSwapSelected(cardToSwapFrom, addon, opCard, cardsPaid, removeEls){
    swapEls.removeEls(swapEls.firstEls);
    puzzleFunctions.deemphasizeAll();
    resetSquareCardCursors();

    //get all swappable cards to the current card
    let adjacentCards = getConnectableCards(cardToSwapFrom, true);

    //get player's current location
    let playerMeeple = document.getElementById("playerMeeple");
    let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));

    //append a big 1 and emphasize swapping card
    puzzleFunctions.emphasizeElement(cardToSwapFrom.id, "id", false);
    createNumberAndAppend(1, cardToSwapFrom);

    setPuzzleText(`Select the second ${projectCard} you want to swap with.`);

    //highlight all adjacent cards to this one
    //not allowed to swap with the location you're on if no addon
    for (let x = 0; x < adjacentCards.length; x++){
      if (adjacentCards[x].id != "redBoss" && adjacentCards[x].id != "perfReview" && ((addon && adjacentCards[x] === cardPlayerIsOn) || adjacentCards[x] != cardPlayerIsOn)){
        puzzleFunctions.emphasizeElement(adjacentCards[x].id, "id", false);
        adjacentCards[x].style.cursor = "pointer";

        //add to swapEls el array to remove later
        let el = () => {
          secondCardInSwapSelected(cardToSwapFrom, adjacentCards[x], addon, opCard, cardsPaid);
        }
        swapEls.secondEls.push({
          card: adjacentCards[x],
          el: el
        });

        adjacentCards[x].addEventListener("click", el);
      }
    }
  }

  //check to see if we should move a meeple
  function checkMeepleOnSwappingCard(meepleToCheck, cardToSwapFrom, cardToSwapTo){
    let meepleToCheckLocation = meepleToCheck.getAttribute("location");
    if (meepleToCheckLocation === cardToSwapFrom.id){
      moveMeeple(meepleToCheck, cardToSwapFrom);
    }
    else if (meepleToCheckLocation === cardToSwapTo.id) {
      moveMeeple(meepleToCheck, cardToSwapTo);
    }
  }

  //lets do the swap!
  function secondCardInSwapSelected(cardToSwapFrom, cardToSwapTo, addon, opCard, cardsPaid){
    swapEls.removeEls(swapEls.secondEls);
    puzzleFunctions.emphasizeAll();
    resetSquareCardCursors();

    let firstCardTemp = cardToSwapFrom.cloneNode(true);
    let secondCardTemp = cardToSwapTo.cloneNode(true);

    copyLocation(cardToSwapFrom, secondCardTemp);
    copyLocation(cardToSwapTo, firstCardTemp);

    //move enemy if swapping with them
    let enemyMeeple = document.getElementById("enemyMeeple");
    let playerMeeple = document.getElementById("playerMeeple");
    checkMeepleOnSwappingCard(enemyMeeple, cardToSwapFrom, cardToSwapTo);
    checkMeepleOnSwappingCard(playerMeeple, cardToSwapFrom, cardToSwapTo);

    addCompanyInfluence(-1);

    //add to list of actions taken
    //undoes swap
    actionsTaken.push({
      type: "op",
      undo: ()=>{

        //any cards paid? redraw them
        if (cardsPaid){
          for (let x = 0; x < cardsPaid.length; x++){
            redrawOPCard(cardsPaid[x]);
          }
        }

        //undo the swap
        copyLocation(cardToSwapFrom, firstCardTemp);
        copyLocation(cardToSwapTo, secondCardTemp);
        checkMeepleOnSwappingCard(enemyMeeple, cardToSwapFrom, cardToSwapTo);
        checkMeepleOnSwappingCard(playerMeeple, cardToSwapFrom, cardToSwapTo);
        addCompanyInfluence(1);
        redrawOPCard(opCard);
      }
    });

    swapEls.removeEls(swapEls.firstEls);
    swapEls.removeEls(swapEls.secondEls);
    swapEls.firstEls = [];
    swapEls.secondEls = [];
    cancelBelittle();
    discardOPCard(opCard);
    puzzleFunctions.unhighlightAllOPCards();
    puzzleFunctions.unhidePuzzleText();
    setupPuzzleHandlers();
  }

  //move a card to another card's location
  function copyLocation(cardToMove, cardToMoveTo){
    cardToMove.style.left = cardToMoveTo.style.left;
    cardToMove.style.top = cardToMoveTo.style.top;
    cardToMove.setAttribute("xCoord", cardToMoveTo.getAttribute("xCoord"));
    cardToMove.setAttribute("yCoord", cardToMoveTo.getAttribute("yCoord"));
  }

  //create a big number to append to the card
  function createNumberAndAppend(number, cardToAppendTo){

    //wrapper
    let numberDomWrapper = document.createElement("div");
    numberDomWrapper.classList.add("numberDomWrapper");

    //actual number
    let numberDom = document.createElement("div");
    numberDom.innerHTML = number;
    numberDom.classList.add("numberDom", "is-green");

    numberDomWrapper.appendChild(numberDom);
    numberDomWrapper.style.transform = `rotate(-${cardToAppendTo.getAttribute("rotation")}deg)`;

    //fade out img of the card only
    let cardImage = cardToAppendTo.querySelector("img");
    cardImage.classList.add("deemphasized", "is-active");

    cardToAppendTo.appendChild(numberDomWrapper);
  }

  //removes all shit from swap
  function cancelBelittle(){

    removeElementsByClass("numberDomWrapper");
    resetSquareCardCursors();

    swapEls.removeEls(swapEls.firstEls);
    swapEls.removeEls(swapEls.secondEls);
    swapEls.firstEls = [];
    swapEls.secondEls = [];

    //undo the image only opacity when appending swap numbers
    let imagesOpaque = document.querySelectorAll("img.deemphasized.is-active");
    for (let x = 0; x < imagesOpaque.length; x++){
      imagesOpaque[x].classList.remove("deemphasized", "is-active");
    }
  }

  //</editor-fold>

  //<editor-fold>------------------------------------------STEAL THE CREDIT---------------------------------------

  //checks if the enemy is on a card next to me
  function checkIfEnemyIsNextToMe(){

    let playerMeeple = document.getElementById("playerMeeple");
    let enemyMeeple = document.getElementById("enemyMeeple");
    let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));
    let cardEnemyIsOn = document.getElementById(enemyMeeple.getAttribute("location"));

    //get all adjacent cards to the current card
    let adjacentCards = getConnectableCards(cardPlayerIsOn, true);
    let enemyNextToMe = false;

    //check if the enemy is next to me, if so return that card
    for (let x = 0; x < adjacentCards.length; x++){
      if (adjacentCards[x] === cardEnemyIsOn) enemyNextToMe = true;
    }
    return (enemyNextToMe) ? cardEnemyIsOn : false;
  }

  //chose to use steal the credit
  let stealCreditEl;
  function choseStealTheCredit(opCard){

    //hide detailed view, deemphasize everything
    puzzleFunctions.removeAllOpCardFixed();
    puzzleFunctions.deemphasizeAll();

    //function to activate spread a rumor
    let activateCardEffect = (exceptCard, cardsPaid) => {
      let cardEnemyIsOn = checkIfEnemyIsNextToMe();

      //click enemy to swap with them
      puzzleFunctions.emphasizeElement("enemyMeeple", "id", false);
      let enemyMeeple = document.getElementById("enemyMeeple");
      enemyMeeple.style.cursor = "pointer";
      stealCreditEl = ()=>{
        swapWithEnemy(opCard, cardsPaid);
      }
      enemyMeeple.addEventListener("click", stealCreditEl);

      //slowly scroll to the playerboard if mobile
      mobileScrollToElem("puzzleText");
      setPuzzleText(`Select the player you want to swap places with.`);

      //disable all other OP cards
      disableAllOPCards(exceptCard);
      highlightOPCardForPuzzle(opCard);
      opCard.setAttribute("usable", "false");   //but keep this card unusable so we dont get double usage after cancel button
    }

    //choose a card to use as payment
    chooseCardForPayment(opCard, 2, activateCardEffect);
  }

  //swap with enemy
  function swapWithEnemy(opCard, cardsPaid){
    let playerMeeple = document.getElementById("playerMeeple");
    let enemyMeeple = document.getElementById("enemyMeeple");
    let cardPlayerIsOn = document.getElementById(playerMeeple.getAttribute("location"));
    let cardEnemyIsOn = document.getElementById(enemyMeeple.getAttribute("location"));

    cancelStealCredit();
    addCompanyInfluence(-2);

    //swap the two players
    moveMeeple(playerMeeple, cardEnemyIsOn);
    moveMeeple(enemyMeeple, cardPlayerIsOn);

    //add to list of actions taken
    //undoes swap
    actionsTaken.push({
      type: "op",
      undo: ()=>{

        //any cards paid? redraw them
        if (cardsPaid){
          for (let x = 0; x < cardsPaid.length; x++){
            redrawOPCard(cardsPaid[x]);
          }
        }

        //swap back the two players
        moveMeeple(playerMeeple, cardPlayerIsOn);
        moveMeeple(enemyMeeple, cardEnemyIsOn);
        addCompanyInfluence(2);
        redrawOPCard(opCard);
        puzzleFunctions.emphasizeAll();
      }
    });

    discardOPCard(opCard);
    puzzleFunctions.unhighlightAllOPCards();
    puzzleFunctions.unhidePuzzleText();
    puzzleFunctions.emphasizeAll();
    setupPuzzleHandlers();
  }

  //cancels shit from steal credit functions
  function cancelStealCredit(){
    let enemyMeeple = document.getElementById("enemyMeeple");
    enemyMeeple.removeEventListener("click", stealCreditEl);
    enemyMeeple.style.cursor = "default";
  }

  //</editor-fold>

//</editor-fold>
