module.exports = async (req, res) => {
  const trains = await require('./trains')();
  res.send([...trains]);
};
