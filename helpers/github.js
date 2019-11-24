const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName, next) => {
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      next(err);
    } else {
      next(null, res, JSON.parse(body))
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;