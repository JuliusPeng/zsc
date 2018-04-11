pragma solidity ^0.4.18;

contract owned {
    address public owner;

    function owned() public { owner = msg.sender; }

    modifier only_owner { if (msg.sender != owner) revert(); _; }

    function transferOwnership(address newOwner) public only_owner { owner = newOwner;  }

    function kill() public only_owner {selfdestruct(owner); }
}

// ----------------------------------------------------------------------------------------------
// Original from:
// https://theethereum.wiki/w/index.php/ERC20_Token_Standard
// (c) BokkyPooBah 2017. The MIT Licence.
// ----------------------------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/issues/20
contract ERC20Interface {
    // Get the total token supply     function totalSupply() constant returns (uint256 totalSupply);
 
    // Get the account balance of another account with address _owner
    function balanceOf(address _owner) constant returns (uint256 balance);
 
    // Send _value amount of tokens to address _to
    function transfer(address _to, uint256 _value) returns (bool success);

    // Send _value amount of token from address _from to address _to
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
 
    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.
    // this function is required for some DEX functionality
    function approve(address _spender, uint256 _value) returns (bool success); 
    
    // Returns the amount which _spender is still allowed to withdraw from _owner
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);

   // Triggered when tokens are transferred.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
 
    // Triggered whenever approve(address _spender, uint256 _value) is called.
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

/// @title ZSCTest Token (ZSCTest)
contract ZSCTestToken is owned, ERC20Interface {
    // Public variables of the token
    string private constant standard_ = 'ERC20';
    uint8  private constant decimals_ = 18;
    string private name_ = 'ZSCTest Token';  
    string private symbol_ = 'ZSCTest';
    uint256 totalTokens_ = 0; 

    // This creates an array with all balances_ 
    mapping (address => uint256) balances_;

    // Owner of account approves the transfer of an amount to another account
    mapping(address => mapping (address => uint256)) allowed_;

    // Constructor
    function ZSCTestToken(_name, _symbol) {
        // Only for testing purpose
        totalTokens_ = 1000 * 1000 * 1000 * 10**18;
        balances_[msg.sender] = totalTokens_;
        name_ = _name;
        symbol_ = _symbol;
    }

    // This unnamed function is called whenever someone tries to send ether to it 
    function () {
        revert(); // Prevents accidental sending of ether
    }

    function totalSupply() public constant returns (uint256) {
        return totalTokens_;
    }

    // What is the balance of a particular account?
    function balanceOf(address _owner) public constant returns (uint256) {
        return balances_[_owner];
    }

    // Transfer the balance from owner's account to another account
    function transfer(address _to, uint256 _amount) public returns (bool success) {
        if (_amount <= 0) return false;

        if (balances_[msg.sender] >= _amount
            && balances_[_to] + _amount > balances_[_to]) {

            balances_[msg.sender] -= _amount;
            balances_[_to] += _amount;
            Transfer(msg.sender, _to, _amount);
            return true;
        } else {
            return false;
        }     
    }
 
    // Send _value amount of tokens from address _from to address _to
    // The transferFrom method is used for a withdraw workflow, allowing contracts to send
    // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
    // fees in sub-currencies; the command should fail unless the _from account has
    // deliberately authorized the sender of the message via some mechanism; we propose
    // these standardized APIs for approval:
    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        if (_amount <= 0) return false;

        if (balances_[_from] >= _amount
            && allowed_[_from][msg.sender] >= _amount
            && balances_[_to] + _amount > balances_[_to]) {

            balances_[_from] -= _amount;
            allowed_[_from][msg.sender] -= _amount;
            balances_[_to] += _amount;
            Transfer(_from, _to, _amount);
            return true;
        } else {
            return false;
        }
    }

    // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
    // If this function is called again it overwrites the current allowance with _value.     
    function approve(address _spender, uint256 _amount) public returns (bool success) {
        if (!registered) return false;
        allowed_[msg.sender][_spender] = _amount;
        Approval(msg.sender, _spender, _amount);
        return true;
    }
 
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return allowed_[_owner][_spender];
    }


    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address _tokenAddress, uint _tokens) public only_owner returns (bool) {
        return ERC20Interface(_tokenAddress).transfer(owner, _tokens);
    }  
}
