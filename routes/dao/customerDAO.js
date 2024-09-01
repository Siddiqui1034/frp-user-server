
const { ObjectId } = require('mongodb');
const getDB = require('../../utils/getDBConnection');
const { get } = require('../Controllers/customerController');
// const getDatabase = require ('../../utils/getDBConnection')


async function loginDAO(data) {
    // console.log("LoginDAO");
    const dbObject = await getDB()
    const dbCollectionObject = dbObject.collection("customers")
    const resultLogin = await dbCollectionObject.findOne(data)
    if (resultLogin) {
        const cart = dbObject.collection("cart")
        const count = await cart.countDocuments({ uid: resultLogin?._id?.toString() })
        resultLogin.count = count;
    }
    console.log(1122, resultLogin)
    return resultLogin;
}

async function regDAO(data) {
    console.log("DAO");
    const dbObject = await getDB()  //getDatabase returns a promise so through await we can retrieve promise data
    const collectionObject = dbObject.collection("customers")
    const result = await collectionObject.insertOne(data)
    return result;
}

// async function getOrdersDAO(id){
//     const db = await getDB()
//     const collection = db.collection("orders")
//     const result = await collection.find({ id }).toArray();
//     return result;
// }

async function getOrdersDAO(id) {
    const db = await getDB()
    const orders = db.collection("orders");
    // const products = db.collection("products");

    const result = await orders.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                productDetails: 1
            }
        }
    ]).toArray();
    console.log(1000, result)
    return result;
}

async function saveOrderDAO(data) {
    const db = await getDB()
    // const productId = ObjectId.createFromHexString(data.productId)
    const collection = db.collection("orders")
    const result = await collection.insertOne({ ...data, productId: ObjectId.createFromHexString(data.productId) });
    return result;
}

async function cancelOrderDAO(orderId) {
    const db = await getDB()
    const collection = db.collection("orders")
    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(orderId) }, { $set: { status: 'cancel' } })
    return result;
}

async function getProductsDAO() {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({}).toArray();
    return result;
}

async function getProductByIdDAO(id) {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({ _id: ObjectId.createFromHexString(id) }).toArray();
    return result[0];
}

// async function getCartDAO(id) {
//     const db = await getDB()
//     const collection = db.collection("cart")
//     const result = await collection.find({ customerId: id }).toArray();
//     return result;
// }

async function getCartDAO(id) {
    const db = await getDB()
    const collection = db.collection("cart")
    const result = await collection.aggregate([
        {
            $lookup: {
                from: "products",
                localField: 'productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                productDetails: 1
            }
        }]).toArray();
    return result;
}

async function saveToCartDAO(data) {
    const db = await getDB()
    const collection = db.collection("cart")
    // const cartItems = await collection.find({productId: data?.productId}).toArray();
    const cartItems = await collection.find({ productId: ObjectId.createFromHexString(data?.productId), uid:data?.uid }).toArray();
    if (cartItems?.length == 0) {
        const result = await collection.insertOne({ ...data, productId: ObjectId.createFromHexString(data.productId) })
        const count = await collection.countDocuments({ uid: data?.uid })
        return { ...result, count };
    } else {
        return {
            message: "Already Added to the Cart"
        }
    }

}

async function deleteCartDAO(productId, uid) {
    const db = await getDB()
    const collection = db.collection("cart")
    const result = await collection.deleteOne({ productId: ObjectId.createFromHexString(productId), uid });
    if (result?.deletedCount > 0) {
        const count = await collection.countDocuments({ uid })
        result.count = count;
    }
    return result;
}

async function addressListDAO() {
    const db = await getDB()
    const collection = db.collection("address")
    const result = await collection.find().toArray();
    return result;
}

async function saveAddressDAO(data) {
    const db = await getDB()
    const collection = db.collection("address")
    const result = await collection.insertOne(data)
    return result;
}

async function getCustomerByIdDAO(id) {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.find({ _id: ObjectId.createFromHexString(id) }).toArray();
    return result;
}

async function updateProfileDAO(id, data ) {
    const db = await getDB()
    const collection = db.collection("products")
    const result = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, {$set: data})
    return result;
}

module.exports = {
    regDAO,
    loginDAO,
    getOrdersDAO,
    saveOrderDAO,
    cancelOrderDAO,
    getProductsDAO,
    getProductByIdDAO,
    getCartDAO,
    saveToCartDAO,
    deleteCartDAO,
    saveAddressDAO,
    addressListDAO,
    getCustomerByIdDAO,
    updateProfileDAO
}