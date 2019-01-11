var express = require('express');
var router = express.Router();
const axios = require('axios');
var crypto = require('crypto');

import Insurance_user from '../public/js/insurance_user';
import ContractInfo from '../public/js/ContractInfo';

const userAbi = ContractInfo.userAbi;
const userAddress = ContractInfo.userAddress;

const account = "";
const accountkey = "";

const appid = "";
const secret = "";
const encryptKey = "";

router.post('/login', function (req, res) {
    //let code = "061QaHe20nWpvI1t4gf200y7f20QaHeQ";
    let code = req.body.Code;
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
   
    axios.get(url)
        .then(response => {
            if(response.data.errcode) {
                res.json({
                    status:"fail",
                    code:"1",
                    msg:"���û����ʶ��������",
                    data:response.data
                })
            } else {
