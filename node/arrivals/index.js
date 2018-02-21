module.exports = async (req, res) => {
  const { kind, id: stopId } = req.params;
  let arrivals;
  switch (kind) {
    case 'rail':
      arrivals = await require('./trains')(stopId);
      break;
    default:
      arrivals = [];
  }
  res.send({
    arrivals
  });
};
