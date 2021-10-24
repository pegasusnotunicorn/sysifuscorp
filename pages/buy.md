---
layout: page
header-title: Buy now!
permalink: /buy
showheader_mobile: true
description: "Now redirecting you to the purchase page..."

wonmin-lee:
---

<!-- page to redirect to stripe checkout -->
<div>
  <h1 id="main-title">Now redirecting you to the purchase page...</h1>
  <p id="main-text">You are being redirected to the purchase page, just hold on tight! Thank you for your patience!</p>
  <p>Please <a href="/contact">let us know</a> if you think something is wrong!</p>
</div>

<script type="module">
  function errorHandling(){
    document.getElementById("main-text").innerHTML = "Something went wrong! Please refresh the page and try again.";
    document.getElementById("main-title").innerHTML = "Uh-oh. We encountered an error!";
  }

  async function redirectStripe(){
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json()).catch((error) => {
      errorHandling();
    });

    if (response){
      const stripe = Stripe(response.publishableKey);
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (error) {
        errorHandling();
      }
    }

  }

  redirectStripe();
</script>
