---
layout: main
---
{% include gtag_body.html %}

<style>
  .post-title{
    margin-top:1.25rem;
  }
</style>

<h1 class="post-title">{{ page.title }}</h1>

{% include post-meta.html post=page %}

<div class="post-body">
  {{ content }}
  {% include post-tags.html post=page %}
</div>

{% include comments.html %}
{% include related_posts.html %}
