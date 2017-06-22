import express from 'express';
import routes from 'routes/routes';
import protobuf from 'routes/protobuf';
const app = express();

app.get('/protobuf', protobuf);
app.post('/api/v1/routes', routes);

app.listen(3000, () => {
  console.log('Listening on port 3600!');
});
