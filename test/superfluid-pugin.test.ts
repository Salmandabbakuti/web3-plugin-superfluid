import { Web3, Web3Eth, Web3Context } from "web3";
import { expect } from "chai";
import { SuperfluidPlugin, CFAV1Forwarder, CFAV1, Host } from "../src";

// Test data: Mumbai testnet
const rpcUrl = "https://rpc-mumbai.maticvigil.com";
const cfav1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const cfav1Address = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
const hostAddress = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0x7348943C8d263ea253c0541656c36b88becD77B9";

describe("SuperfluidPlugin Tests", () => {
  it("should register Superfluid plugin to Web3", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in web3
    expect(web3.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3.superfluid.cfav1Forwarder).to.be.a("function");
    expect(web3.superfluid.cfav1).to.be.a("function");
    expect(web3.superfluid.host).to.be.a("function");
  });

  it("should register Superfluid plugin to Web3Context", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3Context.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3Context.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3Context.superfluid.cfav1Forwarder).to.be.a("function");
    expect(web3Context.superfluid.cfav1).to.be.a("function");
    expect(web3Context.superfluid.host).to.be.a("function");
  });

  it("should register Superfluid plugin to Web3Eth", () => {
    const web3EthContext = new Web3Eth("http://127.0.0.1:8545");
    web3EthContext.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3EthContext.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3EthContext.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3EthContext.superfluid.cfav1Forwarder).to.be.a("function");
    expect(web3EthContext.superfluid.cfav1).to.be.a("function");
    expect(web3EthContext.superfluid.host).to.be.a("function");
  });
});

describe("SuperfluidPlugin Method Tests", () => {
  let web3: Web3;
  let cfav1Forwarder: CFAV1Forwarder;
  let cfav1: CFAV1;
  let host: Host;

  before(() => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new SuperfluidPlugin());
    cfav1Forwarder = web3.superfluid.cfav1Forwarder(cfav1ForwarderAddress);
    cfav1 = web3.superfluid.cfav1(cfav1Address);
    host = web3.superfluid.host(hostAddress);
  });

  it("should get flow info with forwarder", async () => {
    const { lastUpdated, flowrate } = await cfav1Forwarder.methods
      .getFlowInfo(token, sender, receiver)
      .call();
    expect(lastUpdated.toString()).to.be.a("string");
    expect(flowrate.toString()).to.be.a("string");
  });

  it("should get flowrate with forwarder", async () => {
    const flowrate = await cfav1Forwarder.methods
      .getFlowrate(token, sender, receiver)
      .call();
    expect(flowrate.toString()).to.be.a("string");
  });

  it("should get flow info with cfav1", async () => {
    const { timestamp, flowRate } = await cfav1.methods
      .getFlow(token, sender, receiver)
      .call();
    expect(timestamp.toString()).to.be.a("string");
    expect(flowRate.toString()).to.be.a("string");
  });

  it("should check if address is trusted forwarder using host", async () => {
    const result = await host.methods
      .isTrustedForwarder(cfav1ForwarderAddress)
      .call();
    expect(result).to.be.true;
  });
});
