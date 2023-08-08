const Post = require('../../../models/Post')

module.exports = async (req, res) => {

  const id_creator = loggedIn.id_creator; 
  const post_data = await Post.creator(id_creator);

  res.locals.layout = 'creator/layout';
  res.render('creator/index', { posts: post_data });
}