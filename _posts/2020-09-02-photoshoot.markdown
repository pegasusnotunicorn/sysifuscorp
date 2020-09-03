---
layout: post
title: "Photoshoot"
date: 2020-09-02 12:00:00 -0500
tags: update
author: Wonmin
author-url: wonmin
description: "Did a photoshoot for my game!"
image: "/assets/images/posts/2020/09/02/overall_image.jpg"
<!-- published: false -->

main-image:
  images:
    - path: "/assets/images/main_image.jpg"
      class: "has-shadow"

overall-wide:
  images:
    - path: "/assets/images/posts/2020/09/02/overall_wide.jpg"
      class: "has-shadow"

bts:
  caption: "Here are some behind the scenes photos as well."
  images:
    - path: "/assets/images/posts/2020/09/02/bts1.jpg"
      class: "has-shadow"
    - path: "/assets/images/posts/2020/09/02/bts2.jpg"
      class: "has-shadow"
    - path: "/assets/images/posts/2020/09/02/bts3.jpg"
      class: "has-shadow"

---

Did a photoshoot with my dad. Here are some teaser photos.

{% include image.html img-details=page.main-image %}
{% include image.html img-details=page.overall-wide %}
{% include image.html img-details=page.bts %}
