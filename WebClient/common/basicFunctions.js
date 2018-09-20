/*
Copyright (c) 2018 ZSC Dev Team
*/


function bF_getEthAccount() {
    //console.log(web3.eth.accounts[0])
    var account = web3.eth.accounts[0];
    //if (account == undefined) alert("Need to login in MetaMask!!");
    return account;
}

function bF_getGasPrice() {
    return 20 * 1000000000; //20 * gwei
}

function bF_getGasLimit() {
    var limit = 600;
    return limit * 10**4; //limits * 1 million
}

function bF_showHashResult(elementID, hash, func) {
    web3.eth.getTransactionReceipt(hash, 
    function(error, result){ 
        if(!error) {
            var show;
            if (result == null) {
                show =  "(pending)" + hash ;
                bF_showHashResult(elementID, hash, func);
            } else {
                if (result.status == 0) {
                    show = "(failure)" + hash;
                } else {
                    show = "(succeeded)" + hash ;
                    func();
                }
            }
            document.getElementById(elementID).innerText = show;
        } else {
            console.log("error: " + error);
        }
    });
}

function bF_fixedNumberFromWei(value, n) {
    var num = web3.fromWei(value, 'ether');
    return Number(num).toFixed(4);
}

function bF_scondsToDate(secs) {
    if (secs == 0) return "~";
    var curdate = new Date(null);
    curdate.setTime(secs * 1000);
    return (curdate.toLocaleString());
}

function bF_robotParaValue = function(value, tag) { 
    if (tag == "FromWei") {
        return bF_fixedNumberFromWei(value, 4);
    } else if (tag = "Time") {
        return bF_secondsToDate(value);
    } else if (tag = "Prob") {
        return (value / 100 + "%");
    } else {
        return value;
    }
}
