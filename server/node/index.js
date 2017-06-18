import express from 'express';
import api from 'routes/api';
const app = express();

app.use('/', api);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.stack);
});

app.listen(3000, () => {
  console.log('Listening on port 3600!');
});
