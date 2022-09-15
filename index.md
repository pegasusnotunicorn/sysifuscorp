---
layout: main
header-title: The perfect gateway board game.

quote:
  images:
    - path: "/assets/images/quotes1.png"
      class: "is-half ignore-mobile"
    - path: "/assets/images/quotes2.png"
      class: "is-half ignore-mobile"

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
    if (heroImage.src.indexOf("Box1.png") != -1){
      heroImage.src = "/assets/images/gallery/Box2.png"
    }
    else {
      heroImage.src = "/assets/images/gallery/Box1.png"
    }
  }

</script>
<!-- //show popup after 5s
const myTimeout = setTimeout(()=>{
document.getElementById("popup_container").classList.remove('is-hidden');
}, 5000);

hidePopup = () => {
const popup_container = document.getElementById("popup_container")
popup_container.classList.add("is-hidden");
} -->

<div onclick="flipBox()" class="heroImage no-select">
  <img id="heroImage" src="/assets/images/gallery/Box1.png" />
  <img class="is-invisible" src="/assets/images/gallery/Box2.png" />
  <div class="heroText">
    <h2 class="is-hidden-mobile">A delightful puzzle in every turn</h2>
    <small>A strategic, competitive, and corporate board game.</small>
  </div>
</div>

## A delightful puzzle in every turn

Plan the perfect turn by carefully managing your cards and resources.

Play crazy multi-card combos that leave your fellow coworkers in the dust.

The closest you can get to legally stabbing your coworkers in the back. 😈

{% include sticky-stripe-button.html %}

---

{% include trypuzzle.md %}

---

<div id="popup_container" class="popup_container is-hidden">
  <div class="popup-message">
    <div onclick="hidePopup()" class="popup-x">✖</div>
    <img src="/assets/images/lcm.jpg" />
    <div class="popup-message-text">
      <h2>Check out my new game!</h2>
      <p>Play as one of 25 different mythical creatures with modern day jobs (orc hacker, dragon chef, troll lawyer, etc). Fall in love or stir up drama as part of a reality TV show!</p>
      <a href="https://lovecareermagic.com" target="_blank">Learn more</a>
    </div>
  </div>
  <div onclick="hidePopup()" class="popup-background"></div>
</div>


## If you like any of these mechanics then this game is for you!

<div class="gameIconsWrapper is-display-flex">
  <div class="gameIconWrapper">
    <img class="gameIcon" src="/assets/images/icons/tile placement.png" />
    <p class="gameIconText">Tile Placement</p>
  </div>
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
    <img class="gameIcon" src="/assets/images/icons/take that.png" />
    <p class="gameIconText">Take That</p>
  </div>
</div>

---

## What are people saying?

{% include image.html img-details=page.quote %}

- [_Captured my attention and satisfied my desire to plan complex turns without being too intimidating for my less game heavy friends._](https://boardgamegeek.com/boardgame/318996/welcome-sysifus-corp/ratings)
- [_A well-made, balanced, riot of a race game, and I’ve had loads of fun with it._](https://punchboard.co.uk/welcome-to-sysifus-corp-review/)
- [_Super unique and fun game. Easy to learn and also interesting for more dedicated gamers._](https://boardgamegeek.com/boardgame/318996/welcome-sysifus-corp/ratings)
- [_So much fun and is absolutely hilarious...quick and easy to learn, making it a great introduction to newer gamers_](https://boardgamegeek.com/boardgame/318996/welcome-sysifus-corp/ratings)
- [_Everything is funny and cut-throat, highly recommend it._](https://www.instagram.com/p/CULlWGZrZ37/)
- [_Very high replay value...the rules are quite simple once you get started._](https://boardgamegeek.com/boardgame/318996/welcome-sysifus-corp/ratings)

---

## The perfect gateway board game for your loved ones

- You can teach the game in about 5 minutes—even to your non-gamer friends.
- Easy to learn, but hard to master with lots of depth in the gameplay. (So you won't be bored)
- Endlessly replayable with over 3.2 million setup combinations. (We counted)

---

## What makes this game fun in 30 seconds

<div class="video-container is-threequarter">
  <iframe class="video" src="https://www.youtube.com/embed/OOGUH8D_7qI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Sexy closeup photos

Click on an image to zoom in on those sexy plastic curves.

{% include image.html img-details=page.game-images %}
{% include image.html img-details=page.game-images-2 %}

---

## 69 seconds of 4K HD unboxing ASMR

<div class="video-container is-threequarter">
  <iframe class="video" src="https://www.youtube.com/embed/faNubeIbLTk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

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
