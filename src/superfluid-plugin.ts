import { Contract, Web3PluginBase, validator } from "web3";
import sfMeta from "@superfluid-finance/metadata";
import cfav1ForwarderAbi from "./abis/cfav1Forwarder";
import hostAbi from "./abis/host";
import cfav1Abi from "./abis/cfav1";
import idav1Abi from "./abis/idav1";

export type CFAV1Forwarder = Contract<typeof cfav1ForwarderAbi>;
export type Host = Contract<typeof hostAbi>;
export type CFAV1 = Contract<typeof cfav1Abi>;
export type IDAV1 = Contract<typeof idav1Abi>;
export interface ProtocolContractAddresses {
  cfaV1: string;
  cfaV1Forwarder: string;
  idaV1: string;
  host: string;
  [key: string]: any;
}

export class SuperfluidPlugin extends Web3PluginBase {
  public pluginNamespace = "superfluid";

  /**
   * This method creates Superfluid's CFAV1Forwarder Contract instance of connected chain
   * @param address - CFAV1Forwarder Contract Address of connected chain
   * @returns CFAV1Forwarder Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new SuperfluidPlugin());
   * const cfav1Forwarder = web3.superfluid.cfav1Forwarder(cfav1ForwarderAddress);
   * ```
   */
  public cfav1Forwarder(address: string): CFAV1Forwarder {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugin: Invalid CFA Forwarder Address");
    const cfav1ForwarderContract = new Contract(cfav1ForwarderAbi, address);
    cfav1ForwarderContract.link(this);
    return cfav1ForwarderContract;
  }

  /**
   * This method creates Superfluid's CFAV1 Contract instance of connected chain
   * @param address - CFAV1 Contract Address of connected chain
   * @returns CFAV1 Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new SuperfluidPlugin());
   * const cfav1 = web3.superfluid.cfav1(cfav1Address);
   * ```
   */
  public cfav1(address: string): CFAV1 {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugin: Invalid CFA Address");
    const cfav1Contract = new Contract(cfav1Abi, address);
    cfav1Contract.link(this);
    return cfav1Contract;
  }

  /**
   * This method creates Superfluid's IDAV1 Contract instance of connected chain
   * @param address - IDAV1 Contract Address of connected chain
   * @returns IDAV1 Contract instance
   * @throws Error if address is not a valid address
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new SuperfluidPlugin());
   * const idav1 = web3.superfluid.idav1(idav1Address);
   * ```
   */
  public idav1(address: string): IDAV1 {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugin: Invalid IDA Address");
    const idav1Contract = new Contract(idav1Abi, address);
    idav1Contract.link(this);
    return idav1Contract;
  }

  /**
   * This method creates Superfluid's Host Contract instance of connected chain
   * @param address - Host Contract Address of connected chain
   * @throws Error if address is not a valid address
   * @returns Host Contract instance
   * @example
   * ```ts
   * const web3 = new Web3("http://127.0.0.1:8545");
   * web3.registerPlugin(new SuperfluidPlugin());
   * const host = web3.superfluid.host(hostAddress);
   * ```
   */
  public host(address: string): Host {
    if (!validator.isAddress(address))
      throw new Error("Superfluid Plugin: Invalid Host Address");
    const hostContract = new Contract(hostAbi, address);
    hostContract.link(this);
    return hostContract;
  }

  /**
   * This method returns Superfluid protocol contract addresses of given chainId
   * @param chainId - ChainId of the network to get contract addresses of
   * @throws Error if chainId is not supported
   * @returns Protocol contract addresses object
   * @example
   * ```ts
   * const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
   * web3.registerPlugin(new SuperfluidPlugin());
   * const addresses = web3.superfluid.contractAddresses(80001);
   * ```
   */
  public contractAddresses(chainId: number): ProtocolContractAddresses {
    const networkMetadata = sfMeta.networks.find(
      (network) => network.chainId === chainId
    );
    if (!networkMetadata)
      throw new Error("Superfluid Plugin: Unsupported ChainId");
    return networkMetadata.contractsV1;
  }

  // example static method
  public static example(): string {
    return "example";
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    superfluid: SuperfluidPlugin;
  }
}
