const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const env = require('../env');

module.exports = (router) => {

  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  router.post('/', (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'Email is required.' }); // Return error
    } else {
      if (!req.body.title) {
        res.json({ success: false, message: 'Message title is required.' }); // Return error message
      } else {
        if (!req.body.message) {
          res.json( { success: false, message: 'Message is required.' }); // Return error message
        } else {
          // Configure nodemailer and sendgrid
          // username + password 
          var options = {
            auth: {
              //api_user: process.env.SENDGRID_USERNAME,
              api_key: process.env.SENDGRID_PASSWORD
            }
          };
          var mailer = nodemailer.createTransport(sgTransport(options));

          var email = {
            to: process.env.SEND_TO,
            from: req.body.email,
            subject: req.body.title,
            text: req.body.message,
            html: req.body.message
          };

          mailer.sendMail(email, function(err, res) {
            if (err) { 
              console.log(err) 
            }
            console.log(res);
          });
          res.json({ success: true, message: 'Email sent.' }); // Return success message
        }
      }
     
    }

  });
  return router;
};