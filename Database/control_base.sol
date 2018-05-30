/*
Copyright (c) 2018 ZSC Dev Team
*/

pragma solidity ^0.4.21;

import "./object.sol";
import "./control_info.sol";

contract DBNode {
    function setId(address _ethWalletiId) public;
    function getId() public returns (address);
    function getNodeType() public constant returns (bytes32);
    function getBlance(bool _locked) public constant returns (uint256);

    function setActivated(bool _activated) public;
    function getActivated() public constant returns (bool);

    function addParameter(bytes32 _parameter) public returns (bool);
    function removeParameter(bytes32 _parameter) public returns (bool);
    function setParameter(bytes32 _parameter, bytes32 _value) public returns (bool);
    function getParameter(bytes32 _parameter) public constant returns (bytes32);
    function numParameters() public constant returns (uint);
    function getParameterNameByIndex(uint _index) public constant returns (bytes32);

    function setERC20TokenAddress(address _tokenAdr) public;
    function doesLastTransactionSigned() public constant returns (bool);
    //function submitTransaction(address _dest, uint256 _amount, bytes _data, address _user) public returns (uint);
    //function confirmTransaction(address _sigAdr) public returns (uint);    
    function executeTransaction(address _dest, uint256 _amount) public returns (uint);
    function informTransaction(address _src, address _dest, uint256 _amount) public;
    function numTransactions() public constant returns (uint);
    function getTransactionInfoByIndex(uint _index) public constant returns (uint, bool,  bytes32, uint, address, address);

    function setAgreementStatus(bytes32 _tag, bytes32 receiver) public returns (bool);
    function configureHandlers() public returns (bool);
    function getHandler(bytes32 _type) public constant returns (address);
    function numAgreements() public constant returns (uint);
    function getAgreementByIndex(uint _index) public constant returns (address);

    function numChildren() public constant returns(uint);
    function getChildByIndex(uint _index) public  constant returns(address);
    function addChild(address _node) public returns (address);

    function getMiningInfoByIndex(bool _isReward, uint _index) public constant returns (uint, uint);
    function numMiningInfo(bool _isReward) public constant returns (uint);

    function addSignature(address _sigAdr) public returns (bool);
    function getAgreementInfo() public constant returns (bytes32, bytes32, uint, uint, bytes32, uint);
}

contract DBFactory {
    function setDatabase(address _adr) public;
    function getDatabase() public constant returns (address);
    function createNode(bytes32 _nodeName, address _parent, address _creator) public returns (address);
}

contract DBDatabase {
    function getNode(bytes32 _name) public constant returns (address);
    function destroyNode(address _node) public returns (bool);
    function checkeNodeByAddress(address _adr) public constant returns (bool);
    function _addNode(address _node) public ;
}

