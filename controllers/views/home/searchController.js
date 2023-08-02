const Creator = require('../../../models/Creator')

module.exports = async (req, res) => {
  const data = await Creator.show()
  res.locals.layout = 'home/layout';

  res.render('home/search', {creators:data});
}