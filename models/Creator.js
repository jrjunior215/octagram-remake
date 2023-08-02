const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const Creator = {};

Creator.show = async (data) => {
    return new Promise(function (resolve, reject) {
        dbConnection.execute("SELECT * FROM `creators` WHERE STATUS = 1").then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Creator.find = async (data) => {
    const query = data;
    const queryString = `SELECT * FROM creators WHERE pname LIKE '%${query}%' AND STATUS = 1`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Creator.page = async (data) => {
    const query = data;
    const queryString = `SELECT * FROM creators WHERE pname LIKE '%${query}%'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

module.exports = Creator;