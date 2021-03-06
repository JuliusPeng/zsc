var express = require('express');
var router = express.Router();

import Insurance_analytics from '../public/js/insurance_analytics';
import ContractInfo from '../public/js/ContractInfo';

const analyticsAddress = ContractInfo.analyticsAddress;
const analyticsAbi = ContractInfo.analyticsAbi;

const account = "0x6A76fb522F948CfB7d6d929408D6aD5876E7139F";
const accountkey = "0x805fd8b8d4aeee085b220b44caa5a73af77aa23fbebfc1a7e09d2150887c6e21";

router.get('/getKeys', function (req, res) {
    let insurance_analytics = new Insurance_analytics(analyticsAbi,analyticsAddress);
    let id = 0;
    let count = 100;
    insurance_analytics.getKeys(id,count,function(error, result) {
        if(error) {
            res.json({
                status:"error",
                code:"-9",
                msg:"交易报错",
                error:error.toString(10)
            })
        } else {
            if(result[0] == -3) {//判断状态值//inner error
                res.json({
                    status:"success",
                    code:"-3",
                    msg:"合约出现问题，请稍后再试或联系管理员",
                    data:null
                })
            } else if (result[0] == -1) {//params error
                res.json({
                    status:"success",
                    code:"-1",
                    msg:"参数有问题，请检查是否输入正确",
                    data:null
                })
            } else if (result[0] == -2) {//no data
                res.json({
                    status:"success",
                    code:"-2",
                    msg:"没有公司及险种",
                    data:null
                })
            }  else if (result[0] == 0) {//success
                res.json({
                    status:"success",
                    code:"0",
                    msg:"订单获取成功",
                    data:result
                })
            }
        }
    })
})
module.exports = router;