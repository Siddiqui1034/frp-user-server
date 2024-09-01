var express = require('express')
const {
    regService,
    addressListService,
    saveAddressService,
    loginService,
    getProductsService,
    getProductByIdService,
    updateProfileService,
    saveOrderService,
    getOrdersService,
    cancelOrderService,
    getCartService,
    saveToCartService,
    deleteCartService,
    getCustomerByIdService
} = require('../Services/customerServices')
var router = express.Router()
const jwt = require('jsonwebtoken')
const validateToken = require('../../utils/validateToken')

router.post("/login",
    async function (req, res, next) {
        try {
            const result = await loginService(req)
            res.send(result);
        }
        catch (exception) {
            console.error(exception)
            res.send(exception.message)
        }
    })

router.post("/register",
    async (req, res, next) => {
        try {
            const result = await regService(req)
            // you can not directly return with return keyword to the client so we will use res
            res.send(result)
        }
        catch (exception) {
            console.log(exception)
            res.send(`customer controller error ${exception.message}`)
        }
    })

router.post("/saveOrder",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await saveOrderService(req)
                res.send(result)
            })()
        }
        catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    })

router.get("/ordersList",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await getOrdersService(req)
                // console.log("OrderListController", result)
                res.send(result);
            }
            )()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    }
)

router.delete("/cancelOrder",
    validateToken,
    function (req, res, next) {
        try {
            (async () => {
                const result = await cancelOrderService(req)
                res.send(result);
            })()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    }
)

router.post("/saveToCart",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await saveToCartService(req)
                res.send(result)
            })()
        }
        catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    })

router.get("/cartList",
    validateToken,
    function (req, res, next) {
        try {
            (async function () {
                const result = await getCartService(req)
                res.send(result);
            })()
        } catch (ex) {
            res.send(ex.message)
        }
    }
)

router.delete("/deleteCart",
    validateToken,
    function (req, res, next) {
        try {
            (async () => {
                const result = await deleteCartService(req)
                res.send(result);
            })()
        } catch (ex) {
            console.error(ex);
            res.send(ex.message)
        }
    }
)

router.get("/getProducts",
    function (req, res, next) {
        try {
            (async () => {
                const result = await getProductsService()
                res.send(result)
            }
            )()
        }
        catch (ex) {
            res.send(ex.message)
        }

    })

router.get("/getCustomerById", function (req, res, next) {
    try {
        (async () => {
            const result = await getCustomerByIdService(req)
            res.send(result);
        })()
    } catch (ex) {
        console.error(ex)
        res.send(ex.message);
    }
})

router.post('/saveAddress', validateToken, function (req, res, next) {
    try {
        (
            async function () {
                const result = await saveAddressService(req);
                res.send(result);
            }
        )()
    } catch (ex) {
        console.error(ex);
        res.send(ex.message);
    }
})

router.get('/addressList', validateToken, function (req, res, next) {
    try {
        (async function () {
            const result = await addressListService(req)
            res.send(result);
        }
        )()
    } catch (ex) {
        console.error(ex.message);
    }
}
)

// updating user Profile
router.put("/updateProfile",
    validateToken,
    function (req, res, next) {
        try {
            (async () => {
                const result = await updateProfileService(req)
                res.send(result);
            })()
        } catch (ex) {
            console.error(ex)
            res.send(ex.message);
        }
    })

module.exports = router;

/*
{
    data:{
        name: " "
    }
}
*/

/*
url: http://localhost:2024/cust/register
method: post

request payload
{
    data:{

    }
}

request payload
{

}
*/