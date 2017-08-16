{% for post in site.posts %}

  <div class="post">
   {{ post.content }}

    
  <hr>

    <a href="https://vrk.github.io/plantsim{{ post.url }}#disqus_thread">comments</a> -
    written by <a href="https://github.com/vrk/">vrk</a> on <a href="{{ site.baseurl }}{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }}</a>
  </div>
{% endfor %}


