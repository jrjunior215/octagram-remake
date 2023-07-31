const User = require('../../models/User')

module.exports = async (req, res) => {
    const data = req.body;

    const reigster = await User.register(data).then((result) => {
        res.redirect('/login')
    }).catch((error) => {
        res.locals.layout = 'auth/layout';
        res.render('auth/register', {
            register_error: error,
            old_data: data
        });
    })

}