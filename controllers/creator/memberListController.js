const Member = require('../../models/Member')

module.exports = async (req, res) => {

    const data = loggedIn.id;
    const memberlist = await Member.list(data);
    res.json(memberlist);

}