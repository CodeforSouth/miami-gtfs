import gtfs from 'lib/gtfs';

export default async function protobuf(req, res) {
  try {
    const buffer = await gtfs(
      'http://transit.tsomobile.com/miami/RealTimeFeed-miami'
    );
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.send('Epic Fail');
  }
}
