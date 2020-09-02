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

---

{% include image.html img-details=page.main-image %}

Welcome to Sysifus Corp is a board game about being the first to be promoted at a cut-throat corporation.

_Will you be the first to be promoted?_

---

<div id="main-steps-container">
  <div class="main-steps-block">
    {% include image.html img-details=page.career-path %}
    <p class="main-steps-text">Build your career path to the <strong>Bosses</strong> and the <strong>Promotion</strong></p>
  </div>

  <div class="main-steps-block">
    {% include image.html img-details=page.earn-influence %}
    <p class="main-steps-text">Earn <strong>Influence</strong> at the company by working on Projects</p>
  </div>

  <div class="main-steps-block">
    {% include image.html img-details=page.office-politics %}
    <p class="main-steps-text">Use <strong>Office Politics</strong> to screw over your fellow employees</p>
  </div>
</div>

---

### Stay up to date!
We aim to post once a week, sometimes more, sometimes way less. Depends on our mood.

{% include mailchimp-form.html %}
