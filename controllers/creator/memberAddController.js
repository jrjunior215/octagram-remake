const Member = require('../../models/Member')

module.exports = async (req, res) => {

    const data = req.body;
    const { pname, id_creator, id_user} = data
    await Member.add(data);
    res.redirect(`/${pname}`);

}