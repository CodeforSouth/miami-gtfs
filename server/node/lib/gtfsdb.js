import knexconfig from 'knexfile.js';
const knex = require('knex')(knexconfig);
const gtfsdb = require('gtfsdb')(knex);

export default gtfsdb;
