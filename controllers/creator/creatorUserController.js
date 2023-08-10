const Creator = require('../../models/Creator')


module.exports = async (req, res) => {
    const data = req.body;
    await Creator.create(data)
    res.redirect('/home')

}