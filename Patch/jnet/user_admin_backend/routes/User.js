var express = require('express');
var router = express.Router();
const user = require('../model/User');

router.post('/addUser', function (req, res) {
    let para = {    username: req.body.username,
                    password: req.body.password };
    
    new user(para).save()

    res.json({
        status:4,
        msg:"ע��ɹ�",
        result:""
    })
})

router.post('/signin', function(req, res, next) {
    const para = {
        username: req.body.username,
        password: req.body.password
    }
    user.findOne(para, (err, doc) => {
        if (err) {
            return console.log(err);
        }
