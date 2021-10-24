<section class="related">
  <h2>Recent Posts</h2>
  <ul class="posts-list">
    {% for post in site.related_posts limit:3 %}
    <li>
      <h3>
        <a href="{{ site.baseurl }}{{ post.url }}">
          {{ post.title }}
          <small>{{ post.date | date: "%Y %B %-d" }}</small>
        </a>
      </h3>
    </li>
    {% endfor %}
  </ul>
</section>
