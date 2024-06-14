
const getDB = require('../../utils/getDBConnection');
// const getDatabase = require ('../../utils/getDBConnection')

async function loginDAO(data){
console.log("LoginDAO");
const dbObject = await getDB()
const dbCollectionObject = dbObject.collection("customers")
const resultLogin = await dbCollectionObject.findOne(data)
return resultLogin;
}

async function regDAO(data){
 console.log("DAO");
 const dbObject = await getDB()  //getDatabase returns a promise so through await we can retrieve promise data
 const collectionObject = dbObject.collection("customers")
 const result = await collectionObject.insertOne(data)  
 return result;
}

module.exports = {
    regDAO,
    loginDAO
}