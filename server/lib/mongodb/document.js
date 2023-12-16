const { connect, status, createResData } = require("./index");
const config = require('../../config');
var ObjectId = require('mongodb').ObjectId; 

const create = async (userid) => {
    try {
        let client = await connect();
        
        let dbo = client.db();
    
        let docId = await dbo.collection(config.collection.document).insertOne({
            owner: userid,
            publish: false,
            create_at: new Date().toUTCString(),
            modify_at: new Date().toUTCString(),
            title: "New Document",
            data: []
        });
        
        await client.close();
        return createResData(status.OK, {id: docId.insertedId});
    } 
    catch(err) {
        return createResData(status.NOT_VALID);
    }

}

const get = async (userid, key = "", page = 1, limit = config.db_option.limit) => {
    try {
        let client = await connect();
        let dbo = client.db();

        let all = await dbo.collection(config.collection.document).find(
            {
                title: new RegExp(key),
                owner: userid
            },
            {   
                title: 1, 
                owner: 1,
                publish: 1,
                create_at: 1,
                modify_at: 1,
                _id: 0,
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

const info = async (userid, docid) => {
    try {
        let client = await connect();

        let dbo = client.db();
        
        let document = await dbo.collection(config.collection.document).find({
            _id: new ObjectId(docid)
        }).toArray();
        await client.close();

        if(document.length !==0 ) {
            let currentDoc = document[0];
            if(currentDoc.publish || currentDoc.owner === userid) {
                return createResData(status.OK, {info: currentDoc});
            }
            else {
                return createResData(status.NO_PERMISSION);
            }
        }
        else {
            return createResData(status.NOT_FOUND);
        }
    }
    catch(err) {
        console.log(err);
        return  createResData(status.NOT_VALID);
    }
}

const update = async (userid, data) => {
    try {
        let client = await connect();

        let dbo = client.db();

        let doc = await dbo.collection(config.collection.document).find(
            {
                _id: new ObjectId(data._id),
                owner: userid
            }
        ).toArray();

        if(doc.length === 0) {
            await client.close();
            return createResData(status.NOT_FOUND);
        }
        else {
            doc = doc[0];

            await dbo.collection(config.collection.document).replaceOne({
                _id: new ObjectId(data._id),
                owner: userid
            }, {
                ...doc,
                title: data.title,
                data: data.data,
                publish: data.publish,
                modify_at: new Date().toUTCString()
            });
            return createResData(status.OK);
        }
    } 
    catch(err) {
        return createResData(status.NOT_VALID);
    }
}

module.exports = {
    get, create, info, update
}