require('dotenv').config();

module.exports = {
    db_uri: "mongodb+srv://be-documen-main-db-04eef909a4b:Y9UHnrrcKSddNFm8wGaXu5mXsmgSJp@prod-us-central1-3.yr9so.mongodb.net/be-documen-main-db-04eef909a4b",
    TOKEN_KEY: "iwDAqfag26WXbtkUaNY3mp+wbGsiO8tVJw4G3/NAM7VcOMMoD590BiaBmFUaXqsup80=",
    cookie: "document-writer-cookies",
    collection: {
        document: "documents",
        user: "users"
    },
    db_option: {
        limit: 10
    },
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 900000,
    postUrl: 'https://jsonplaceholder.typicode.com/posts'
}