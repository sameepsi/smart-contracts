window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
      web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "1":
            console.log('This is mainnet. Please switch to rinkeby');
            alert('This is mainnet. Please switch to rinkeby');
            break
          case "2":
            console.log('This is the deprecated Morden test network. Please switch to rinkeby');
            alert('This is the deprecated Morden test network. Please switch to rinkeby');
            break
          case "3":
            console.log('This is the ropsten test network. Please switch to rinkeby');
            alert('This is the ropsten test network. Please switch to rinkeby');
            break
          case "42":
            console.log('This is the kovan test network. Please switch to rinkeby');
            alert('This is the kovan test network. Please switch to rinkeby');
            break  
          case "4":
            App.start();
            break
          default:
            console.log('This is an unknown network.Please switch to rinkeby');
            alert('This is an unknown network.Please switch to rinkeby');
        }
      })
    }
      else{
        window.alert("Please install metamask!!")
      }
    
  
     	
  });

var traceabilityContractABI;;
var TSCMC;

window.App = {
  start: function() {

  var c = JSON.parse('[{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"startShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"sensor","type":"address"}],"name":"putSensor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"receiveShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"checkShipment","outputs":[{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getShipmentInfo","outputs":[{"name":"shipmentId","type":"uint256"},{"name":"producer","type":"address"},{"name":"shipper","type":"address"},{"name":"receiver","type":"address"},{"name":"sensor","type":"address"},{"name":"dateAdded","type":"uint256"},{"name":"lastUpdated","type":"uint256"},{"name":"currentLatitude","type":"string"},{"name":"currentLongitude","type":"string"},{"name":"status","type":"uint8"},{"name":"metadata","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"shipmentCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"shipper","type":"address"},{"name":"receiver","type":"address"},{"name":"metaData","type":"bytes"}],"name":"addShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"latitude","type":"string"},{"name":"longitude","type":"string"}],"name":"updateLocation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"refundShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"controlAuthority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_controlAuthority","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"ShipmentAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"sensor","type":"address"}],"name":"SensorPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"latitude","type":"string"},{"indexed":false,"name":"longitude","type":"string"}],"name":"LocationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"status","type":"uint8"}],"name":"StatusUpdated","type":"event"}]');
  
  traceabilityContractABI = window.web3.eth.contract(c);
  
	TSCMC = traceabilityContractABI.at("0x138f96e009a1573135dd300e0944027ada98ee64");
	
      
  var addShipmentEvent = TSCMC.ShipmentAdded({}, { fromBlock: "latest"});
  addShipmentEvent.watch(function (error, result) { 
    alert("Shipment Added with id: "+ result.args.id.toNumber());
    });

    var sensorPlacedEvent = TSCMC.SensorPlaced({}, { fromBlock: "latest"});
    sensorPlacedEvent.watch(function (error, result) { 
      alert("Sensor is placed for shipment id: "+ result.args.id.toNumber());
      });

      var locationUpdatedEvent = TSCMC.LocationUpdated({}, { fromBlock: "latest"});
      locationUpdatedEvent.watch(function (error, result) { 
    alert("Location Updated for Shipment id: "+ result.args.id.toNumber());
    });

  },  
  addShipment: function() {
    
    var name = $("#name").val();
    var shipper = $("#shipper").val();
    var receiver = $("#receiver").val();
    var metadata = $("#metadata").val();

    TSCMC.addShipment(name, shipper, receiver, metadata, {from:web3.eth.accounts[0]},function(error, result){
        if(!error){
          window.alert("Transaction sent. Please check after couple of minutes!!")
        }
        else{
          window.alert("Error Ocurred!!");
        }
    });
      
  },

  addSensor: function() {
    var id = $("#id").val();
    var sensor = $("#sensor").val();

    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{
        TSCMC.putSensor(id, sensor, {from:web3.eth.accounts[0]}, function(err, result){
          if(!error){
            window.alert("Transaction sent. Please check after couple of minutes!!")
          }
          else{
            window.alert("Error Ocurred!!");
          }
        })
      }
  });
  },

  startShipment: function() {
    var id = $("#id").val();

    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{
        TSCMC.startShipment(id, {from:web3.eth.accounts[0]}, function(err, result){
          if(!error){
            window.alert("Transaction sent. Please check after couple of minutes!!")
          }
          else{
            window.alert("Error Ocurred!!");
          }
        })
      }
  });
  },
  updateLocation: function() {
    var id = $("#id").val();
    var latitude = $("#latitude").val();
    var longitude = $("#longitude").val();

    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{
        TSCMC.updateLocation(id, latitude.toString(), longitude.toString(), {from:web3.eth.accounts[0]}, function(err, result){
          if(!error){
            window.alert("Transaction sent. Please check after couple of minutes!!")
          }
          else{
            window.alert("Error Ocurred!!");
          }
        })
      }
  });
  },

  trackLocation: function() {
    var id = $("#id").val();
    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{

        TSCMC.getShipmentInfo(id, function(error, result){

          var producer = result[1];
          var receiver = result[3];
          var shipper = result[2];
          var sensor = result[4];
          var lastUpdated = result[6];
          var lat = result[7];
          var long = result[8];
          var status = result[9];

          $.get( "http://maps.googleapis.com/maps/api/geocode/json",{latlng:lat + "," +long}, function( data ) {

            $("#producer").text(producer);
            $("#receiver").text(receiver);
            $("#shipper").text(shipper);
            $("#sensor").text(sensor);
            $("#lastUpdated").text(new Date(lastUpdated*1000));
            $("#status").text(status);
            $("#location").text(data.results[0].formatted_address);        
        });
      });

        var locationEvent = TSCMC.LocationUpdated({id:id}, { fromBlock: 2898449, toBlock: 'latest' });
        locationEvent.watch(function (error, result) { 
          var latitude = result.args.latitude;
          var longitude = result.args.longitude;
          var blockNumber = result.blockNumber;
          
          $("#trackTable").empty();

          $("<tr> <th>Date</th> <th>Location</th></tr> ").appendTo("#trackTable")

          $.get( "http://maps.googleapis.com/maps/api/geocode/json",{latlng:latitude + "," +longitude}, function( data ) {
            var $tr = $('<tr>').append(
              $('<td id='+blockNumber+'>').text(""),
              $('<td>').text(data.results[0].formatted_address)
            ).appendTo('#trackTable');   
            web3.eth.getBlock(blockNumber, function(error, data){
              $("#"+blockNumber).text(new Date(data.timestamp*1000));
            });
          });
      });
      }
  });
  },
  receiveShipment: function() {
    var id = $("#id").val();

    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{
        TSCMC.receiveShipment(id, {from:web3.eth.accounts[0]}, function(err, result){
          if(!error){
            window.alert("Transaction sent. Please check after couple of minutes!!")
          }
          else{
            window.alert("Error Ocurred!!");
          }
        })
      }
  });
  },
  refundShipment: function() {
    var id = $("#id").val();

    TSCMC.checkShipment(id,function(error, result){
      if(!result){
        window.alert("Shipment does not exists!!")
      }
      else{
        TSCMC.refundShipment(id, {from:web3.eth.accounts[0]}, function(err, result){
          if(!error){
            window.alert("Transaction sent. Please check after couple of minutes!!")
          }
          else{
            window.alert("Error Ocurred!!");
          }
        })
      }
  });
  }
};
