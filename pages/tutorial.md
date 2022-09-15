---
layout: main
title: Interactive Tutorial
header-title: Tutorial
permalink: /tutorial
sidebar_link: false
showheader_mobile: true
description: "A simplified tutorial on how to play Welcome to Sysifus Corp."

---

<link rel="stylesheet" href="../assets/css/puzzle.css">
<script type="module">
  import { resetTutorial, runTutorial } from '../js/tutorial.js';

  //run tutorial when page loads
  window.addEventListener('load', (event) => {
    runTutorial();
  });
</script>

<div id="topTextWrapper">
  <div id="initialInstructions">
    <h2 class="is-hidden-desktop">Interactive Tutorial</h2>
    <p>This is a simplied tutorial on how to play the game <span class="is-bold">Welcome to Sysifus Corp</span>.</p>
    <p>It should only take about 5 minutes to complete.</p>
    <p id="startText" class="is-hidden-mobile is-hidden-tablet-mobile">
      If you are on a computer, you can use the arrow keys to navigate.
    </p>
  </div>
  <p id="startButtonMobile" class="startButton is-hidden-desktop gamebutton noselect is-green noselect">Click here to start</p>
</div>

{% include puzzle-board.html %}

<div class="is-hidden-mobile">
  <hr>
      {% include trypuzzle.md %}
  <hr>
</div>

<div class="is-hidden-desktop">
  <br>  
  <br>  
  <br>  
  <br>  
  <br>  
</div>
