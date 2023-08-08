const User = require('../../models/User')

module.exports = async (req, res) => {
    const data = req.body;
    const Login = await User.login(data).then( async(result) => {
        if (result[0].role === "USER") {
            req.session.userId = result[0]
            res.redirect('/home');
        } else if (result[0].role === "ADMIN") {
            req.session.userId = result[0]
            res.redirect('/');
    
        } else if (result[0].role === "CREATOR") {
            const id_user = result[0].id;
            const Creator = await User.creator(id_user);
            req.session.userId = Creator[0]
            res.redirect('/creator/' + Creator[0].pname + '');
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