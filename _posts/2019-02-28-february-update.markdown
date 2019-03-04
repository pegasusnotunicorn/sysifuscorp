---
layout: post
title: "February 2019 Update"
date: 2019-02-28 12:00:00 -0500
tags: update
author: Wonmin
description: "The February 2019 update for the Path of Good Intent. Introducing the new theme! Read more about it here."
image: "/assets/images/posts/2019/02/28/current-build-pic.png"
<!-- published: false -->

current-build-pic:
  caption: "What the game looks like currently."
  images:
    - path: "/assets/images/posts/2019/02/28/current-build-pic.jpg"
      class: "has-shadow is-half"

employee-sheet-r4:
  caption: "The current design of the Employee Datasheet."
  images:
    - path: "/assets/images/posts/2019/02/28/employee-sheet-r4.jpg"
      class: "has-shadow is-half"

player-stuck:
  caption: "Four players stuck with nowhere to go."
  images:
    - path: "/assets/images/posts/2019/02/28/players-stuck.jpg"
      class: "has-shadow is-half"

player-unstuck:
  caption: "Four players not stuck with plenty of options."
  images:
    - path: "/assets/images/posts/2019/02/28/players-unstuck.jpg"
      class: "has-shadow is-half"

starting-your-career:
  caption: "Start your career at the New Hire Orientation! Bosses are looming in the back."
  images:
    - path: "/assets/images/posts/2019/02/28/starting-your-career.jpg"
      class: "has-shadow is-half"

bosses:
  caption: "The three most important people in your lives starting today."
  images:
    - path: "/assets/images/posts/2019/02/28/boss-blue.jpg"
      class: "has-shadow"
    - path: "/assets/images/posts/2019/02/28/boss-green.jpg"
      class: "has-shadow"
    - path: "/assets/images/posts/2019/02/28/boss-red.jpg"
      class: "has-shadow"

example-play:
  caption: "Employees giving it their 110% at work."
  images:
    - path: "/assets/images/posts/2019/02/28/example-play-1.jpg"
      class: "has-shadow"
    - path: "/assets/images/posts/2019/02/28/example-play-2.jpg"
      class: "has-shadow"

all-office-politics:
  caption: "All the Office Politics Cards."
  images:
    - path: "/assets/images/posts/2019/02/28/all-office-politics.jpg"
      class: "has-shadow is-half"

---

Welcome to a monthly series of blog posts that aims to capture the current state of development for the Path of Good Intent!

These updates serve to keep track of how the game changes throughout its development and will be split into the following categories:

