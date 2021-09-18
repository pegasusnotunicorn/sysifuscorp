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
.logo-top-mobile{
  width: 100vw;
  margin-left: -2rem;
  color: white;
  background: #000000;
  padding-bottom:2rem;
}
.logo-top-mobile > .lead-top{
  margin-top: -2rem;
  padding-top: 2rem;
  padding-left: 2rem;
}
.logo-top-mobile > .site-title{
  padding-left: 2rem;
  color: white;
}
</style>

<div class="logo-top-mobile is-hidden-desktop">
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
