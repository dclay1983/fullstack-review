const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});
mongoose.Promise = require('bluebird');

const db = mongoose.connection;

const repoSchema = mongoose.Schema({
  id:Number,
  name: String,
  updated: Date,
  url: String,
  userId: Number,
  userName: String,
  userAvatar: String,
  userUrl: String,
});

db.on('error', console.error.bind(console, 'connection error:'));

const Repo = db.model('Repo', repoSchema);

const save = function (repos, next) {
  repos.forEach((repo, index) => {
    const record = {
      id: repo.id,
      name: repo.name,
      updated: new Date(repo.updated_at),
      url: repo.html_url,
      userId: repo.owner.id,
      userName: repo.owner.login,
      userAvatar: repo.owner.avatar_url,
      userUrl: repo.owner.html_url,
    };
    Repo.findOneAndUpdate({id: record.id}, record, {upsert: true}, function (err, result) {
      if(err) {
        next(err);
      } else {
        if (index === repos.length - 1) {
          next();
        }
      }
    });
  });
}

const search = function (next) {
  const query = Repo.find().sort('-updated').limit(25);
  query.exec(function (err, results) {
    next(err,results);
  })
}

module.exports.save = save;
module.exports.search = search;