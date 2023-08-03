const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const Member = {};

Member.add = async (data) => {
    const { pname, id_creator, id_user} = data
    const queryString = `INSERT membership(id_creator,id_user) VALUES(${id_creator},${id_user})`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Member.check = async (id_creator, id_user) => {
    const queryString = `SELECT * FROM membership WHERE id_creator = ${id_creator} AND id_user = ${id_user}`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            if (rows.length > 0) {
                resolve (true);
            } else {
                resolve (false);
            }
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Member.list = async (data) => {
    const query = data
    const queryString = `SELECT * FROM membership JOIN creators ON membership.id_creator = creators.id WHERE membership.id_user = ${query}`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};


module.exports = Member;