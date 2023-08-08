module.exports = async (req, res) => {
    res.locals.layout = 'home/layout';
    res.render('home/message');
  }