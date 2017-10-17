const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: 'http://www.aadl.org/catalog/record/1446131',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($('.item-request').text());
  })
  .catch((err) => {
    console.log(err);
  });
