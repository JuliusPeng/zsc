/**
  Copyright (c) 2018, ZSC Dev Team
  2018-10-19: v0.00.01
 */

pragma solidity ^0.4.25;
// pragma experimental ABIEncoderV2;

contract LogisticsCore {
    function getParcel(string _num) external view returns (string, string, string, string, string);
    function getParcelEx(string _num) external view returns (string);
}

contract Ownable {
  address private owner_;

  constructor() public {
    owner_ = msg.sender;
  }

  modifier _onlyOwner() {
    require(msg.sender == owner_);
    _;
  }

  function transferOwnership(address _newOwner) external _onlyOwner {
    if (0 != _newOwner) {
      owner_ = _newOwner;
    }
  }
}

contract Logistics is Ownable {

    /** @desc core address */
    address private coreAddr_; 

    // Constructor
    constructor() public {
        coreAddr_ = 0;
    }

    modifier _checkCoreAddr() {
        require(0 != coreAddr_);
        _;
    }

    function setup(address _coreAddr) external _onlyOwner {
        // check core address
        require(0 != _coreAddr);
        
        coreAddr_ = _coreAddr;
    }

    function getLogisticsInfo(string _num) external view _checkCoreAddr returns (string) {
        // check param
        if (0 == bytes(_num).length) {
            return "";
        }

        return LogisticsCore(coreAddr_).getParcelEx(_num);
    }
}