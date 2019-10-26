---
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: page
header-title: A cut-throat corporate board game

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

Welcome to Sysifus Corp is a board game about being the first to be promoted at a cut-throat corporation.

#### Will you be the one to receive the coveted Promotion?

---

<div id="main-steps-container">
  <div class="main-steps-block">
    {% include image.html img-details=page.career-path %}
    <p class="main-steps-text">Race to build your career path to the <strong>Promotion</strong></p>
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
