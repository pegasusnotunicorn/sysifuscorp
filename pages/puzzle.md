---
layout: main
title: Win free shipping!
header-title: Puzzle
<!-- permalink: /puzzle -->
published: false
sidebar_link: false
showheader_mobile: true
description: "Solve a puzzle and win a coupon for free shipping!"
---

<link rel="stylesheet" href="../assets/css/puzzle.css">
<script type="module">
  import { resetPuzzle, runPuzzle } from '../js/puzzle.js';

  //run puzzle when page loads
  window.addEventListener('load', (event) => {
    runPuzzle();
  });
</script>

<div id="topTextWrapper">
  <p>If you can solve the following puzzle, I will give you a coupon for free shipping for my board game.</p>
  <p>No strings attached. No signups. No tricks. Just a good ol' fashioned puzzle.</p>
  <p id="startText">
    Click the green button below to start.
    <span class="is-hidden-mobile is-hidden-tablet-mobile">If you are on a computer, you can use arrow keys to navigate.</span>
  </p>
</div>

{% include puzzle-board.html %}

---

{% include trytutorial.md %}

---

{% include signup.html %}
