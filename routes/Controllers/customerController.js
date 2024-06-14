
var express = require('express')
const { regService, loginService } = require('../Services/customerServices')
var router = express.Router()
const jwt = require('jsonwebtoken')
const validateToken = require('../../utils/validateToken')

router.post("/login", async (req, res, next) => {
    try {
        console.log('login')
        var data = req.body.data
        const login = await loginService(data)
        res.send(login);
    }
    catch (exception) {
        console.error(exception)
        res.send(exception.message)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        console.log('controller');
        var data = req.body.data
        const result = await regService(data)
        // you can not directly return with return keyword to the client so we will use res
        res.send(result)
    }
    catch (exception) {
        console.log(exception)
        return `customer controller error ${exception.message}`
    }
})

router.get("/orders-list", validateToken,
function (req, res, next) {
    res.send("get Orders")
}
   )
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