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

  //setup tutorial so that message is the only one to load 1sec later
  resetTutorial();

  //run tutorial when page loads
  window.addEventListener('load', (event) => {
    runTutorial();
  });
</script>

<div id="topTextWrapper">
  <p>This is a simplied tutorial on how to play the game <span class="is-bold">Welcome to Sysifus Corp</span>.</p>
  <p>It should take about 5 minutes to complete, depending on your reading speed.</p>
  <p>Click the green button below to start. <span class="is-hidden-mobile is-hidden-tablet-mobile">If you are on a computer, you can use arrow keys to navigate.</span></p>
</div>

{% include puzzle-board.html %}

---

{% include signup.html %}

<!--
---

{% include trypuzzle.md %} -->
