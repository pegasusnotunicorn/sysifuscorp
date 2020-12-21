---
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
header-title: A cut-throat corporate board game

main-image:
  images:
    - path: "/assets/images/main_image.jpg"

career-path:
  images:
    - path: "/assets/images/main_career_path.png"

earn-influence:
  images:
    - path: "/assets/images/main_earn_influence.png"

office-politics:
  images:
    - path: "/assets/images/main_office_politics.png"

game-images:
  images:
    - path: "/assets/images/gallery/1-min.jpg"
    - path: "/assets/images/gallery/2-min.jpg"
    - path: "/assets/images/gallery/3-min.jpg"
    - path: "/assets/images/gallery/5-min.jpg"

game-images-2:
  images:
    - path: "/assets/images/gallery/6-min.jpg"
    - path: "/assets/images/gallery/7-min.jpg"
    - path: "/assets/images/gallery/8-min.jpg"
    - path: "/assets/images/gallery/9-min.jpg"
    - path: "/assets/images/gallery/10-min.jpg"

bosses:
  caption: "We are the Bosses of Sysifus Corp, welcome!"
  images:
    - path: "/assets/images/gallery/4-min.jpg"
      class: "is-half"

---

{% include image.html img-details=page.main-image %}

### Race around the office, suck up to the Bosses, and _be the first_ to be promoted.

It's quite literally _"rat-race, the board game."_

{% include button.html buttonlink="https://www.kickstarter.com/projects/pegasusgamesnyc/welcome-to-sysifus-corp-a-cut-throat-corporate-board-game" buttontext="Click here to see our Kickstarter!"%}

---

{% include image.html img-details=page.game-images %}
{% include image.html img-details=page.game-images-2 %}

---

#### Hello EMPLOYEE #318996!

We are so glad you are here. Let us fill you in a little on what we do and, more importantly, how you can start benefiting us immediately as a corporate gear-cog.  

{% include image.html img-details=page.bosses %}

When we started this company (Sysifus Corp) 50 years ago, we never dreamed it would become the multinational, award-winning, and industry-leading powerhouse it is today. You are now an integral cog of our great big company. Congratulations! We chose you for your achievements, your background, and, most importantly, your unyielding desire to push to the top--no matter the cost.

Welcome to Sysifus Corp--where we are always pushing our way to the top!


---

### Stay up to date!
We aim to post once a week, sometimes more, sometimes way less. Depends on our mood.

{% include mailchimp-form.html %}
