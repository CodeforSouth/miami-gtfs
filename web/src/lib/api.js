const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api/v1/'
  : null;

export default function api(endpoint, payload) {
  return fetch(`${url}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject('Request failed..');
      }
      return res.json();
    })
    .then(json => {
      if (!json.success) {
        return Promise.reject(json.error);
      }
      return json;
    });
}
