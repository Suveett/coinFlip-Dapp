var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    contractInstance = new web3.eth.Contract(abi, web3.utils.toChecksumAddress("0xBd8Faa10595d86c39a89AD0e21041ee0E0cF0202"), {from : accounts[0]});
    console.log(contractInstance);
    console.log(`Use Contract address: ${contractInstance._address}`)

    });

    $("#flip_button").click(flipCoin);
    $("#get_balance").click(fetchAndDisplay);
    $("#fund_contract_button").click(fundContract);
    $("#withdraw_funds").click(withdrawAll);



});

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

      };


      function fetchAndDisplay(){
          contractInstance.methods.getBalance().call().then(function(res){
            $("#jackpot_output").text("The Contract has : " + web3.utils.fromWei(res[1], "ether") + "Ether");

          })
      };


      function fundContract(){
        var fund = $("#fund_contract").val();
        var config = {
          value : web3.utils.toWei(fund, "ether")
        }
        contractInstance.methods.fundContract().send(config)
        .on("transactionHash", function(hash){
          console.log(hash);
        })
        .on("confirmation", function(confirmationNr){
          console.log(confirmationNr);
        })
        .on("receipt", function(receipt){
          console.log(receipt);
          receipt.events.contractFunded(function(error, result){
            alert(`The Contract has now been funded by  + ${result.returnValues.amount(web3.utils.fromWei(amount, "ether"))} + Ether`);
        })
        })
      };


      function withdrawAll(){
        contractInstance.methods.withdrawAll().send();
      };
