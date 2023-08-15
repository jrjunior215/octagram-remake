const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const User = {};

User.register = (data) => {

    const { name, email, pass } = data;
    const img_pic = '/img/profile.png';

    return new Promise(function (resolve, reject) {
        dbConnection.execute("SELECT email FROM `users` WHERE email = ?", [email]).then(async ([rows]) => {
            if (rows.length > 0) {
                reject("This email already in use!")
            } else {
                const hash = await bcrypt.hash(pass, 10).then((hash_pass) => {
                    dbConnection.execute("INSERT INTO `users`(`name`,`email`,`password`, `role`, `img`) VALUES(?,?,?,?,?)", [name, email, hash_pass, "USER", img_pic])
                }).catch(err => {
                    if (err) throw err;
                });
                resolve(true)
            }
        }).catch(err => {
            if (err) throw err;
        });
    });

};

User.login = async (data) => {

    const { email, pass } = data;

    return new Promise(function (resolve, reject) {
        dbConnection.execute("SELECT email FROM `users` WHERE email = ?", [email]).then(async ([rows]) => {
            if (rows.length == 1) {
                dbConnection.execute("SELECT * FROM `users` WHERE `email` = ?", [email]).then(async ([rows]) => {
                    const hash = await bcrypt.compare(pass, rows[0].password).then(function (result) {
                        if (result === true) {
                            resolve(rows);
                        } else {
                            reject("Incorrect email or password.");
                        }
                    }).catch(err => {
                        if (err) throw err;
                    });
                }).catch(err => {
                    if (err) throw err;
                });
            } else {
                reject("No email.");
            }
        });
    });

};

User.creator = async (id_user) => {

    const queryString = `SELECT *,creators.id AS id_creator, creators.img AS img_creator FROM creators JOIN users ON creators.id_user = users.id WHERE id_user = '${id_user}'`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        });
    });

};

User.profile = async (data, imageUrl) => {
    const { id_user, name, email } = data;
    const queryString = `UPDATE users SET name = '${name}', email = '${email}',img = '${imageUrl}' WHERE id = ${id_user}`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

User.profiletext = async (data, imageUrl) => {
    const { id_user, name, email, img} = data;
    const queryString = `UPDATE users SET name = '${name}', email = '${email}',img = '${img}' WHERE id = ${id_user}`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

User.relogin = async (id_user) => {
    const queryString = `SELECT * FROM users WHERE id = '${id_user}'`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        }).catch(err => {
            if (err) throw err;
        });
    })

};



module.exports = User;