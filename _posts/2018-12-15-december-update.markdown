---
layout: post
title: "December 2018 Update"
date: 2018-12-15 12:00:00 -0500
tags: update
author: Wonmin
author-url: wonmin
description: "The December 2018 update for Welcome to Sysifus Corp. Updating mechanics and reducing complexity! Read more about it here."
image: "/assets/images/posts/2018/12/15/december-analytics.png"
<!-- published: false -->
excerpt_separator: <!--more-->

version-notes:
  caption: "Click to see notes from this month's playtest sessions."
  images:
    - path: "/assets/images/posts/2018/12/15/version-notes.png"
      class: "has-shadow is-half"

old-board-layout:
  caption: "How the board used to be laid out."
  images:
    - path: "/assets/images/posts/2018/12/15/old-board-layout.jpg"
      class: "has-shadow"

old-hand:
  caption: "An example hand in the older version."
  images:
    - path: "/assets/images/posts/2018/12/15/old-hand.jpg"
      class: "has-shadow"

old-character-sheets:
  caption: "Old character sheets used to keep track of actions and karma."
  images:
    - path: "/assets/images/posts/2018/12/15/old-character-sheets.jpg"
      class: "has-shadow"

old-abilities:
  caption: "Despite improvements in legibility, the sheer volume of unique cards made the game unnecessarily convoluted."
  images:
    - path: "/assets/images/posts/2018/12/15/old-old-abilities-rotate-1.png"
      class: "has-shadow"
    - path: "/assets/images/posts/2018/12/15/old-abilities-rotate-1.png"
      class: "has-shadow"

old-abilities-rotate:
  caption: "Old ability cards that rotated cards on the board."
  class: "has-shadow"
  images:
    - path: "/assets/images/posts/2018/12/15/old-abilities-rotate-1.png"
      class: "has-shadow"
    - path: "/assets/images/posts/2018/12/15/old-abilities-rotate-2.png"
      class: "has-shadow"
    - path: "/assets/images/posts/2018/12/15/old-abilities-rotate-3.png"
      class: "has-shadow"
    - path: "/assets/images/posts/2018/12/15/old-abilities-rotate-4.png"
      class: "has-shadow"

new-abilities-rotate:
  caption: "The new version of a rotate ability card."
  images:
    - path: "/assets/images/posts/2018/12/15/new-abilities-rotate-1.jpg"
      class: "has-shadow"

december-analytics:
  caption: "Thanks to the Reddit post, we saw a huge spike in traffic."
  images:
    - path: "/assets/images/posts/2018/12/15/december-analytics.png"
      class: "has-shadow"

email-analytics:
  caption: "A big thank you to everyone who subscribed!"
  images:
    - path: "/assets/images/posts/2018/12/15/email-analytics.png"
      class: "has-shadow"

---

Welcome to a monthly series of blog posts that aims to capture the current state of development for _Welcome to Sysifus Corp_!

These updates serve to keep track of how the game changes throughout its development and will be split into the following categories:

<!--more-->

1. [Game development](#game-development-updates)
2. [Game marketing](#game-marketing-updates)
3. [General thoughts](#general-thoughts)

---

## Game development updates ##

This month continues with further simplification of the game mechanics due to feedback received and difficulty in retrofitting a cohesive theme / story.

{% include image.html img-details=page.version-notes %}

The focus this month was on fine-tuning the aspects of the game that are strong and diluting them down while cutting out the fat.

### Game mechanics

#### How to play (Previous version)

This section will explain the *old game rules*.

>You control two characters who are on a journey to "making it." Starting from one end of the board, you work your way to the two goals on the other side of the map.

{% include image.html img-details=page.old-board-layout %}

>Your hand consists of:
1. Karma cards (movement and gathering resources)
2. Ability cards

{% include image.html img-details=page.old-hand %}

>Each turn you can do four actions:
1. Draw a card
2. Place a card
3. Move a character (Twice)

{% include image.html img-details=page.old-character-sheets %}

#### Problems with the old version

The biggest problem was the difficulty of fitting a cohesive theme into the game. Simple questions such as "Why are there two of everything?" or "What's the point of ability cards?" were incredibly difficult to answer.

Another problem was the complexity of the game. While the base rules were simple, a lot of the abilities were incredibly difficult to comprehend at a glance.

{% include image.html img-details=page.old-abilities %}

A [lot of the problems that I initially had](/2018/11/25/how-a-board-game-is-born.html#complex-abilities--fun-right) when initially making the prototype still seemed prevalent despite several iterations of the mechanics.

Turns were also taking far too long due to several reasons:
1. Abilities were too complex / difficult to comprehend
2. The map changes by the time it's your turn so you cannot plan ahead
3. Analysis paralysis (Too many decisions to make)

#### So what changed this month?

As you can see in the tables below, the majority of the changes made are aimed at reducing the amount of decisions that a player has to make during their turn.

{% include change-table.html title="Reduced the variety of movement cards." left-side='"Which card is the best card to place? And how can I place it optimally?"' right-side='"How can I place this card optimally?"' %}

{% include change-table.html title="One currency to pay for everything." left-side='"Which resource do I want? And how much of it do I need to do what I want?"' right-side='"How much do I need to do what I want?"' %}

{% include change-table.html title="One character." left-side='"Who do I move? And where do I move them?"' right-side='"Where do I move?"' %}

{% include change-table.html title="Reducing actions." left-side='"Draw? Place? Move?"' right-side='"Place? Move?"' %}

{% include change-table.html title="Standardized abilities." left-side='50 unique abilities' right-side='10 scaling abilities (with 3-5 levels each)' %}

A great example of these changes can be seen in the ability cards.

Below are four cards that existed in the previous version that had similar effects.

{% include image.html img-details=page.old-abilities-rotate %}

And below is the card that replaced it, please excuse the lack of professional design, we're back to the prototyping stage.

{% include image.html img-details=page.new-abilities-rotate %}

Basically, a lot of unnecessarily convoluted abilities were thrown away or combined into single "scalable" abilities with variable costs. The more you pay, the stronger the effect.

This new scalable system aims to reduce the amount of "dead draws" or unusable abilities. And hopefully will lead to more action within the game and less downtime.

### Game theme

Currently, there is no real theme for the game. Just various vague feelings or descriptions for the tone of the game.

We recently stumbled upon a video that captures the spirit that I had originally envisioned for the game.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/_o7qjN3KF8U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Something about the absurdity and seriousness of his actions that really resonates with me.

But as it currently stands, the game has no theme. This is something that we will be actively working on in the next coming weeks.

---

## Game marketing updates ##

We recently posted the [results of our Tinder-for-finding-playtesters](/2018/11/14/how-to-use-tinder-to-find-playtesters.html) post on [/r/tabletopgamedesign](https://www.reddit.com/r/tabletopgamedesign/comments/a34vzy/how_to_use_tinder_to_find_playtesters_for_your/) to some success.

{% include image.html img-details=page.december-analytics %}

Additionally, we've reached over a hundred subscribers on our email list!

{% include image.html img-details=page.email-analytics %}

---

## General thoughts ##

There were a lot of highs and lows in the past month. One day I can feel like my game is the greatest thing ever and the next I just want to crawl into a hole and forget about everything.

A few things to keep in mind for the future and for anyone in a similar situation:
1. Don't take criticism personally. It's not you, it's your game.
2. What feels like setbacks are actually "setforwards" that put you one step closer to completion.

Thank you for reading the December update for _Welcome to Sysifus Corp_. Tune in next month for more updates!
