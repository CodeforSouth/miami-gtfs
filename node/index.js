import 'isomorphic-fetch';
const app = require('express')();

app.use(require('body-parser').json());

app.get('/positions', require('./positions'));

app.get('/arrivals/:kind/:id', require('./arrivals'));

// app.get('/schedules/:kind/:id', require('./positions'));

// app.get('/arrivals/:kind/:id', arrivals)
// app.get('/schedules/:kind/:id', schedules)

// app.get('/import', importGTFS);
// app.get('/api/protobuf', protobuf);
// app.post('/api/v1/routes', routes);
// app.post('/api/v1/trips', trips);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
