var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(abi, "0x340c4A19652675fFf90C25Ba3C711a5a499b86b3", {from : accounts[0]});
    console.log(contractInstance);
    });

    var config1 = {
      value : web3.utils.toWei("0.5", "ether")
    }
    var config2 = {
      value : web3.utils.toWei("1", "ether")
    }

    var config3 = {
      value : web3.utils.toWei("2", "ether")
    }



    $("#open-door1").click(function(){
      contractInstance.methods.flipCoin().send(config1)
      .on("transactionHash", function(hash){
        console.log(hash);
      })
      .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
      })
      .on("receipt", function(receipt){
        console.log(receipt);
        alert("Funds received!");
        if(receipt.events.betPlaced.returnValues[2] === false){
            alert("You lost " +  " 0.5 Ether!");
        }
        else if(receipt.events.betPlaced.returnValues[2] === true){
            alert("You won "  + " 0.5 Ether!");
        }
      });

    });

    $("#open-door2").click(function(){
      contractInstance.methods.flipCoin().send(config2)
      .on("transactionHash", function(hash){
        console.log(hash);
      })
      .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
      })
      .on("receipt", function(receipt){
        console.log(receipt);
        alert("Funds received!");
        if(receipt.events.betPlaced.returnValues[2] === false){
            alert("You lost "  + " 1 Ether!");
        }
        else if(receipt.events.betPlaced.returnValues[2] === true){
            alert("You won "  + " 1 Ether!");
        }
      })
    });

    $("#open-door3").click(function(){
      contractInstance.methods.flipCoin().send(config3)
      .on("transactionHash", function(hash){
        console.log(hash);
      })
      .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
      })
      .on("receipt", function(receipt){
        console.log(receipt);
        if(receipt.events.betPlaced.returnValues[2] === false){
            alert("You lost " + " 2 Ether!");
        }
        else if(receipt.events.betPlaced.returnValues[2] === true){
            alert("You won "  + " 2 Ether!");
        }
      })
    });
});
