import { Contract, Web3PluginBase } from "web3";
import cfav1ForwarderAbi from "./abis/cfav1Forwarder";

export default class SuperfluidPlugin extends Web3PluginBase {
  //TODO: implement your plugin
  public pluginNamespace = "superfluid";

  public cfav1Forwarder(address: string): Contract<typeof cfav1ForwarderAbi> {
    const cfav1ForwarderContract = new Contract(cfav1ForwarderAbi, address);
    // Adds Web3Context to Contract instance
    cfav1ForwarderContract.link(this);
    return cfav1ForwarderContract;
  }
}

// Module Augmentation
declare module "web3" {
  // Here is where you're adding your plugin's
  // class inside Web3Context class
  interface Web3Context {
    superfluid: SuperfluidPlugin;
  }
}
