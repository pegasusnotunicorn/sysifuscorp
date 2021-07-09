export async function handleFormSubmission(event) {
  event.preventDefault();

  //add active to spinner
  const buttonText = event.target.previousElementSibling;
  const buttonIcon = event.target.children[0]
  buttonText.classList.add('is-invisible');
  buttonIcon.classList.add('is-active', "ld-spin");

  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => res.json()).catch((error) => {
    errorHandling(error, buttonText, buttonIcon)
  });

  if (response){
    const stripe = Stripe(response.publishableKey);
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      errorHandling(error, buttonText, buttonIcon)
    }
  }

}

function errorHandling(error, buttonText, buttonIcon){
  console.error(error);
  buttonText.innerHTML = "Uh-oh! Please refresh and try again.";
  buttonText.classList.remove('is-invisible');
  buttonIcon.classList.remove('is-active', "ld-spin");
}
