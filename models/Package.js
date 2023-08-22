const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const Package = {};

Package.create = async (data) => {
    const { id_creator, price, title, desc } = data;
    const desca = '`desc`';
    const queryString = `INSERT INTO package(id_creator, price, title, ${desca}) VALUES(${id_creator}, ${price}, '${title}', '${desc}')`
    console.log(queryString);
    
    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Package.list = async (data) => {
    const queryString = `SELECT * FROM package WHERE id_creator = '${data}'`
    
    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Package.list2 = async (id_creator) => {
    const queryString = `SELECT * FROM package WHERE id_creator = '${id_creator}'`
    
    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Package.find = async (id_package) => {
    const queryString = `SELECT * FROM package WHERE id = '${id_package}'`
    
    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows)
        }).catch(err => {
            if (err) throw err;
        });
    })

};


module.exports = Package;