import { Web3, Web3Eth, Web3Context } from "web3";
import { expect } from "chai";
import SuperfluidPlugin from "../src/superfluid-plugin";
import "dotenv/config";

const rpcUrl = "https://rpc-mumbai.maticvigil.com";
const cfav1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0x7348943C8d263ea253c0541656c36b88becD77B9";
// const flowrate = 1000;
// const userData = "0x";

describe("SuperfluidPlugin Tests", () => {
  let web3: Web3;
  let web3Context: Web3Context;
  let web3EthContext: Web3Eth;
  let account: any;
  before(() => {
    web3 = new Web3(rpcUrl);
    web3Context = new Web3Context(rpcUrl);
    web3EthContext = new Web3Eth(rpcUrl);
    web3.registerPlugin(new SuperfluidPlugin());
    web3Context.registerPlugin(new SuperfluidPlugin());
    web3EthContext.registerPlugin(new SuperfluidPlugin());
    // Second step: add an account to wallet
    const privateKeyString = process.env.ACCOUNT_PRIVATE_KEY as string;
    account = web3.eth.accounts.wallet.add(privateKeyString).get(0);
  });
  it("should register Superfluid plugin to Web3", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in web3
    expect(web3.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3.superfluid.cfav1Forwarder).to.be.a("function");
  });
  it("should register Superfluid plugin to Web3Context", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3Context.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3Context.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3Context.superfluid.cfav1Forwarder).to.be.a("function");
  });

  it("should register Superfluid plugin to Web3Eth", () => {
    const web3EthContext = new Web3Eth("http://127.0.0.1:8545");
    web3EthContext.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    expect(web3EthContext.superfluid).to.be.instanceOf(SuperfluidPlugin);
    expect(web3EthContext.superfluid.pluginNamespace).to.be.equal("superfluid");
    expect(web3EthContext.superfluid.cfav1Forwarder).to.be.a("function");
  });

  it("should get flow info", async () => {
    const { lastUpdated, flowrate } = await web3.superfluid
      .cfav1Forwarder(cfav1ForwarderAddress)
      .methods.getFlowInfo(token, sender, receiver)
      .call();
    console.log("flow info", lastUpdated.toString(), flowrate.toString());
    // Assert the result
    expect(lastUpdated.toString()).to.be.a("string");
    expect(flowrate.toString()).to.be.a("string");
  });

  it("should get flowrate", async () => {
    const flowrate = await web3.superfluid
      .cfav1Forwarder(cfav1ForwarderAddress)
      .methods.getFlowrate(token, sender, receiver)
      .call();
    console.log(flowrate.toString());
    // Assert the result
    expect(flowrate.toString()).to.be.a("string");
  });

  it("should create a flow", async () => {
    // Perform the createFlow operation
    const result = await web3.superfluid
      .cfav1Forwarder(cfav1ForwarderAddress)
      .methods.createFlow(token, sender, receiver, 1000, "0x")
      .send({
        from: account?.address
      });
    // Assert the result
    console.log("create result->", result);
    expect(result).to.be.an("object");
  });
  // it("should update a flow", async () => {
  //   const result = await web3.superfluid
  //     .cfav1Forwarder(cfav1ForwarderAddress)
  //     .methods.updateFlow(token, sender, receiver, 1800, "0x")
  //     .send({
  //       from: account?.address
  //     });
  //   // Assert the result
  //   console.log("update result->", result);
  //   expect(result).to.be.an("object");
  // });
  // it("should delete a flow", async () => {
  //   const result = await web3.superfluid
  //     .cfav1Forwarder(cfav1ForwarderAddress)
  //     .methods.deleteFlow(token, sender, receiver, "0x")
  //     .send({
  //       from: account?.address
  //     });
  //   // Assert the result
  //   console.log("delete result->", result);
  //   expect(result).to.be.an("object");
  // });
});
