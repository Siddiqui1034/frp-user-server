const mongo = require('mongodb');

async function getDB(data){

    try{
        const url = "mongodb+srv://nausheen:14Nausheen$@finalproject.z9dhgcu.mongodb.net/"
        const mongoClient = mongo.MongoClient;
        const server = await mongoClient.connect(url) //returns a promise so hold result with await and write in try it always gives success response
        const dbObject = server.db("e-commerce")
        console.log(dbObject);
        return dbObject;  // return a promise 
    }
    catch(exception){
        console.error(exception)
        return `Database Connection Error ${exception.message}`
    }
}

module.exports = getDB
