import gtfs from 'gtfs';
const config = require('../config.json');

export default async function importGTFS(req, res) {
  res.send('Starting import!');
  try {
    await gtfs.import(config);
    console.log('Successfully imported!');
  } catch (err) {
    console.log(err);
  }
}
