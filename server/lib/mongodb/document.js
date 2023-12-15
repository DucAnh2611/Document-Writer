const { connect, status, createResData } = require("./index");
const config = require('../../config');

const create = async (userid) => {
    try {
        let client = await connect();
        
        let dbo = client.db();
    
        let docId = await dbo.collection(config.collection.document).insertOne({
            owner: userid,
            title: "New Document",
            data: []
        });
        
        await client.close();
        return createResData(status.OK, {id: docId});
    } 
    catch(err) {
        return createResData(status.NOT_VALID);
    }

}

const get = async (userid, key = 0, page = 1, limit = config.db_option.limit) => {
    try {
        let client = await connect();
        let dbo = client.db();

        let all = await dbo.collection('test').find(
            {
                title: key,
                owner: userid
            },
            {
                sort: {
                    last_modify: -1
                }
            }
        )
        .limit(limit)
        .skip((page - 1) * limit)
        .toArray();

        await client.close();
        return createResData(status.OK, {list: all});
    } 
    catch(err) {
        console.error(err);
        return createResData(status.NOT_VALID);
    }
}

const update = async (userid, data) => {
    try {
        let client = await connect();

        let dbo = client.db();


        await dbo.collection(config.collection.document).findOneAndReplace(
            {
                _id: data._id,
                owner: userid
            }, 
            {
                sort: {
                    last_modify: -1
                }
            }
        );
    } 
    catch(err) {
        return createResData(status.NOT_VALID);
    }
}

module.exports = {
    get, create
}