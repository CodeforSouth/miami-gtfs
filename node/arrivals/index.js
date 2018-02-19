module.exports = async (req, res) => {
  const { kind, id: stopId } = req.params;
  let arrivals;
  switch (kind) {
    case 'train':
      arrivals = await require('./trains')(stopId);
      break;
    default:
      arrivals = [];
  }
  res.send({
    arrivals
  });
};
