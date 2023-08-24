const paypal = require('paypal-rest-sdk');
const Member = require('../../models/Member')

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
  'client_secret': 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-'
})

module.exports = async (req, res) => {

  const data = req.body
  const price = req.body.package_price

  try {

    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:4000/success",
        "cancel_url": "http://localhost:4000/cancel"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "Book",
            "sku": "001",
            "price": "25.00",
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": "25.00"
        },
        "description": "Hat for the best team ever"
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
            const successRedirectUrl = `${approvalUrl}&itemPrice=${price}`;
            Member.add(data);
            res.redirect(successRedirectUrl);
            // res.redirect(payment.links[i].href);
          }
        }
      }
    });

  } catch (error) {
    console.log(error.message);
  }

}