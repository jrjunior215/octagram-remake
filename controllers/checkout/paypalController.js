const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AVJ6mtFBreT1lVa-vxp-XDi6j-5EyLLNzywpRJ3ECLCVChiNbytq5OewOfHMX3a1W4xOraTdyYF5scPr',
    'client_secret': 'EHj6li2g7QMf2RHr3SZ-Q8RrE4kE6xbdNGlcwX4nQwBGR_Zd7JYY1-b0clpdMrkVVuvFxo69obB9Pi5n'
  })
  

module.exports = async (req, res) => {

    const data = req.body
    const price = req.body.package_price
    
    const payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:4000/home',
          cancel_url: 'http://localhost:4000/cancel',
        },
        transactions: [{
          amount: {
            total: price,
            currency: 'USD',
          },
          description: 'Sample Payment',
        }],
      };
    
      paypal.payment.create(payment, (error, payment) => {
        if (error) {
          console.error(error);
        } else {
          // Redirect the user to the PayPal approval URL
          for (let link of payment.links) {
            if (link.rel === 'approval_url') {
              res.redirect(link.href);
            }
          }
        }
      });
}