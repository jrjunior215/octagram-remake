module.exports = async (req, res) => {
    res.locals.layout = 'creator/layout';
    res.render('creator/create/image');
  }