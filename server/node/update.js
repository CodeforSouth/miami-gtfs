const knexconfig = require('./knexfile');
const knex = require('knex')(knexconfig);

const gtfsdb = require('gtfsdb')(knex);
const gtfsconfig = require('./config.js');

gtfsdb.download(gtfsconfig).catch(console.error).then(() => {
  process.exit();
});
