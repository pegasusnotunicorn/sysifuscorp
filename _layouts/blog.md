---
layout: main
---
{% include gtag_body.html %}

<style>
  .pagination-wrapper{
    {% if paginator.previous_page and paginator.next_page == nil %}
      justify-content:left;
    {% elsif paginator.next_page and paginator.previous_page == nil %}
      justify-content:right;
    {% endif %}
  }
  .post-title{
    font-size:1.5rem;
    text-decoration:underline;
  }
  .pagination-item{
    {% if paginator.previous_page and paginator.next_page == nil %}
      margin-left:0 !important;
    {% elsif paginator.next_page and paginator.previous_page == nil %}
      margin-left:0 !important;
    {% endif %}
  }
</style>

<div class="pagination-wrapper">
  {% include pagination-newer.html %}
  {% include pagination-older.html %}
</div>

{{ content }}

{% for post in paginator.posts %}
  <article class="post-body">
    <h2 class="post-title">
      <a href="{{ post.url | relative_url }}">
        {{ post.title }}
      </a>
    </h2>
    {% include post-meta.html post=post %}

    {% if post.excerpt %}
      {{ post.excerpt }}
    {% else %}
      {{ post.content }}
    {% endif %}

    {% if post.excerpt %}
      {% comment %}Excerpt may be equal to content. Check.{% endcomment %}
      {% capture content_words %}
        {{ post.content | number_of_words }}
      {% endcapture %}
      {% capture excerpt_words %}
        {{ post.excerpt | number_of_words }}
      {% endcapture %}

      {% if content_words != excerpt_words %}
        <a href="{{ post.url | relative_url }}">More &hellip;</a>
      {% endif %}
    {% endif %}
  </article>
{% endfor %}

<div class="pagination-wrapper">
  {% include pagination-newer.html %}
  {% include pagination-older.html %}
</div>
