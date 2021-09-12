---
layout: page
---
<style>
.container{
  padding-top:0;
}
.container > header{
  display:none !important;
}
</style>

<div class="is-hidden-desktop">
  <p class="lead lead-top">Welcome to</p>
  <div class="site-title">
    <p>{{ site.title }}</p>
    <img class="logo-transparent" src="/assets/images/logo_transparent.png" />
  </div>
</div>

{% if page.showheader_mobile == true %}
  <h1>{{ page.title }}</h1>
{% endif %}

{{ content }}
