const { connect, createResData, status } = require("./index");
const config = require("../../config");
const { newToken } = require("../jwt");

const regis = async (request) => {
    try {
        let client = await connect();
        let {username, password, avatar} = request;
        let dbo = client.db();

        let email = await dbo.collection("users").find({username: username}).toArray();
        if(email.length !==0) {
            await client.close(); 
            return createResData(status.SAME)
        };

        let userid = await dbo.collection("users").insertOne({
            username: username, 
            password: password, 
            avatar: avatar
        });

        token = newToken({
            id: userid.insertedId,
            username: username,
            avatar: avatar
        }, "72h");

        await client.close();
        return createResData(status.OK, {token: token});
    }
    catch (err) {
        return createResData(status.NOT_VALID);
    }


}

const login = async(request) => {
    try {
        let client = await connect();
        let {username, password} = request;
        let dbo = client.db();

        let user = await dbo.collection("users").findOne({
            username: username
        });

        await client.close();
        
        if(user.password === password) {
            token = newToken({
                id: user._id,
                username: username,
                avatar: user.avatar
            }, "72h");
            
            return createResData(status.OK, {token: token})
        }
        else {
            return createResData(status.NO_PERMISSION);
        }
        
    }
    catch (err) {
        return createResData(status.NOT_VALID);
    }
}

module.exports = {
    regis, login
}