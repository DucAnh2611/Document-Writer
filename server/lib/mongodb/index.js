const config = require('../../config');
const { MongoClient } = require('mongodb');
    
const client = new MongoClient(config.db_uri);

const connect = async () => {
    
    try {
        await client.connect();

        return client;
    } 
    catch (e) {
        console.error(e);
    } 

}

const status = {
    NOT_VALID: -1,
    NOT_FOUND: -2,
    NO_PERMISSION: -3,
    SAME: -4,
    INIT: 0,
    OK: 1
}

const createResData = (status, data) => ({
    status: status,
    data: data
})

module.exports = {
    connect, status, createResData
}