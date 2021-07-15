const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Easypost = require('@easypost/api');
const api = new Easypost(process.env.EASYPOST_API_KEY);

//sendgrid email stuff
const client = require('@sendgrid/mail');
const {
  SENDGRID_KEY,
  SENDGRID_FROM_EMAIL,
} = process.env;
client.setApiKey(SENDGRID_KEY);

const fromAddress = new api.Address({
  company: 'Pegasus Games',
  street1: '971 Stewart Ave',
  street2: '',
  city: 'Garden City',
  state: 'NY',
  zip: '11530',
  phone: '718-309-7773'
});
fromAddress.save();

//catcher for errors
const errorCatch = (error) => {
  console.log(error);
}

//create the label via easypost after receiving successful stripe session_id
const createLabel = async (session_id) => {
  const session = await stripe.checkout.sessions.retrieve(session_id);

  //customer to-address
  const toAddress = new api.Address({
    name: session.shipping.name,
    street1: session.shipping.address.line1,
    street2: session.shipping.address.line2,
    city: session.shipping.address.city,
    state: session.shipping.address.state,
    zip: session.shipping.address.postal_code,
    country: session.shipping.address.country
  });
  toAddress.save().catch(errorCatch);

  //create new parcel based on existing dimensions
  const parcel = new api.Parcel({
    length: 12.5,      //inches
    width: 3.5,        //inches
    height: 14.125,    //inches
    weight: 40,        //ounces
  });
  parcel.save().catch(errorCatch);

  //create a shipment, buy lowest rate, and insure for price
  const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
  });
  shipment.save().then(s =>
    s.buy(shipment.lowestRate(), 40.00)
     .then(s => {
       sendEmail({
         toEmail: "pegasusnotunicorn+sendgrid@gmail.com",
         subject: `$${s.selected_rate.rate} shipping label was purchased for Sysifus Corp! SHIPSYSIFUSLABEL - ${s.to_address.name}`,
         message: `
                    <h1>Huzzah! Label was purchased</h1>
                    <p>To Address - </p>
                    <p>${s.to_address.name}</p>
                    <p>${s.to_address.street1} ${s.to_address.street2 || ""}</p>
                    <p>${s.to_address.city}, ${s.to_address.state} ${s.to_address.zip} ${s.to_address.country}</p>
                    <p>Tracking # - ${s.tracking_code}<p>
                    <p>Label - ${s.postage_label.label_url}<p>
                    <p>Label Cost - $${s.selected_rate.rate} ${s.selected_rate.currency}<p>
                  `
       });
     })
  ).catch(errorCatch);
}

//send an email to messageDetails.toEmail
const sendEmail = async (messageDetails) => {
  const data = {
    to: messageDetails.toEmail,
    from: SENDGRID_FROM_EMAIL,
    name: "Pegasus Games",
    fromname: "Pegasus Games",
    subject: messageDetails.subject,
    html: messageDetails.message,
  };

  try {
    await client.send(data);
    console.log("Successfully sent an email!");
  } catch (err) {
    errorCatch(err);
  }
}

exports.handler = async (event, context, callback) => {
  // createLabel(event.queryStringParameters.session_id);

  return {
    statusCode: 302,
    headers: {
      Location: `${process.env.URL}/thankyou`
    }
  };
}
