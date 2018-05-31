/*
Copyright (c) 2018 ZSC Dev Team
*/
function ZSCUser(admAdr) {
    this.admAdr = admAdr;
    this.userName;
    this.userNameHr;
    this.userStatus;
    this.userType;
    this.controlApisAdr;
    this.controlApisFullAbi;
    this.myAdmAdv = web3.eth.contract(this.getLoginAbi()).at(this.admAdr);
}
ZSCUser.prototype.setControlApisAdr = function(adr) { this.controlApisAdr = adr; } 
ZSCUser.prototype.setControlApisFullAbi = function(abi) { this.controlApisFullAbi = abi; } 
ZSCUser.prototype.getUserName = function() { return this.userName; }
ZSCUser.prototype.getUserNameHr = function() { return this.userNameHr; }
ZSCUser.prototype.getUserStatus = function() { return this.userStatus; }
ZSCUser.prototype.getUserType = function() { return this.userType; }
ZSCUser.prototype.getControlApisAdr = function() { return this.controlApisAdr; }
ZSCUser.prototype.getControlApisFullAbi = function() { return this.controlApisFullAbi; }
ZSCUser.prototype.getLoginAbi = function() { 
    return [{"constant":true,"inputs":[],"name":"getControlApisFullAbi","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getControlApisAdr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hexx","type":"bytes32"},{"name":"_type","type":"bytes32"}],"name":"activeByUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"bytes32"}],"name":"tryLogin","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_hexx","type":"bytes32"}],"name":"getUserType","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"bytes32"},{"name":"_hexx","type":"bytes32"}],"name":"keepOnline","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_hexx","type":"bytes32"}],"name":"getUserStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];
}

ZSCUser.prototype.tryLogin = function(user, func){
    var gm = this;
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.tryLogin(user, function(error, hexx) {
        if(!error) {
            if (hexx == 0x0) {
                callBack(false);
            } else {
                gm.getAdr(gm, user, hexx, func);
            }
        } else { 
            console.log("error: " + error);
        }
    });
}

ZSCUser.prototype.getAdr = function(gm, user, hexx, func){
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getControlApisAdr(function(error, adr) {
        if(!error) { 
            gm.getFullAbi(gm, user, hexx, adr, callBack);
        } else {
            console.log("error: " + error);
        }
    } );
}

ZSCUser.prototype.getFullAbi = function(gm, user, hexx, adr, func){
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getControlApisFullAbi(function(error, fullAbi) {
        if(!error) { 
            gm.userName = user;
            gm.userNameHr = hexx;
            gm.controlApisAdr = adr;
            gm.controlApisFullAbi = fullAbi;
            callBack(true);
        } else {
            console.log("error: " + error);
        }
    } );
}

ZSCUser.prototype.keepOnline = function(func){
    var callBack = func;
    var gm = this;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.keepOnline(gm.userName, gm.userNameHr, function(error, ret) {
        if(!error) callBack(ret);
        else console.log("error: " + error);
    } );
}

ZSCUser.prototype.activeByUser = function(type, hashLogId, func){
    var callBack = func;
    var gm = this;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.activeByUser(this.userNameHr, type, function(error, ret) {
        if(!error) { 
            gm.type = type;
            bF_showHashResult(ret, hashLogId, callBack);
        } else { 
            console.log("error: " + error);
        }
    } );
}

ZSCUser.prototype.getUserStatusFromAdm = function(func) {
    var gm = this;
    var callBack = func;
    var myAdmAdv = web3.eth.contract(gm.getLoginAbi()).at(gm.admAdr);

    myAdmAdv.getUserStatus(gm.userNameHr,
        function(error, ret) {
            if(!error) { 
                gm.userStatus = web3.toUtf8(ret);
                callBack(gm.userStatus);
            } else { 
                console.log("error: " + error);
             }
        } );
}

ZSCUser.prototype.getUserTypeFromAdm = function(func){
    var myContract = web3.eth.contract(this.getLoginAbi());
    var myControlApi = myContract.at(this.admAdr);

    myControlApi.getUserType(this.userNameHr,
        function(error, ret) {
            if(!error) { 
                this.userType = toUtf8(ret);
                func(this.userType);
            } else { 
                console.log("error: " + error);
             }
        } );
}

