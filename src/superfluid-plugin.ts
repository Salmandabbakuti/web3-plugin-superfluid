import { Contract, Web3PluginBase, validator } from "web3";
import cfav1ForwarderAbi from "./abis/cfav1Forwarder";
import hostAbi from "./abis/host";

export default class SuperfluidPlugin extends Web3PluginBase {
  //TODO: implement your plugin
  public pluginNamespace = "superfluid";

  public cfav1Forwarder(address: string): Contract<typeof cfav1ForwarderAbi> {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugn: Invalid CFA Forwarder Address");
    const cfav1ForwarderContract = new Contract(cfav1ForwarderAbi, address);
    // Adds Web3Context to Contract instance
    cfav1ForwarderContract.link(this);
    return cfav1ForwarderContract;
  }

  public host(address: string): Contract<typeof hostAbi> {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugn: Invalid Host Address");
    const hostContract = new Contract(hostAbi, address);
    // Adds Web3Context to Contract instance
    hostContract.link(this);
    return hostContract;
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    superfluid: SuperfluidPlugin;
  }
}
