const Creator = require('../../models/Creator')

module.exports = async (req, res) => {
  const data = req.params.pname;
  const creator_data = await Creator.page(data);
  res.locals.layout = 'home/layout';
  res.render('home/creator/user', { creators: creator_data });
}