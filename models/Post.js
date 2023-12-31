const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const Post = {};

Post.show = async (data) => {
    const query = data;
    const queryString = `SELECT * FROM POST WHERE id_creator = '${query} ORDER BY id DESC'`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Post.feed = async (id_user) => {
    const queryString = `SELECT * FROM membership WHERE id_user = '${id_user} ORDER BY id DESC'`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {

            if (rows.length > 0) {

                const result = [];

                for (var i = 0; i < rows.length; i++) {
                    const queryPost = rows[i].id_creator
                    const processedData = queryPost

                    result.push(processedData);
                }

                const postString = `SELECT post.*,creators.pname,creators.img,post.img AS img_post  FROM post JOIN creators ON creators.id = post.id_creator WHERE post.id_creator IN (${result}) ORDER BY id DESC`
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

Post.text = async (data) => {
    const { id_creator, title, desc } = data;
    const desca = '`desc`';
    const queryString = `INSERT INTO post(id_creator, title, ${desca}) VALUES('${id_creator}', '${title}', '${desc}')`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Post.image = async (data, imageUrl) => {
    const { id_creator, title, desc } = data;
    const desca = '`desc`';
    const queryString = `INSERT INTO post(id_creator, title, ${desca}, img) VALUES('${id_creator}', '${title}', '${desc}', '${imageUrl}')`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

module.exports = Post;