import path from 'path';
import ProtoBuf from 'protobufjs';
import request from 'request';

function decode(feedBuffer) {
  const builder = ProtoBuf.loadProtoFile('lib/gtfs/gtfs-realtime.proto');
  const transit = builder.build('transit_realtime');
  const result = transit.FeedMessage.decode(feedBuffer);
  return result;
}

function loadGTFSRealtimeFeed(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        console.error(err, body);
        reject(err);
      }
      if (res.statusCode !== 200) {
        console.error(body);
        reject(body);
      }
      resolve(body);
    });
  });
}

export default function gtfs(url) {
  const options = {
    url,
    method: 'get',
    encoding: null
  };

  return loadGTFSRealtimeFeed(options)
    .then(feedBuffer => {
      const result = decode(feedBuffer);
      return result;
    })
    .catch(err => err);
}
