const { connect, createResData, status } = require("./index");

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

        await client.close();
        return createResData(status.OK);
    }
    catch (err) {
        return createResData(status.NOT_VALID);
    }


}

const login = async (request) => {
    try {
        let client = await connect();
        let {email} = request;
        let dbo = client.db();

        let user = await dbo.collection("users").find({
            email: email
        }).toArray();

        if(user.length !== 0) {
            user = {
                ...user[0],
                _id: user[0]._id.toString()
            };
        }
        else {
            let userid = await dbo.collection("users").insertOne({
                email
            });

            user = {
                _id: userid.insertedId,
                email: email
            }
        }

        await client.close();
        return createResData(status.OK, user);
        
    }
    catch (err) {
        console.log(err);
        return createResData(status.NOT_VALID);
    }
}

module.exports = {
    regis, login
}