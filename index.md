---
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: main
header-title: A cut-throat corporate board game

quote:
  images:
    - path: "/assets/images/game-quote.png"
      class: "is-full"

game-images:
  images:
    - path: "/assets/images/gallery/1-min.jpg"
    - path: "/assets/images/gallery/2-min.jpg"
      class: "is-hidden-mobile"
    - path: "/assets/images/gallery/3-min.jpg"
      class: "is-hidden-mobile"
    - path: "/assets/images/gallery/4-min.jpg"
    - path: "/assets/images/gallery/5-min.jpg"

game-images-2:
  images:
    - path: "/assets/images/gallery/6-min.jpg"
    - path: "/assets/images/gallery/7-min.jpg"
      class: "is-hidden-mobile"
    - path: "/assets/images/gallery/8-min.jpg"
    - path: "/assets/images/gallery/9-min.jpg"
    - path: "/assets/images/gallery/10-min.jpg"
      class: "is-hidden-mobile"

---

<script>
flipBox = () => {
  const heroImage = document.getElementById("heroImage");
  if (heroImage.src.indexOf("Box1.jpg") != -1){
    heroImage.src = "/assets/images/gallery/Box2.jpg"
  }
  else {
    heroImage.src = "/assets/images/gallery/Box1.jpg"
  }
  document.getElementById("boxFlipper").classList.toggle("is-flipped");
}
</script>

<div onclick="flipBox()" class="heroImage no-select">
  <p id="boxFlipper" class="flipBox">hey! click to flip the box.</p>
  <img id="heroImage" src="/assets/images/gallery/Box1.jpg" />
  <img class="is-invisible" src="/assets/images/gallery/Box2.jpg" />
</div>

## What makes this game fun in 30 seconds

<div class="video-container is-threequarter">
  <iframe class="video" src="https://www.youtube.com/embed/OOGUH8D_7qI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Backstab your coworkers in a tactical race to the promotion!

Angry coworkers? Stressful job? Relieve that stress in a way that won’t get you fired or sued!

The perfect game for relieving stress in an HR-approved and legal manner.

Fully funded via <a href="https://www.kickstarter.com/projects/pegasusgamesnyc/welcome-to-sysifus-corp-a-cut-throat-corporate-board-game">Kickstarter on March 2021</a> and now available for purchase!

{% include sticky-stripe-button.html %}

---

## If you like any of these mechanics then this game is for you!

<div class="gameIconsWrapper is-display-flex">
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/card chaining.png" />
    <p class="gameIconText">Card Chaining</p>
  </div>
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/hand management.png" />
    <p class="gameIconText">Hand Management</p>
  </div>
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/multi-use cards.png" />
    <p class="gameIconText">Multi-use Cards</p>
  </div>
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/race.png" />
    <p class="gameIconText">Race</p>
  </div>
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/tile placement.png" />
    <p class="gameIconText">Tile Placement</p>
  </div>
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/take that.png" />
    <p class="gameIconText">Take That</p>
  </div>
</div>

---

## 69 seconds of 4K HD unboxing ASMR

<div class="video-container is-threequarter">
  <iframe class="video" src="https://www.youtube.com/embed/faNubeIbLTk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Show me some sexy closeup photos

{% include image.html img-details=page.quote %}
{% include image.html img-details=page.game-images %}
{% include image.html img-details=page.game-images-2 %}

---

{% include signup.html %}

---

## So...welcome! To Sysifus Corp!

We hope you will be a valuable addition to our glorious corporation.

Click the video below to watch the keynote presentation by one of our great founding leaders.

<div class="video-container is-threequarter">
  <iframe class="video" src="https://www.youtube.com/embed/9gfzyzldHC0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>
All hail Sysifus Corp!
