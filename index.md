---
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page

main-images-first:
  images:
    - path: "/assets/images/main_image_0.jpg"
    - path: "/assets/images/main_image_1.jpg"
    - path: "/assets/images/main_image_2.jpg"
main-images-second:
  images:
    - path: "/assets/images/main_image_3.jpg"
    - path: "/assets/images/main_image_4.jpg"
    - path: "/assets/images/main_image_5.jpg"
---
<link rel="stylesheet" href="/assets/css/index.css">

{% include image.html img-details=page.main-images-first %}
{% include image.html img-details=page.main-images-second %}

_Path of Good Intent_ is a board game about clawing your way up the corporate ladder to be the first to receive a promotion.

* Choose your next Project by laying down cards.
* Earn Company Influence by billing various Projects around the board.
* Activate Office Politics cards to advance yourself or screw over others.

Can you be the first to receive the coveted promotion?

---

### Stay up to date!
We aim to post once a week, sometimes more, sometimes way less.

{% include mailchimp-form.html %}