1. [Game development](#game-development-updates)
2. [Game marketing](#game-marketing-updates)
3. [General thoughts](#general-thoughts)

---

## Game development updates ##

This month was the continued fine-tuning of a few game play mechanics. Namely what happens when you get "stuck" on the board and how to best design a solution around that.

Additionally, a revamped design for the Office Politics cards with illustrations makes the game look and feel so much more professional!

{% include image.html img-details=page.current-build-pic %}

### Game mechanics

Several playtesters were getting "stuck" against walls with no options to advance their tokens. I'm going to detail the various ways I went about tackling this problem.

{% include image.html img-details=page.player-stuck %}

#### Option 1 - Allow users to build up resources while stuck

This was the first mechanic that I tested. By allowing players to gather resources, they would theoretically be able to get themselves unstuck. It also needed to be a mechanic that wasn't the objectively better choice even when _not_ stuck.

So what I did was defined a specific scenario where you can use this mechanic--

* You must not be able to move anywhere
* You must not be able to place a new Project card
* You cannot use any of your Office Politics cards to free yourself

It was an incredibly band-aid approach to solving this issue. It difficult to determine if a player was _technically_ stuck. It was also incredibly frustrating being forced to watch other players advancing themselves (especially if they were the ones who got you stuck).

This option also did not account for the fact that you can be stuck without any cards that could free you and the game would basically be over for you if you did not have the exact cards necessary in your hand. That's a shitty spot to be in.

#### Option 2 - Allow users to build resources and refresh their hand whenever

So to fix the above issues of not having the correct cards in your hand and not being sure when you are "stuck," I created a new mechanic that allowed you to "research opportunities" to gain resources and recycle a card from your hand.

My initial worry was that players would abuse this ability even when not stuck to generate resources and to recycle their hands. But hardly anyone ever used this mechanic unless there was absolutely nothing else they could do. It was a very inelegant solution to the problem.

#### Option 3 - Allow users to lay their own paths

Shout-out to Jeffrey and Stacy for this brilliant idea--allow players to create their own paths by placing Sticky Note tokens on top of the cards. While this idea was immediately appealing, I had to make sure it wasn't going to be abused. I didn't want to shift focus away from the Office Politics cards and allow players to lazily build a straight path to the end.

{% include image.html img-details=page.player-unstuck %}

So I limited the amount of Sticky Note tokens they could use and made it expensive to use by forcing players to prematurely end their turn when deciding to use one.

It did not occur to me exactly how expensive a turn was and players simply ignored the Sticky Note tokens. I also did not take into account that Sticky Note tokens were inherently costly due to the fact that they could be used by any player--why waste my actions on building a path for the next guy?

So currently, Sticky Note tokens simply cost 1 action to place, 1 Company Influence to purchase, and are limited to 2 per player.

This brings the total types of actions available each turn to 4:
* Assign a new Project (Place a new Project card)
* Work on an existing Project (Move to a Project card)
* Research opportunities (Gain 1 Influence, recycle 1 card)
* Send an office memo (Sticky Note Token)

{% include image.html img-details=page.character-sheet-r4 %}

### Game theme

[Last month's update](/2019/01/31/january-update.html) introduced the theme so I wanted to dive a bit deeper and show off some of what I've been working on.

>
Every new employee starts their tenure at the company by placing their tokens on the New Hire Orientation card.
>

{% include image.html img-details=page.starting-your-career %}

>
Each Boss will award you a Certificate of Achievement for your hard work and dedication to the company. The first player to earn the favors of all the bosses before their Performance Review will be promoted!
>

{% include image.html img-details=page.bosses %}

>
We don't want brain-dead robots who are just here to satisfy their Project quotas and leave early at 5PM. You’ll find that the most successful employees at our company are the ones who are successfully leveraging their Office Politics Cards to climb the corporate ladder!
>

{% include image.html img-details=page.example-play %}

#### Adding illustrations for the Office Politics cards

Having square cards for the Office Politics was a legacy decision that no longer made sense since these cards were not being placed on the board. It was difficult to visually tell the cards apart and very taxing for players to recognize what they could do during their turns.

So I added illustrations and made the cards longer. The illustrations were taken from a collection of beautiful SVG images that were free to use for anyone. You can find them [here](https://undraw.co/). Shout-out to [Katerina](https://twitter.com/ninalimpi) for her amazing work.

I made a [Reddit post](https://www.reddit.com/r/tabletopgamedesign/comments/av4z6n/how_would_you_feel_about_a_game_you_purchased/) asking the board game community how they felt about a game using free illustrations for their artwork.

{% include image.html img-details=page.all-office-politics %}

---

## Game marketing updates ##

Please follow out our Instagram page if you haven't already!

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/BtzBTosDXzt/?utm_source=ig_embed&amp;utm_medium=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/BtzBTosDXzt/?utm_source=ig_embed&amp;utm_medium=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div><div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BtzBTosDXzt/?utm_source=ig_embed&amp;utm_medium=loading" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Midnight playtesting with @gokeji and @1min_lee #gamedev #boardgame #boardgames #pathofgoodintent #tabletopgaming #gaming #games</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/pathofgoodintent/?utm_source=ig_embed&amp;utm_medium=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Path of Good Intent</a> (@pathofgoodintent) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-02-12T21:41:40+00:00">Feb 12, 2019 at 1:41pm PST</time></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>

---

## General thoughts ##

Overall, things are progressing smoothly. I am optimistic that I will be able to finalize the design in the upcoming weeks and hopefully create a fully packaged prototype by the Summer!

Thank you for reading the February update for the Path of Good Intent. Tune in next month for more updates!
