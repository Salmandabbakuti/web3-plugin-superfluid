import { Web3Eth, Web3Context } from "web3";
import { expect } from "chai";
import SuperfluidPlugin from "../src/superfluid-plugin";

const rpcUrl = "https://rpc-mumbai.maticvigil.com";
const cfav1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f";
const sender = "0x7348943C8d263ea253c0541656c36b88becD77B9";
const receiver = "0x48A822ef187a82C3bd4c8218C9bE5DC7802d77c3";
// const flowrate = 1000;
// const userData = "0x";

describe("SuperfluidPlugin Tests", () => {

  let web3Context: Web3Context;
  let web3EthContext: Web3Eth;
  before(() => {
    web3Context = new Web3Context(rpcUrl);
    web3EthContext = new Web3Eth(rpcUrl);
    web3Context.registerPlugin(new SuperfluidPlugin());
    web3EthContext.registerPlugin(new SuperfluidPlugin());
  });

  it("should register Superfluid plugin to Web3Context", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3Context.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3Context.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3Context.superfluid.cfav1Forwarder).to.be.a("function");
  });

  it("should register Superfluid plugin to Web3Eth ", () => {
    const web3EthContext = new Web3Eth("http://127.0.0.1:8545");
    web3EthContext.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3EthContext.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3EthContext.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3EthContext.superfluid.cfav1Forwarder).to.be.a("function");
  });

  it("should get flow info", async () => {
    const { lastUpdated, flowrate } = await web3Context.superfluid.cfav1Forwarder(cfav1ForwarderAddress).methods.getFlowInfo(token, sender, receiver).call();
    console.log(lastUpdated, flowrate);
    // Assert the result
    expect(lastUpdated.toString()).to.be.a("string");
    expect(flowrate.toString).to.be.a("string");
  });

  it("should get flowrate", async () => {
    const flowrate = await web3Context.superfluid.cfav1Forwarder(cfav1ForwarderAddress).methods.getFlowrate(token, sender, receiver).call();
    console.log(flowrate);
    // Assert the result
    expect(flowrate.toString()).to.be.a("string");
  });

  it("should create a flow", async () => {
    // Perform the createFlow operation
    const result = await web3Context.superfluid
      .cfav1Forwarder(cfav1ForwarderAddress)
      .methods.createFlow(token, sender, receiver, 1000, "0x")
      .send();
    // Assert the result
    expect(result.status).to.equal(true);
  });
  it("should update a flow", async () => { });
  it("should delete a flow", async () => { });

});
