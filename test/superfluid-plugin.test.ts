import { Web3, Web3Eth, Web3Context } from "web3";
import { SuperfluidPlugin, CFAV1Forwarder, CFAV1, IDAV1, Host } from "../src";

// Test data: Mumbai testnet
// https://console.superfluid.finance/mumbai/protocol
const rpcUrl = "https://rpc-mumbai.maticvigil.com";
const cfav1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const cfav1Address = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
const idav1Address = "0x804348D4960a61f2d5F9ce9103027A3E849E09b8";
const hostAddress = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0x7348943C8d263ea253c0541656c36b88becD77B9";

describe("SuperfluidPlugin Tests", () => {
  it("should register Superfluid plugin to Web3", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new SuperfluidPlugin());

    expect(web3.superfluid).toBeInstanceOf(SuperfluidPlugin);
    expect(web3.superfluid.pluginNamespace).toBe("superfluid");
    expect(web3.superfluid.cfav1Forwarder).toBeInstanceOf(Function);
    expect(web3.superfluid.cfav1).toBeInstanceOf(Function);
    expect(web3.superfluid.idav1).toBeInstanceOf(Function);
    expect(web3.superfluid.host).toBeInstanceOf(Function);
  });

  it("should register Superfluid plugin to Web3Context", () => {
    const web3Context = new Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new SuperfluidPlugin());

    expect(web3Context.superfluid).toBeInstanceOf(SuperfluidPlugin);
    expect(web3Context.superfluid.pluginNamespace).toBe("superfluid");
    expect(web3Context.superfluid.cfav1Forwarder).toBeInstanceOf(Function);
    expect(web3Context.superfluid.cfav1).toBeInstanceOf(Function);
    expect(web3Context.superfluid.idav1).toBeInstanceOf(Function);
    expect(web3Context.superfluid.host).toBeInstanceOf(Function);
  });

  it("should register Superfluid plugin to Web3Eth", () => {
    const web3EthContext = new Web3Eth("http://127.0.0.1:8545");
    web3EthContext.registerPlugin(new SuperfluidPlugin());

    expect(web3EthContext.superfluid).toBeInstanceOf(SuperfluidPlugin);
    expect(web3EthContext.superfluid.pluginNamespace).toBe("superfluid");
    expect(web3EthContext.superfluid.cfav1Forwarder).toBeInstanceOf(Function);
    expect(web3EthContext.superfluid.cfav1).toBeInstanceOf(Function);
    expect(web3EthContext.superfluid.idav1).toBeInstanceOf(Function);
    expect(web3EthContext.superfluid.host).toBeInstanceOf(Function);
  });

  it("should throw error if address passed to plugin functions is not valid", () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new SuperfluidPlugin());

    expect(() => {
      web3.superfluid.cfav1Forwarder("0x123");
    }).toThrow("Superfluid Plugin: Invalid CFA Forwarder Address");

    expect(() => {
      web3.superfluid.cfav1("0x123");
    }).toThrow("Superfluid Plugin: Invalid CFA Address");

    expect(() => {
      web3.superfluid.idav1("0x123");
    }).toThrow("Superfluid Plugin: Invalid IDA Address");

    expect(() => {
      web3.superfluid.host("0x123");
    }).toThrow("Superfluid Plugin: Invalid Host Address");
  });
});

describe("SuperfluidPlugin Method Tests", () => {
  let web3: Web3;
  let cfav1Forwarder: CFAV1Forwarder;
  let cfav1: CFAV1;
  let idav1: IDAV1;
  let host: Host;

  beforeAll(() => {
    web3 = new Web3(rpcUrl);
    web3.registerPlugin(new SuperfluidPlugin());
    cfav1Forwarder = web3.superfluid.cfav1Forwarder(cfav1ForwarderAddress);
    cfav1 = web3.superfluid.cfav1(cfav1Address);
    host = web3.superfluid.host(hostAddress);
    idav1 = web3.superfluid.idav1(idav1Address);
  });

  it("should get flow info with forwarder", async () => {
    const { lastUpdated, flowrate } = await cfav1Forwarder.methods
      .getFlowInfo(token, sender, receiver)
      .call();
    expect(typeof lastUpdated).toBe("bigint");
    expect(typeof flowrate).toBe("bigint");
  });

  it("should get flowrate with forwarder", async () => {
    const flowrate = await cfav1Forwarder.methods
      .getFlowrate(token, sender, receiver)
      .call();
    expect(typeof flowrate).toBe("bigint");
  });

  it("should get flow info with cfav1", async () => {
    const { timestamp, flowRate } = await cfav1.methods
      .getFlow(token, sender, receiver)
      .call();
    expect(typeof timestamp).toBe("bigint");
    expect(typeof flowRate).toBe("bigint");
  });

  it("should get token IDA subscription details with idav1", async () => {
    // Test data: Mumbai testnet
    const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
    const publisher = "0x018762341dda10cfaa2fc19966d2279dc70b6784";
    const subscriber = "0x18e23191359f9dc403ba2942b87a896535c935c4";
    const indexId = 0;

    const { units, exist, approved } = await idav1.methods
      .getSubscription(token, publisher, indexId, subscriber)
      .call();
    expect(typeof units).toBe("bigint");
    expect(typeof exist).toBe("boolean");
    expect(typeof approved).toBe("boolean");
  });

  it("should get token IDA index details with idav1", async () => {
    // Test data: Mumbai testnet
    const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
    const publisher = "0x018762341dda10cfaa2fc19966d2279dc70b6784";
    const indexId = 0;

    const { exist, indexValue, totalUnitsApproved, totalUnitsPending } =
      await idav1.methods.getIndex(token, publisher, indexId).call();
    expect(typeof indexValue).toBe("bigint");
    expect(typeof exist).toBe("boolean");
    expect(typeof totalUnitsApproved).toBe("bigint");
    expect(typeof totalUnitsPending).toBe("bigint");
  });

  it("should check if address is trusted forwarder using host", async () => {
    const result = await host.methods
      .isTrustedForwarder(cfav1ForwarderAddress)
      .call();
    expect(result).toBe(true);
  });
});
