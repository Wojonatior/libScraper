const rp = require('request-promise');
const cheerio = require('cheerio');
let client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const options = {
  uri: 'http://www.aadl.org/catalog/record/1446131',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    const availiblity = $('.item-request').text();
    console.log(availiblity);

    if(/\d/.test(availiblity)){
      client.messages.create({ 
          to: process.env.MY_PHONE_NUMBER, 
          from: process.env.TWILIO_PHONE_NUMBER, 
          body: `OP-1: ${availiblity}`, 
      }, console.log);}
  })
  .catch(console.log);

 
