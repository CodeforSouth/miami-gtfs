import gtfs from 'gtfs';
import mongoose from 'mongoose';
const config = require('./config.json');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);

import express from 'express';
import routes from 'routes/routes';
import trips from 'routes/trips';
import protobuf from 'routes/protobuf';
import importGTFS from 'routes/importGTFS';
const app = express();
const json = require('body-parser').json();

app.use(json);

app.get('/import', importGTFS);
app.get('/api/protobuf', protobuf);
app.post('/api/v1/routes', routes);
app.post('/api/v1/trips', trips);

app.listen(3000, () => {
  console.log('Listening on port 3600!');
});
