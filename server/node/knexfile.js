module.exports = {
  client: 'postgresql',
  connection: {
    host: 'postgres',
    database: 'postgres',
    user: 'postgres',
    password: '',
    charset: 'utf8',
  },

  migrations: {
    directory: './node_modules/gtfsdb/migrations',
  },
};
