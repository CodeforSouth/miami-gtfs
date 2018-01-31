export function stop(data) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.lng, data.lat]
    },
    properties: {
      id: data.id
    }
  };
}
