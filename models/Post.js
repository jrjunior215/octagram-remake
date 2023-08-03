const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const Post = {};

Post.show = async (data) => {
    const query = data;
    const queryString = `SELECT * FROM POST WHERE id_creator = '${query}'`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

module.exports = Post;