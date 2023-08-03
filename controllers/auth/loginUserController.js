const User = require('../../models/User')

module.exports = async (req, res) => {
    const data = req.body;
    const Login = await User.login(data).then( async(result) => {
        if (result[0].role === "USER") {
            req.session.userId = result[0]
            res.redirect('/home');
            const id_user = result[0].id
        } else if (result[0].role === "ADMIN") {
            req.session.userId = result[0]
            res.redirect('/');
    
        } else if (result[0].role === "CREATOR") {
            req.session.userId = result[0]
            res.redirect('/');
        } else {
            req.session.userId = result[0]
            res.redirect('/');
        }
    }).catch((error) => {
        res.locals.layout = 'auth/layout';
        res.render('auth/login', {
            login_error: error,
            old_data: data
        });
    })
}