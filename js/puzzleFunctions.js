//<editor-fold>------------------------------------------GLOBAL---------------------------------------

//wait time before running some export function
export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//random between two numbers
export function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//X amount of random numbers between two numbers
export function xRandomIntFromInterval(total, min, max){
  let arr = [];
  while (arr.length < total){
    let r = randomIntFromInterval(min, max);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

//coordinates for cards on the 2x5 grid
export const gridCoords = [
  [{top:"6.5%",left:"0.5%"}, {top:"6.5%",left:"20.5%"}, {top:"6.5%",left:"40.5%"}, {top:"6.5%",left:"60.5%"}, {top:"6.5%",left:"80.5%"}], //first column
  [{bottom:"1%",left:"0.5%"}, {bottom:"1%",left:"20.5%"}, {bottom:"1%",left:"40.5%"}, {bottom:"1%",left:"60.5%"}, {bottom:"1%",left:"80.5%"}], //second column
]

//</editor-fold>

//<editor-fold>------------------------------------------PUZZLE BOARD---------------------------------------

//reset the puzzle, add active to gameboard
function resetPuzzle(specificReset){
  let gameObjs = document.getElementsByClassName("gameObj");
  for (let i = 0; i < gameObjs.length; i++) {
    gameObjs[i].classList.remove("deemphasized", "is-active");
  }
  document.getElementById("gameboard").classList.add("is-active");

  //if there are any specific resets to do
  if (specificReset){
    specificReset();
  }
}

//show text on the puzzle
export function showPuzzleText(steps, nextStep, specificReset, bypassReset){

  //reset puzzle first if starting over, ignore first time running
  if (nextStep === 0 && !bypassReset){
    resetPuzzle(specificReset);
  }

  //position the gameboard text
  let gameBoardTextWrapper = document.getElementById("gameBoardTextWrapper");
  gameBoardTextWrapper.style.top = steps[nextStep].top;
  gameBoardTextWrapper.style.left = steps[nextStep].left;
  gameBoardTextWrapper.classList.add("is-active");

  //fill in the gameboard text
  let gameBoardText = document.getElementById("gameBoardText");
  gameBoardText.innerHTML = steps[nextStep].text;

  //prev / reset / next buttons
  let gameBoardTextPrevButton = document.getElementById("gameBoardTextPrevButton");
  let gameBoardTextResetButton = document.getElementById("gameBoardTextResetButton");
  let gameBoardTextNextButton = document.getElementById("gameBoardTextNextButton");
  gameBoardTextPrevButton.classList.add('is-hidden');
  gameBoardTextResetButton.classList.add('is-hidden');
  gameBoardTextNextButton.classList.add('is-hidden');

  //bind keyboard listener
  let bindKeyboard = (function(steps, nextStep, specificReset) {
    var listeners = {
      keyboardListener: function handler(e){
        //left
        if (e.code === "ArrowLeft" && nextStep - 1 >= 0){
          showPuzzleText(steps, nextStep - 1, specificReset, true);
          this.removeEventListener('keyup', handler);
        }
        //right / space / enter
        else if ((nextStep + 1 < steps.length) && (e.code === "ArrowRight" || e.code === "Space" || e.code === "Enter")){
          showPuzzleText(steps, nextStep + 1, specificReset);
          this.removeEventListener('keyup', handler);
        }
      }
    };
    document.addEventListener('keyup', listeners.keyboardListener, false);

    return {
      cancel: function(nm) {
        document.removeEventListener('keyup', listeners[nm], false);
      }
    };
  }(steps, nextStep, specificReset));

  //prev button shows except at start
  if (nextStep != 0){
    gameBoardTextPrevButton.classList.remove('is-hidden');
    cloneButton(gameBoardTextPrevButton, steps, nextStep - 1, specificReset, true);
  }

  //reset shows at end
  if (steps.length <= nextStep + 1){
    gameBoardTextResetButton.classList.remove('is-hidden');
    cloneButton(gameBoardTextResetButton, steps, 0, specificReset, false, bindKeyboard);
  }
  //next button shows except at end
  else {
    gameBoardTextNextButton.classList.remove('is-hidden');
    cloneButton(gameBoardTextNextButton, steps, nextStep + 1, specificReset);
  }

  //if theres a export function to run, run it
  if (typeof steps[nextStep].func != "undefined"){
    steps[nextStep].func();
  }
}

//clone a board text button and replace it, attach click listener
function cloneButton(buttonToClone, steps, nextStepNum, specificReset, bypassReset, bindKeyboard){
  let buttonClone = buttonToClone.cloneNode(true);
  buttonClone.addEventListener('click', () => {
    showPuzzleText(steps, nextStepNum, specificReset, bypassReset);
    //reset document event handlers
    if (bindKeyboard){
      bindKeyboard.cancel("keyboardListener");
    }
  }, false);
  buttonToClone.parentNode.replaceChild(buttonClone, buttonToClone);
}

//show a specific element and opaque the other objects
export function emphasizeElement(elementIdOrClass, idOrClass, deemphasizeOthers){

  //deemphasize other game objects so we can highlight the object appearing
  if (deemphasizeOthers){
    let fadeables = document.getElementsByClassName("fadeable");
    for (let i = 0; i < fadeables.length; i++) {
      fadeables[i].classList.add("deemphasized");
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

//resets all emphasis
export function resetEmphasis(){
  let fadeables = document.getElementsByClassName("fadeable");
  for (let i = 0; i < fadeables.length; i++) {
    fadeables[i].classList.remove("deemphasized");
  }
}

//hide a specific element (never to show again)
export function hideElement(elementIdOrClass, idOrClass){
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
export function createProjectCard(idIndex, imageNum, left, y, topOrBot, rotationDeg){
  let projectCard = document.createElement("img");
  projectCard.id = `projectCard${idIndex}`;
  projectCard.src = `../assets/images/puzzle/projectCards/Project Cards${imageNum}.jpg`;
  projectCard.classList.add("squareCard", "fadeable", "gameObj", "fade", "projectCard");
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

//reset a game object
export function resetGameObj(gameObjId, reset, style){
  let gameObj = document.getElementById(gameObjId);

  if (reset){
    gameObj.style = null;
  }
  else if (typeof styles != "undefined"){
    gameObj.style = {...styles};
  }
}

//move a gameObj on the board, add any extra styles
export function moveGameObj(gameObjId, styles){
  let gameObj = document.getElementById(gameObjId);

  //merge styles if any
  if (typeof styles != "undefined"){
    Object.assign(gameObj.style, styles);
  }
}

//create a blank OP card and add to hand
export function createOPCard(imageNum, index){
  let opCard = document.createElement("img");
  opCard.src = `../assets/images/puzzle/opCards/Office Politics${imageNum}.jpg`;
  opCard.id = `opCard${index}`;
  opCard.classList.add("opCard", "fadeable", "fade", "is-active", "deemphasized");
  opCard.style.left = `${index * 150}px`;
  opCard.style.zIndex = 3 - index;
  return opCard;
}

//set a OP card to a specific card and attach handlers
export function setOPCard(idIndex, cardIndex){
  let opCard = document.getElementById(`opCard${idIndex}`);
  opCard.src = `../assets/images/puzzle/opCards/Office Politics${cardIndex}.jpg`;

  //if a card face is actually showing
  if (cardIndex != 0){
    opCard.addEventListener("click", (e)=>{
      e.target.classList.remove("fade");
      e.target.classList.toggle("is-fixed");

      //so we avoid "fade" animations when clicking off
      setTimeout(()=>{
        e.target.classList.add("fade");
      }, 1);
    });
  }
}

//reset all OP cards
export function resetOPCards(){
  let opCards = document.getElementsByClassName("opCard");

  for (let i = 0; i < opCards.length; i++){
    opCards[i].src = `../assets/images/puzzle/opCards/Office Politics0.jpg`;
    opCards[i].style.top = null;
  }
}

//highlight a specific card in hand
export function highlightOpCard(cardIndex){
  let opCards = document.getElementsByClassName("opCard");

  for (let i = 0; i < opCards.length; i++){
    //dehighlight all
    if (typeof cardIndex != "number"){
      opCards[i].classList.remove("deemphasized");

      //if card is not "hidden"
      if (opCards[i].style.top != "150%"){
        opCards[i].style.top = null;
      }
    }
    else {
      opCards[i].classList.add("deemphasized");
    }
  }

  //if highlighting
  if (typeof cardIndex === "number"){
    let highlightedCard = document.getElementById(`opCard${cardIndex}`)
    highlightedCard.classList.remove("deemphasized");
    moveGameObj(`opCard${cardIndex}`, {top:"0.5em"});
  }
}

//hide a specific card in hand
export function hideOrShowOpCard(cardIndex, hide){
  let hideCard = document.getElementById(`opCard${cardIndex}`);

  if (hide){
    hideCard.style.top = "150%";
  }
  else {
    hideCard.style.top = null;
  }
}

//</editor-fold>
