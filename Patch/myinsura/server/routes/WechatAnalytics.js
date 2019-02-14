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
                msg:"���ױ���",
                error:error.toString(10)
            })
        } else {
            if(result[0] == -3) {//�ж�״ֵ̬//inner error
                res.json({
                    status:"success",
                    code:"-3",
                    msg:"��Լ�������⣬���Ժ����Ի���ϵ����Ա",
                    data:null
                })
            } else if (result[0] == -1) {//params error
})
module.exports = router;