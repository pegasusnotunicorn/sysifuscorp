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
  [{top:"13.5%",left:"0.5%"}, {top:"13.5%",left:"20.5%"}, {top:"13.5%",left:"40.5%"}, {top:"13.5%",left:"60.5%"}, {top:"13.5%",left:"80.5%"}], //first column
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

//check for mobile
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

  return (getWidthInEm() < 75) ? true : check;
};

//small window for desktop
function getWidthInEm(){
  return window.innerWidth / parseFloat(
    getComputedStyle(
      document.querySelector('body')
    )['font-size']
  )
}

//setup mobile layout
export function setupMobile(){
  let gameBoardTextWrapper = document.getElementById("gameBoardTextWrapper");
  let gameBoardTextLocation = document.getElementById("gameBoardTextLocation");
  let topTextWrapper = document.getElementById("topTextWrapper");

  //mobile and has started
  if (window.mobileCheck() && document.getElementById("startButton").classList.contains("is-hidden")){
    topTextWrapper.innerHTML = "";
    topTextWrapper.appendChild(gameBoardTextWrapper);
  }
  //desktop
  else {
    topTextWrapper.innerHTML = `
      <p>This is a simplied tutorial on how to play the game <span class="is-bold">Welcome to Sysifus Corp</span>.</p>
      <p>It should take about 5 minutes to complete, depending on your reading speed.</p>
      <p>
        Click the green button below to start.
        <span class="is-hidden-mobile is-hidden-tablet-mobile">If you are on a computer, you can use arrow keys to navigate.</span>
      </p>
    `;
    gameBoardTextLocation.appendChild(gameBoardTextWrapper);
  }
}

//show text on the puzzle
export function showPuzzleText(steps, nextStep, specificReset, bypassReset){

  //reset puzzle first if starting over, ignore first time running
  if (nextStep === 0 && !bypassReset){
    resetPuzzle(specificReset);
  }

  setupMobile();

  //going to next step, remove any fixed OP cards
  removeAllOpCardFixed();

  //position the gameboard text
  let gameBoardTextWrapper = document.getElementById("gameBoardTextWrapper");
  gameBoardTextWrapper.classList.remove("is-hidden");
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

//</editor-fold>

//<editor-fold>------------------------------------------GAME OBJ---------------------------------------

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

//</editor-fold>

//<editor-fold>------------------------------------------CARDS---------------------------------------

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

//if any OP cards are fixed / detail viewed, remove it
export function removeAllOpCardFixed(){
  let fixedOpCards = document.getElementsByClassName("opCard is-fixed");
  for (let i = 0; i < fixedOpCards.length; i++){
    removeOpCardFixed(fixedOpCards[i]);
  }
}

//remove a single OP cards if fixed / detail viewed
function removeOpCardFixed(opCard){
  opCard.classList.remove("fade");
  opCard.classList.toggle("is-fixed");

  //so we avoid "fade" animations when clicking off
  setTimeout(()=>{
    opCard.classList.add("fade");
  }, 1);
}

//set a OP card to a specific card and attach handlers
export function setOPCard(idIndex, cardIndex){
  let opCard = document.getElementById(`opCard${idIndex}`);
  opCard.src = `../assets/images/puzzle/opCards/Office Politics${cardIndex}.jpg`;

  //if a card face is actually showing
  if (cardIndex != 0){
    opCard.addEventListener("click", (e)=>{

      //hide current card if clicking a new card
      let fixedOpCard = document.querySelector(".opCard.is-fixed");
      if (fixedOpCard && e.target.id != fixedOpCard.id){
        removeAllOpCardFixed();
      }

      removeOpCardFixed(e.target);
    });
  }
  //clone node and replace so we remove event listener
  else if (cardIndex === 0) {
    let opCardClone = opCard.cloneNode(true);
    opCard.parentNode.replaceChild(opCardClone, opCard);
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
