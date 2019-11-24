const request = require('request');
if ('../config.js') {
  const config = require('../config.js');
  process.env.GITHUB_API = config.TOKEN;
}


let getReposByUsername = (userName, next) => {
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_API}`
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