const Package = require('../../../models/Package')

module.exports = async (req, res) => {

  const data = loggedIn.id_creator;
  const packagelist = await Package.list(data);
  console.log(packagelist);

  res.locals.layout = 'creator/layout';
  res.render('creator/package/index', { package: packagelist });
}