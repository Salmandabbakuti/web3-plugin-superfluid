import { core } from "web3";

import SuperfluidPlugin from "../src/superfluid-plugin";
import { expect } from "chai";

describe("SuperfluidPlugin Tests", () => {
  it("should add superfluid to Web3Context", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new SuperfluidPlugin());
    // expect to have superfluid in Web3Context
    // expect(web3Context.superfluid).to.be.instanceOf(new SuperfluidPlugin());
    expect(web3Context.superfluid.pluginNamespace).to.be.equal("superfluid");
  });

  it("should create a flow", async () => {
    // Define parameters for the createFlow operation
    // const token = "0xTokenAddress";
    // const sender = "0xSenderAddress";
    // const receiver = "0xReceiverAddress";
    // const flowrate = 1000;
    // const userData = "0x";
    // const web3Context = new Web3Context("http://127.0.0.1:8545");
    // web3Context.registerPlugin(new SuperfluidPlugin());
    // Perform the createFlow operation
    // const result = await web3Context.superfluid
    //   .cfav1Forwarder(sender)
    //   .methods.createFlow(token, sender, receiver, flowrate, userData)
    //   .send();
    // // Assert the result
    // expect(result.status).to.equal(true);
  });
});
