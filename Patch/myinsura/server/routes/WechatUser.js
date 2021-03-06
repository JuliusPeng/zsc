var express = require('express');
var router = express.Router();

import Insurance_user from '../public/js/insurance_user';
import ContractInfo from '../public/js/ContractInfo';

const userAbi = ContractInfo.userAbi;
const userAddress = ContractInfo.userAddress;

const account = "";
const accountkey = "";

router.get('/size', function (req, res) {
    let insurance_user = new Insurance_user(userAbi,userAddress);
    insurance_user.size(function(error, result) {
        if(error) {
            res.json({
                status:"error",
                code:"-9",
                msg:"交易报错",
                error:error.toString(10)
            })
        } else {
            res.json({
                status:"success",
                code:"0",
                msg:"获取成功",
                data:result
            })
        }
    })
})

//注册
router.post('/signUp', function (req, res) {
    //let key = "ddroyce@163.com";
    //let para = {"Key": "13661505315","Password": "12345678","NickName": "贝克小将","SignUpTime": "1538797740","UpdateTime": "1538797750"};
    let key = req.body.Key ;
    let para = req.body;
    para = JSON.stringify(para);
    let temKey = "DB_User";
    let insurance_user = new Insurance_user(userAbi,userAddress);
    insurance_user.getByKey(0,key,function(error, result) {
        if(error) {
            console.log(error);
            res.json({
                status:"error",
                code:"-9",
                msg:"交易报错",
                error:error.toString(10)
            })
        } else {
            console.log(key+"=2==="+para);
            if(result.status == ""){
                console.log("=====padding=====")
            } else {
                if(result.status == "0x0") {
                    res.json({
                        status:"fail",
                        code:"-6",
                        msg:"交易失败",
                        data:null
                    })
                } else {
                    result[0] = result[0].toString(10);
                    console.log(result);
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
                            msg:"账号有问题，请检查是否输入正确",
                            data:null
                        })
                    } else if (result[0] == 0) {//success
                        res.json({
                            status:"success",
                            code:"-4",
                            msg:"该账号已经注册过",
                            data:null
                        })
