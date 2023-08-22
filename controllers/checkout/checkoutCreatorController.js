const Creator = require('../../models/Creator');
const Package = require('../../models/Package');

module.exports = async (req, res) => {
    const id_creator = req.body.id_creator;
    const id_package = req.body.id_package;

    const creator_data = await Creator.fineid(id_creator);
    const package_data = await Package.find(id_package);

    res.locals.layout = 'home/layout';
    res.render('home/checkout/checkout', { creators: creator_data, packages: package_data });
}