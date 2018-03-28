var should = require("should");
var helper = require("node-red-node-test-helper");
var azureiothub = require("../azureiothub.js");

describe('AzureIoTHubNode Node', function () {

  afterEach(function () {
    helper.unload();
  });

  // it('azureiothub should be loaded', function (done) {
  //   var flow = [{ id: "n1", type: "azureiothub", name: "azureiothub", credentials: {hostname: "hostname"} }];
  //   helper.load(azureiothub, flow, function () {
  //     var n1 = helper.getNode("n1");
  //     n1.should.have.property('name', 'azureiothub');
  //     n1.should.have.property('credentials', {});
  //   });
  //   done();
  // });

  // it('azureiothubregistry should be loaded', function (done) {
  //   var flow = [{ id: "n2", type: "azureiothubregistry", name: "azureiothubregistry" }];
  //   helper.load(azureiothub, flow, function () {
  //     var n2 = helper.getNode("n2");
  //     n2.should.have.property('name', 'azureiothubregistry');
  //   });
  //   done();
  // });

  // it('azureiothubreceiver should be loaded', function (done) {
  //   var flow = [{ id: "n3", type: "azureiothubreceiver", name: "azureiothubreceiver" }];
  //   helper.load(azureiothub, flow, function () {
  //     var n3 = helper.getNode("n3");
  //     n3.should.have.property('name', 'azureiothubreceiver');
  //   });
  //   done();
  // });

  // it('azureiothubdevicetwin should be loaded', function (done) {
  //   var flow = [{ id: "n4", type: "azureiothubdevicetwin", name: "azureiothubdevicetwin" }];
  //   helper.load(azureiothub, flow, function () {
  //     var n4 = helper.getNode("n4");
  //     n4.should.have.property('name', 'azureiothubdevicetwin');
  //   });
  //   done();
  // });


  it('azureiothub should receive input', function (done) {
    var flow = [
        {id:"n1",type:"azureiothub",name:"Azure IoT Hub",protocol:"amqp",credentials: "{hostname:'hostname'}", msg: {deviceId: "testDevice", key:"testKey"}, wires:[["n2"]]},
        {id:"n2",type:"helper"}
      ];
    
    helper.load(azureiothub, flow, function() {
      var n1 = helper.getNode('n1');
      var n2 = helper.getNode('n2');

      n2.on("input", function(msg) {
        msg.should.have.property('protocol', 'amqp');
        msg.should.have.property('credentials', '{hostname:"foo"}');

        done();
      });
      n1.receive({protocol:"amqp", credentials: "{hostname:'hostname'}",msg: {deviceId: "testDevice", key:"testKey"} });
    });
  });
});