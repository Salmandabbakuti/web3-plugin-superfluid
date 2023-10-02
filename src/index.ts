import {
  Address,
  Contract,
  ContractAbi,
  Web3PluginBase,
  validator
} from "web3";

export default class SuperfluidPlugin extends Web3PluginBase {
  //TODO: implement your plugin
  public pluginNamespace = "superfluid";

  public async exampleMethod() {
    const abi: ContractAbi = [];
    const address: Address = "";
    const _contract: Contract<ContractAbi> = new Contract(abi, address);

    // Adds Web3Context to Contract instance
    _contract.link(this);

    // Calls the contract method
    return await _contract.methods.exampleMethod().call();
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
