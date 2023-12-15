const { connect } = require("./index");

const regis = (request) => {

    connect().then(client => {
        let {username, password} = request;
        let dbo = client.db();

        dbo.collection("users").insertOne({username, password}, (err, res) => {

            if (err) throw err;
            console.log("1 user inserted");
            client.close();

        });
    });

}

module.exports = {
    regis
}