contract ControlBase is ControlInfo {   
    address public systemOL_;
    address public zscTokenAddress_;
    address public bindedAdm_;

    bytes32 public dbName_ = "zsc";

    mapping(bytes32 => address) public databases_;
    mapping(bytes32 => address) public factories_;

    function ControlBase(bytes32 _name) public ControlInfo(_name) {
    }
    
    function getCurrentDBName() internal constant returns (bytes32) {
        return dbName_;
    }

    function initControlApisAdrs(address _zscToken, address _adm) internal {
        require (_adm != 0 && _zscToken != 0);     

        zscTokenAddress_ = _zscToken;

        bindedAdm_ = _adm;
        setDelegate(bindedAdm_, 1);

        addLog("initControlApisAdrs ", true);
    }

    function mapFactoryDatabase(bytes32 _factoryName, bytes32 _dbName, uint _priority) internal {
        addLog("mapFactoryDatabase", true);
        address factoryAdr = factories_[_factoryName];
        address dbAdr      = databases_[_dbName];

        require(factoryAdr != 0 && dbAdr != 0);

        DBFactory(factoryAdr).setDatabase(dbAdr);
        Object(dbAdr).setDelegate(factoryAdr, _priority);
    }

    function addComponent(bytes32 _type, bytes32 _name, address _adr) internal returns (bool) {
        bool ret = false;
        addLog("addComponent ", true);
        addLog(PlatString.bytes32ToString(_type), false);
        addLog(PlatString.bytes32ToString(_name), false);

        if (_type == "factory") {
            require(factories_[_name] == address(0));
            factories_[_name] = _adr;
            mapFactoryDatabase(_name, dbName_, 1);
        } else if (_type == "database") {
            require(databases_[_name] == address(0));
            databases_[_name] = _adr;        
        } else {
            revert();
        }
        return ret;
    }

    function getComponent(bytes32 _type, bytes32 _name) internal constant returns (address) {
        if (_type == "factory") {
            return factories_[_name];
        } else if (_type == "database") {
            return databases_[_name];
        } else {
            revert();
        }
    }

    function getDBFactory(bytes32 _name) internal constant returns (DBFactory) {
        return DBFactory(getComponent("factory", _name));
    }

    function getDBDatabase(bytes32 _name) internal constant returns (DBDatabase) {
        return DBDatabase(getComponent("database", _name));
    }

    function getDBNode(bytes32 _db, bytes32 _nodeName) internal constant returns (DBNode) {
        return DBNode(getDBDatabase(_db).getNode(_nodeName));
    }

    function formatWalletName(bytes32 _userName, bytes32 _tokenSymbol) internal pure returns (bytes32) {
        string memory str;
        bytes32 temp;
        if (_tokenSymbol == "ETH") {
            str = PlatString.append(_userName, "-ETH");
        } else {
            str = PlatString.append(_userName, "-", _tokenSymbol);
        }
        temp = PlatString.tobytes32(str);
    }

    function duplicateNode(address _nodeSrcAdr, address _nodeDstAdr) internal returns (bool) {
        require(_nodeSrcAdr != address(0) && _nodeDstAdr != address(0));

        bytes32 tempPara;
        bytes32 tempValue; 

        uint paraNos = DBNode(_nodeSrcAdr).numParameters();
        for (uint i = 0; i < paraNos; ++i) {
            tempPara = DBNode(_nodeSrcAdr).getParameterNameByIndex(i);
            tempValue = DBNode(_nodeSrcAdr).getParameter(tempPara);

            DBNode(_nodeDstAdr).addParameter(tempPara);
            DBNode(_nodeDstAdr).setParameter(tempPara, tempValue);
        }
        return true;
    }

    function createFactoryNode(bytes32 _type, bytes32 _userName, bytes32 _nodeName, bytes32 _extra, address _creator) internal returns (address) {
        address userAdr;
        address parentAdr;
        address ndAdr;

        if (_type == "template") {
            userAdr = address(getDBNode(dbName_, _userName));
            parentAdr = DBNode(userAdr).getHandler("template");
        } else if (_type == "agreement") {
            userAdr = address(getDBNode(dbName_, _userName));
            parentAdr = address(getDBNode(dbName_, _extra));
        }

        ndAdr = getDBFactory(_type).createNode(_nodeName, parentAdr, _creator);
        require(ndAdr != 0);

        if (_type == "provider" || _type == "receiver" || _type == "staker") {
            DBNode(ndAdr).configureHandlers();
            DBNode(ndAdr).setId(_creator);
        } 

        if (_type == "template") {
            DBNode(ndAdr).setParameter("provider", _userName);
        } else if (_type == "agreement") {
            duplicateNode(getDBNode(dbName_, _extra),  ndAdr);
            DBNode(ndAdr).setAgreementStatus("READY", "null");
        }
        return ndAdr;
    }

    function deleteAgreement( bytes32 _agrName) internal returns (bool) {
        address agrAdr = address(getDBNode(dbName_, _agrName));
        require(agrAdr != address(0));

        bytes32 status;
        bytes32 proName;
        uint price;
        uint lockedAmount;
        bytes32 tokenSymbol;
        uint endTime;

        (status, proName, price, lockedAmount, tokenSymbol, endTime) = getDBNode(dbName_, _agrName).getAgreementInfo();
        if (status == "PAID") return false;

        address agrWallet = address(getDBNode(dbName_, formatWalletName(_agrName, tokenSymbol)));
        address userWallet = address(getDBNode(dbName_, formatWalletName(proName, tokenSymbol)));
        require(agrWallet != address(0) && userWallet != address(0));

        DBNode(userWallet).executeTransaction(userWallet, lockedAmount);
        return getDBDatabase(dbName_).destroyNode(agrAdr);
    }

    function enableWalletByUser(bytes32 _enName, bytes32 _tokeSymbol, address _creator) internal returns (address) {
        address ndAdr = address(getDBNode(dbName_, _enName));
        require(ndAdr != address(0));
        
        bytes32 ndType = DBNode(ndAdr).getNodeType();
        require(ndType == "provider" || ndType == "receiver");
        require(_tokeSymbol == "ZSC" || _tokeSymbol == "ETH");

        bytes32 factoryType;
        address parentNode   = DBNode(ndAdr).getHandler("wallet");   
        bytes32 walletName = formatWalletName(_enName, _tokeSymbol);

        if (_tokeSymbol == "ETH") {
            factoryType = "wallet-eth";
        } else {
            factoryType = "wallet-erc20";
        }

        address walletAdr  = getDBFactory(factoryType).createNode(walletName, parentNode, _creator);
        require(walletAdr != 0);

        if (factoryType == "wallet-erc20") {
            DBNode(walletAdr).setERC20TokenAddress(zscTokenAddress_);  
        }  

        return walletAdr;
    }

    function conductInformTransaction(bytes32 _enName, address _dest, uint256 _amount) internal returns (bool) {
        bytes32 tokenSymbol = DBNode(_dest).getParameter("walletSymbol");
        address userWallet  = address(getDBNode(dbName_, formatWalletName(_enName, tokenSymbol)));
        DBNode(_dest).informTransaction(userWallet, _dest, _amount);
        return true;
    }

    function conductPublishAgreement(bytes32 _userName, bytes32 _agrName, address _creator) internal returns (uint) {
        checkDelegate(msg.sender, 1);

        address agrAdr = address(getDBNode(dbName_, _agrName));
        bytes32 tokenSymbol = DBNode(agrAdr).getParameter("walletSymbol");
        address userWallet = address(getDBNode(dbName_, formatWalletName(_userName, tokenSymbol)));

        require(userWallet != address(0));
        string memory temp = PlatString.bytes32ToString(DBNode(agrAdr).getParameter("lockedAmount"));
        uint lockedAmount = PlatString.stringToUint(temp);

        address agrWallet = enableWalletByUser(_agrName, tokenSymbol, _creator);
        uint amount = DBNode(userWallet).executeTransaction(agrWallet, lockedAmount);
        require(amount > 0);

        DBNode(agrAdr).setAgreementStatus("PUBLISHED", "null");
        return amount;
    }

    function conductPurchaseAgreement(bytes32 _userName, bytes32 _agrName) internal returns (uint) {
        checkDelegate(msg.sender, 1);

        address agrAdr = address(getDBNode(dbName_, _agrName));

        bytes32 tokenSymbol = DBNode(agrAdr).getParameter("walletSymbol");
        uint price          = PlatString.stringToUint(PlatString.bytes32ToString(DBNode(agrAdr).getParameter("price")));
        address recWallet   = address(getDBNode(dbName_, formatWalletName(_userName, tokenSymbol)));
        address agrWallet   = address(getDBNode(dbName_, formatWalletName(_agrName, tokenSymbol)));

        uint ret = DBNode(recWallet).executeTransaction(agrWallet, price);

        getDBNode(dbName_, _agrName).setAgreementStatus("PAID", _userName);
        getDBNode(dbName_, _userName).addChild(agrAdr);

        return ret;
    }

    function prepareTokenBalanceInfoByIndex(bytes32 _enName, uint _index) internal constant returns (string) { 
        bytes32 status;
        bytes32 tokenSymbol;
        address tokenAdr;
        uint tokenBalance;
        bytes32 walletName;

        status = "true";
        if (_index == 0) {
            tokenSymbol = "ETH";
        } else if (_index == 1) {
            tokenSymbol = "ZSC";
        } else {
            revert();
        }

        walletName   = formatWalletName(_enName, tokenSymbol);
        tokenAdr     = address(getDBNode(dbName_, walletName));
        tokenBalance = DBNode(tokenAdr).getBlance(false);

        string memory str ="";
        str = PlatString.append(str, "info?status=", PlatString.bytes32ToString(status),      "&");
        str = PlatString.append(str, "symbol=",      PlatString.bytes32ToString(tokenSymbol), "&");
        str = PlatString.append(str, "adr=",         PlatString.addressToString(tokenAdr),    "&");
        str = PlatString.append(str, "balance=",     PlatString.uintToString(tokenBalance),   "&");
        return str;
    }

    function prepareTransationfoByIndex(bytes32 _walletName, uint _index) internal constant returns (string) {
        address walletAdr = getDBNode(dbName_, _walletName);

        require(_index < DBNode(walletAdr).numTransactions());
        
        uint tranTime;
        bool isInput;
        bytes32 txHash;
        uint amount;
        address sender;
        address receiver;
        bytes32 inputTag;

        (tranTime, isInput, txHash, amount, sender, receiver) =  DBNode(walletAdr).getTransactionInfoByIndex(_index);

        if (isInput) inputTag = "true";
        else inputTag = "false";

        string memory str ="";
        str = PlatString.append(str, "info?time=", PlatString.uintToString(tranTime),    "&");
        str = PlatString.append(str, "input=",     PlatString.bytes32ToString(inputTag), "&");
        str = PlatString.append(str, "tx=",        PlatString.bytes32ToString(txHash),   "&");
        str = PlatString.append(str, "amout=",     PlatString.uintToString(amount),      "&");
        str = PlatString.append(str, "sender=",    PlatString.addressToString(sender),   "&");
        str = PlatString.append(str, "receiver=",  PlatString.addressToString(receiver), "&");
        return str;
    }
}
