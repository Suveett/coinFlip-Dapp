pragma solidity 0.5.12;

contract Coinflip {

  address public contractOwner;

  constructor() public {
      contractOwner = msg.sender;
  }

  modifier onlyOwner() {
      require(msg.sender == contractOwner, "You are not the owner");
      _;
  }

    uint public contractBalance;
    address public contractAddress;

    modifier costs(uint cost) {
        require(msg.value >= cost, "Minimum amount >= 0.01 ether");
        _;

    }

    event betPlaced(address user, uint bet, bool);
    event contractFunded(address contractOwner, uint amount);

    //Flip the Coin and check whether user won or lost;
    function flipCoin() public payable costs(0.01 ether) returns(bool success) {
        require(address(this).balance >= msg.value, "The contract doesnt have enough balance to play right now. Come Back later");

        if (now % 2 == 0) {
            contractBalance += msg.value;
            success = false;
        }
        else if (now % 2 == 1){
            contractBalance -= msg.value;
            msg.sender.transfer(msg.value * 2);
            success = true;
        }
        //event to be emitted
        emit betPlaced(msg.sender, msg.value, success);
        return success;
    }

    function getBalance() public view returns(address, uint, uint) {
      return(address(this), address(this).balance, contractBalance);
    }

    // withdraw all funds possible only though contractOwner address;
    function withdrawAll() public onlyOwner returns(uint){
        msg.sender.transfer(address(this).balance);
        assert(address(this).balance == 0);
        return address(this).balance;
    }

    function fundContract() public payable onlyOwner returns(uint) {

        require(msg.value != 0);
        emit contractFunded(msg.sender, msg.value);
        return msg.value;
    }
}

