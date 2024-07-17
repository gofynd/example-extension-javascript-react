const Redis = require('ioredis');
const config = require('../config');

function connect(name, uri) {
  const db = new Redis(uri, {
    reconnectOnError: function (err) {
      var targetError = 'EAI_AGAIN';
      if (err.message.includes(targetError)) {
        return true;
      }
    },
  });
  db.on('connect', () => {
    console.log(`Redis ${name} connected.`);
  });
  db.on('error', () => {
    console.error(`Redis ${name} got error`);
  });
  db.on('reconnecting', () => {
    console.log(`Redis ${name} got error`);
  });
  return db;
}

const hostRedis = connect('Host Read Write', config.redis.host);

module.exports = { appRedis: hostRedis };
