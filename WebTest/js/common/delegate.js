/*
 Copyright (c) 2018 ZSC Dev Team
*/

import Receipt from './receipt.js';
import Transaction from './transaction_raw.js';

// private member
const account = Symbol('account');
const constractAbi = Symbol('constractAbi');
const constractAddress = Symbol('constractAddress');

export default class Delegate {
    constructor(_abi, _constractAddr) {
        this[account] = web3.eth.coinbase;
        this[constractAbi] = _abi;
        this[constractAddress] = _constractAddr; 
    }

    transferOwnership(_account, _key, _newOwner, _degradePrio, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);
        let data = contractInstance.transferOwnership.getData(_newOwner, _degradePrio);

        contractInstance.transferOwnership.estimateGas(_newOwner, _degradePrio, {from: _account}, function(error, result) {
            if (!error) {
                let transaction = new Transaction(_account, _key);
                if('undefined' != typeof transaction) {
                    transaction.do("transaction", data, result, handler[constractAddress], _func);
                }
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });       
    }   

    update(_account, _key, _addr, _priority, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);
        let data = contractInstance.updateDelegate.getData(_addr, _priority);

        contractInstance.updateDelegate.estimateGas(_addr, _priority, {from: _account}, function(error, result) {
            if (!error) {
                let transaction = new Transaction(_account, _key);
                if('undefined' != typeof transaction) {
                    transaction.do("transaction", data, result, handler[constractAddress], _func);
                }
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });       
    }

    remove(_account, _key, _addr, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);
        let data = contractInstance.removeDelegate.getData(_addr);

        contractInstance.removeDelegate.estimateGas(_addr, {from: _account}, function(error, result) {
            if (!error) {
                let transaction = new Transaction(_account, _key);
                if('undefined' != typeof transaction) {
                    transaction.do("transaction", data, result, handler[constractAddress], _func);
                }
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });       
    }

    number(_func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.numberOfDelegates.estimateGas({from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("================= Delegate.numberOfDelegates() =================");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("================================================================");
                        // call 'Delegate.numberOfDelegates()'
                        contractInstance.numberOfDelegates.call({from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Number]:", result.toString(10));
                                if (null != _func) {
                                    _func(null, result);
                                }
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error);
                }
            }
        });
    }

    getInfoById(_id, _func) {
        let handler = this;
        let contractInstance = web3.eth.contract(this[constractAbi]).at(this[constractAddress]);

        // estimate gas
        // The MetaMask Web3 object does not support synchronous methods without a callback parameter
        contractInstance.getDelegateById.estimateGas(_id, {from: this[account]}, function(error, result) {
            if(!error) {
                let gasRequired = result;
                // get gas price
                // MetaMask Web3 object does not support synchronous methods without a callback parameter
                web3.eth.getGasPrice(function(error, result) {
                    if(!error) {
                        console.log("============== Delegate.getDelegateById(uint) ==============");
                        console.log("from:    ", handler[account]);
                        console.log("gas:     ", gasRequired);
                        console.log("gasPrice:", result.toString(10));
                        console.log("============================================================");
                        // call 'Delegate.getDelegateById(uint)'
                        contractInstance.getDelegateById.call(_id, {from: handler[account], gas: gasRequired, gasPrice: result}, function(error, result) { 
                            if(!error) {
                                console.log("[Delegate%s]: %s, %s", _id, result[0], result[1].toString(10));
                                if (null != _func) {
                                    _func(null, _id, result);
                                }                                
                            } else {
                                console.log(error);
                                if (null != _func) {
                                    _func(error, _id);
                                }
                            }
                        });
                    } else {
                        console.log(error);
                        if (null != _func) {
                            _func(error, _id);
                        }
                    }
                });
            } else {
                console.log(error);
                if (null != _func) {
                    _func(error, _id);
                }
            }
        });
    }
}