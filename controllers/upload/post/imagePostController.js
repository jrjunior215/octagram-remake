const Post = require('../../../models/Post')

module.exports = async (req, res) => {
  const data = req.body;
  const image = req.file.filename;
  const imageUrl = `/img/post/${image}`;

  await Post.image(data, imageUrl);
  
  res.redirect('/creator/' + loggedIn.pname + '')
};