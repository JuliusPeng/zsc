/*
Copyright (c) 2018, ZSC Dev Team
*/

pragma solidity ^0.4.21;

import "./sys_com_module.sol";

contract SysGmString is SysComModule {

    struct ParameterValues {
        uint count_;
        /* index => parameter */
        mapping(uint => bytes32) index_;
        /* parameter => register */
        mapping(bytes32 => bool) register_;
        /* parameter => string */
        mapping(bytes32 => string) strings_;
    }

    /* database name => user name => entity name => parameter value */
    mapping(bytes32 => mapping(bytes32 => mapping(bytes32 => ParameterValues))) private entitys_;

    constructor(bytes32 _name) public SysComModule(_name) {}

    function addEntityParameter(bytes32 _dbName, bytes32 _userName, bytes32 _enName, bytes32 _parameter) public returns (bool) {
        /* check delegate */
        checkDelegate(msg.sender, 1);

        /* check register */
        if(true == entitys_[_dbName][_userName][_enName].register_[_parameter])
        {
            return true;
        }
        
        uint count = entitys_[_dbName][_userName][_enName].count_;
        entitys_[_dbName][_userName][_enName].index_[count] = _parameter;
        entitys_[_dbName][_userName][_enName].register_[_parameter] = true;
        entitys_[_dbName][_userName][_enName].count_ ++;

        return true;
    }

    function setEntityParameterValue(bytes32 _dbName, bytes32 _userName, bytes32 _enName, bytes32 _parameter, string _value) public returns (bool) {
        /* check delegate */
        checkDelegate(msg.sender, 1);

        /* check register */
        if(false == entitys_[_dbName][_userName][_enName].register_[_parameter])
        {
            require(addEntityParameter(_dbName, _userName, _enName, _parameter));
        }

        entitys_[_dbName][_userName][_enName].strings_[_parameter] = _value;

        return true;
    }

    function numEntityParameters(bytes32 _dbName, bytes32 _userName, bytes32 _enName) public constant returns (uint) {
        /* check delegate */
        checkDelegate(msg.sender, 1);

        return  entitys_[_dbName][_userName][_enName].count_;
    }

    function getEntityParameterNameByIndex(bytes32 _dbName, bytes32 _userName, bytes32 _enName, uint _index) public constant returns (bytes32) {
        bytes32 parameter;
        return parameter;
    }

    function getEntityParameterValue(bytes32 _dbName, bytes32 _userName, bytes32 _enName, bytes32 _parameter) public constant returns (string) {
        string memory str;
        return str;
    }
}