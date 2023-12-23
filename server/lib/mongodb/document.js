const { connect, status, createResData } = require("./index");
const config = require('../../config');
var ObjectId = require('mongodb').ObjectId; 

const create = async (userid) => {
    try {
        let client = await connect();
        
        let dbo = client.db();
        let newDoc = {
            owner: userid,
            publish: false,
            create_at: new Date().toUTCString(),
            modify_at: new Date().toUTCString(),
            title: "New Document",
            data: ""
        }
        let docId = await dbo.collection(config.collection.document).insertOne(newDoc);
        
        // await client.close();
        return createResData(status.OK, {doc: {
            _id: docId.insertedId,
            ...newDoc
        }});
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
                publish: 1,
                create_at: 1,
                modify_at: 1,
                _id: 1,
                sort: {
                    modify_at: 1
                }
            }
        )
        .limit(limit)
        .skip((page - 1) * limit)
        .toArray();

        let countDocument = await dbo.collection(config.collection.document).countDocuments({
            title: new RegExp(key),
            owner: userid
        });

        // await client.close();
        return createResData(status.OK, {list: all, max: Math.ceil(countDocument/limit)});
    } 
    catch(err) {
        console.error(err);
        return createResData(status.NOT_VALID);
    }
}

const info = async (userid, docid) => {
    try {
        let client = await connect();
        
        let dbo = client.db().collection(config.collection.document);
        
        let document = await dbo.find({
            _id: new ObjectId(docid)
        }).toArray();

        // await client.close();

        if(document.length !==0 && (document[0].publish || document[0].owner === userid)) {
            return createResData(status.OK, {info: {...document[0], editable: document[0].owner === userid}});
        }
        else {
            return createResData(status.NOT_FOUND);
        }
    }
    catch(err) {
        console.log(err);
        return createResData(status.NOT_VALID);
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
            return createResData(status.NOT_FOUND);
        }
        else {

            let newDoc = {
                ...doc[0],
                title: data.title,
                data: data.data,
                publish: data.publish,
                modify_at: new Date().toUTCString()
            }

            await dbo.collection(config.collection.document).replaceOne({
                _id: new ObjectId(data._id),
                owner: userid
            }, newDoc);
            return createResData(status.OK, {doc: newDoc});
        }
    } 
    catch(err) {
        return createResData(status.NOT_VALID);
    }
}

const remove = async (userid, docid) => {
    try {
        let client = await connect();

        let dbo = client.db();
        
        let document = await dbo.collection(config.collection.document).find({
            _id: new ObjectId(docid),
            owner: userid
        }).toArray();

        if(document.length !==0 ) {
            let deleteDoc = await dbo.collection(config.collection.document).deleteOne({
                _id: new ObjectId(docid),
                owner: userid
            });

            return createResData(status.OK);
            
        }
        else {
            // await client.close();
            return createResData(status.NOT_FOUND);
        }
    }
    catch(err) {
        console.log(err);
        return  createResData(status.NOT_VALID);
    }
}

module.exports = {
    get, create, info, update, remove
}