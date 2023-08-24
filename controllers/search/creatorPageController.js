const Creator = require('../../models/Creator')
const Member = require('../../models/Member')
const Post = require('../../models/Post')
const Package = require('../../models/Package')

module.exports = async (req, res) => {
  const data = req.params.pname;
  const creator_data = await Creator.page(data);

  const id_creator = creator_data[0].id;
  const id_user = loggedIn.id;

  const package_data = await Package.list2(id_creator);
  const post_data = await Post.show(id_creator);
  const check = await Member.check(id_creator, id_user);

  res.locals.layout = 'home/layout';
  // res.render('home/creator/user');
  res.render('home/creator/user', { creators: creator_data, posts: post_data, checks: check, packages: package_data });
}