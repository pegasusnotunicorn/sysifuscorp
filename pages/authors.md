---
layout: main
title: Authors
header-title: Authors
permalink: /authors
showheader_mobile: true
description: "The authors of this blog for Welcome to Sysifus Corp"

---

{% for author in site.authors %}
  <h3><a href="{{ author.lower-case-url }}">{{ author.name }}</a></h3>
  <p>{{ author.content | markdownify }}</p>
{% endfor %}

---

{% include trytutorial.md %}
