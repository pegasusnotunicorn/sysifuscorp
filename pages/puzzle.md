---
layout: main
title: Win free shipping!
header-title: Puzzle
permalink: /puzzle
<!-- published: false -->
sidebar_link: false
showheader_mobile: true
description: "Solve a puzzle and win a coupon for free shipping!"

---

<link rel="stylesheet" href="../assets/css/puzzle.css">
<script type="module">
  import { resetPuzzle, setupPuzzle } from '../js/puzzle.js';

  //run puzzle when page loads
  window.addEventListener('load', (event) => {
    setupPuzzle();
  });
</script>

<div id="topTextWrapper">
  <div id="initialInstructions">
    <h2 class="is-hidden-desktop">Win free shipping!</h2>
    <p>If you can solve the following puzzle, I will give you a coupon for free shipping for my board game.</p>
    <p>No strings attached. No signups. No tricks. Just a good ol' fashioned puzzle.</p>
    <p id="startText" class="is-hidden-mobile is-hidden-tablet-mobile">
      If you are on a computer, you can use the arrow keys to navigate.
    </p>
  </div>
  <div id="startButtonMobile" class="startButton is-hidden-desktop gamebutton noselect is-green noselect">Click here to start</div>
</div>

{% include puzzle-board.html %}

<div class="is-hidden-mobile">
  <hr>
      {% include trytutorial.md %}
  <hr>
</div>
