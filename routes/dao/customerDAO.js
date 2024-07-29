
const { ObjectId } = require('mongodb');
const getDB = require('../../utils/getDBConnection');
const { get } = require('../Controllers/customerController');
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

async function getOrdersDAO(id){
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.find({_id: ObjectId.createFromHexString(id)}).toArray();
    return result;
}

async function getProductsDAO(){
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({}).toArray();
    return result;
}

async function saveOrderDAO(data){
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.insertOne(data);
    return result;
}

async function cancelOrderDAO(orderId){
const db = await getDB()
const collection = db.collection("orders")
const result = await collection.updateOne({_id: ObjectId.createFromHexString(orderId)},{$set: {status: 'cancel'}})
return result;
}

async function getCartDAO(id){
const db = await getDB()
const collection = db.collection("cart")
const result = await collection.find({customerId: id}).toArray();
return result;
}

async function saveToCartDAO(data){
const db = await getDB()
const collection = db.collection("cart")
const result = await collection.insertOne(data)
return result;
}

async function deleteCartDAO(orderId){
const db = await getDB()
const collection = db.collection("cart")
const result = await collection.deleteOne({_id: ObjectId.createFromHexString(orderId)}, {$set: {status: 'Cancel'}})
return result;
}

module.exports = {
    regDAO,
    loginDAO,
    getOrdersDAO, 
    saveOrderDAO,
    cancelOrderDAO,
    getProductsDAO,
    getCartDAO,
    saveToCartDAO,
    deleteCartDAO
}