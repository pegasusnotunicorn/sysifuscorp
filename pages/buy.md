---
layout: main
title: Buy now!
header-title: Buy now!
permalink: /buy
showheader_mobile: false
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

  window.location.href = "https://buy.stripe.com/fZeaGw7Co2AK3sYfYZ";

</script>


<!-- function errorHandling(){
    document.getElementById("main-text").innerHTML = "Something went wrong! Please refresh the page and try again.";
    document.getElementById("main-title").innerHTML = "Uh-oh. We encountered an error!";
  }

  let params = (new URL(document.location)).searchParams;
  let ref = params.get("ref");

  async function redirectStripe(){
    const response = await fetch(`/.netlify/functions/create-checkout?ref=${ref}`, {
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

  redirectStripe(); -->
