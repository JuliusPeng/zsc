var express = require('express');
var router = express.Router();

import Insurance_policy from '../public/js/insurance_policy';
import ContractInfo from '../public/js/ContractInfo';

const policyAbi = ContractInfo.policyAbi;
const policyAddress = ContractInfo.policyAddress;

const account = "";
const accountkey = "";

router.get('/size', function (req, res) {
    let insurance_policy = new Insurance_policy(policyAbi,policyAddress);
    insurance_policy.size(function(error, result) {
        if(error) {
            res.json({
                status:"error",
                code:"-9",
                msg:"���ױ���",
                error:error.toString(10)
            })
        } else {
            res.json({
                status:"success",
                code:"0",
                msg:"��ȡ�ɹ�",
                data:result
            })
        }
    })
})


router.post('/getById', function (req, res) {
    //let id = 0;
    let id = req.body.Id;
    let insurance_policy = new Insurance_policy(policyAbi,policyAddress);
    insurance_policy.getById(0,id,function(error, result) {
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
                res.json({
                    status:"success",
                    code:"-1",
                    msg:"���������⣬�����Ƿ�������ȷ",
                    data:null
                })
            } else if (result[0] == -2) {//no data
                res.json({
                    status:"success",
                    code:"-2",
                    msg:"�ñ���������",
                    data:null
                })
            }  else if (result[0] == 0) {//success
                res.json({
                    status:"success",
                    code:"0",
                    msg:"������ȡ�ɹ�",
                    data:result
                })
            }
        }
    })
})
