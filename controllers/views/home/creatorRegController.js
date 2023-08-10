module.exports = (req, res) => {
    res.locals.layout = 'home/layout';
    res.render('home/creator');
  }