var should = require("should");
//var assert = require("assert");
var helper = require("node-red-node-test-helper");
var azureiothub = require("../azureiothub.js");

describe('AzureIoTHubNode Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('azureiothub should be loaded', function (done) {
    var flow = [{ id: "n1", type: "azureiothub", name: "azureiothub", credentials: {hostname: "hostname"} }];
    helper.load(azureiothub, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'azureiothub');
      n1.should.have.property('credentials', {});
    });
    done();
  });

  it('azureiothubregistry should be loaded', function (done) {
    var flow = [{ id: "n2", type: "azureiothubregistry", name: "azureiothubregistry" }];
    helper.load(azureiothub, flow, function () {
      var n2 = helper.getNode("n2");
      n2.should.have.property('name', 'azureiothubregistry');
    });
    done();
  });

  it('azureiothubreceiver should be loaded', function (done) {
    var flow = [{ id: "n3", type: "azureiothubreceiver", name: "azureiothubreceiver" }];
    helper.load(azureiothub, flow, function () {
      var n3 = helper.getNode("n3");
      n3.should.have.property('name', 'azureiothubreceiver');
    });
    done();
  });

  it('azureiothubdevicetwin should be loaded', function (done) {
    var flow = [{ id: "n4", type: "azureiothubdevicetwin", name: "azureiothubdevicetwin" }];
    helper.load(azureiothub, flow, function () {
      var n4 = helper.getNode("n4");
      n4.should.have.property('name', 'azureiothubdevicetwin');
    });
    done();
  });


  it('azureiothub should receive input', function (done) {
    var flow = [
        {id:"azIotNode",type:"azureiothub",name:"Azure IoT Hub",protocol:"amqp",credentials: "{hostname:'hostname'}",wires:[["h1"]]},
        // {"id":"i1","type":"inject","name":"","topic":"",
        // "payload":"{'deviceId': 'device146', 'key': 'xxx','protocol': 'http', 'data': '{tem: 25, wind: 20}' }",
        // "payloadType":"json","repeat":"","crontab":"","once":false,"x":408,"y":755,"wires":[["azIotNode"]]},
        {id:"h1",type:"helper"}
      ];
    
    helper.load(azureiothub, flow, function() {
      var azIoTNode = helper.getNode('azIoTNode');
      //var inputNode = helper.getNode('i1');
      var helperNode = helper.getNode('h1');

      

      helperNode.on("input", function(msg) {
        msg.should.have.property('protocol', 'amqp');
        msg.should.have.property('credentials', '{hostname:"foo"}');
        
        azIoTNode.receive({protocol:"amqp", credentials: "{hostname:'hostname'}"});
        //done();
      });
      done();
      
     
    });
  });
  
  // it('should make payload lower case', function (done) {
  //   var flow = [
  //     { id: "n1", type: "lower-case", name: "lower-case",wires:[["n2"]] },
  //     { id: "n2", type: "helper" }
  //   ];
  //   helper.load(azureIotHubNode, flow, function () {
  //     var n2 = helper.getNode("n2");
  //     var n1 = helper.getNode("n1");
  //     n2.on("input", function (msg) {
  //       msg.should.have.property('payload', 'uppercase');
  //       done();
  //     });
  //     n1.receive({ payload: "UpperCase" });
  //   });
  // });
});