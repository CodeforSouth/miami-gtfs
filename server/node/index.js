import express from 'express';
import routes from 'routes/routes';
import trips from 'routes/trips';
import protobuf from 'routes/protobuf';
const app = express();
const json = require('body-parser').json();

app.use(json);

app.get('/protobuf', protobuf);
app.post('/api/v1/routes', routes);
app.post('/api/v1/trips', trips);

app.listen(3000, () => {
  console.log('Listening on port 3600!');
});
