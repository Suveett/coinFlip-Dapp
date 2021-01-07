
   var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(abi, web3.utils.toChecksumAddress("0xB810CAd9759F2CdbDcd9ec0d527000db51e70B70"), {from : accounts[0]});
    console.log(contractInstance);
    });

  
    $("#flip_button").click(flipCoin);
  
  
    
    function flipCoin(){
        var bet = $("#bet_input").val();
        var config = {
            value: web3.utils.toWei(bet,"ether")
        }
        contractInstance.methods.flipCoin().send(config)
        .on("transactionHash", function(hash){
            console.log(hash);
        })
        .on("confirmation", function(confirmationNr){
            console.log(confirmationNr);
        })
        .on("receipt", function(receipt){
            console.log(receipt);
            if(receipt.events.betPlaced.returnValues[2] === false){
                alert("You lost " + bet + " Ether!");
            }
            else if(receipt.events.betPlaced.returnValues[2] === true){
                alert("You won " + bet + " Ether!");
            }
        })


    }
});
