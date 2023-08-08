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

Post.feed = async (id_user) => {
    const queryString = `SELECT * FROM membership WHERE id_user = '${id_user}'`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {

            if (rows.length > 0) {

                const result = [];

                for (var i = 0; i < rows.length; i++) {
                    const queryPost = rows[i].id_creator
                    const processedData = queryPost

                    result.push(processedData);
                }

                const postString = `SELECT post.*,creators.pname,creators.img FROM post JOIN creators ON creators.id = post.id_creator WHERE post.id_creator IN (${result})`

                dbConnection.execute(postString).then(async ([rows]) => {
                    resolve(rows);
                }).catch(err => {
                    if (err) throw err;
                });

            } else {
                resolve(rows);
            }

        }).catch(err => {
            if (err) throw err;
        });
    })
};

Post.creator = async (id_creator) => {
    const query = id_creator;
    const queryString = `SELECT * FROM POST WHERE id_creator = '${query}' ORDER BY id DESC`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

module.exports = Post;