module.exports = (req, res) => {
    res.locals.layout = 'auth/layout';
    res.render('auth/register');
}