const Post = require('../../../models/Post')

module.exports = async (req, res) => {

  const id_user = loggedIn.id;
  const post_data = await Post.feed(id_user);

  res.locals.layout = 'home/layout';
  res.render('home/index', { posts: post_data });
}