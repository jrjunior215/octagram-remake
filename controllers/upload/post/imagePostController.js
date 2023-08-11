const Post = require('../../../models/Post')

module.exports = async (req, res) => {
  const imagePath = req.file;
  const data = req.body;
  await Post.image(filename, data);
  
  res.redirect('/creator/' + loggedIn.pname + '')
}