const Post = require('../../../models/Post')

module.exports = async (req, res) => {
    const data = req.body;
    await Post.text(data);

    res.redirect('/creator/' + loggedIn.pname + '');
}