import { Web3, Web3Eth, Web3Context } from "web3";
import { SuperfluidPlugin, CFAV1Forwarder, CFAV1, IDAV1, Host } from "../src";

// Test data: Sepolia testnet: 11155111
// https://explorer.superfluid.finance/eth-sepolia/protocol
const chainId = 11155111;
const rpcUrl = "https://sepolia.drpc.org";
const token = "0x9ce2062b085a2268e8d769ffc040f6692315fd2c"; //fDAIx on Sepolia
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0xdc7c5b449d4417a5aa01bf53ad280b1bedf4b078";

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
    expect(web3.superfluid.contractAddresses).toBeInstanceOf(Function);
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
    expect(web3Context.superfluid.contractAddresses).toBeInstanceOf(Function);
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
    expect(web3EthContext.superfluid.contractAddresses).toBeInstanceOf(
      Function
    );
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
    const addresses = web3.superfluid.contractAddresses(chainId);
    cfav1Forwarder = web3.superfluid.cfav1Forwarder(addresses.cfaV1Forwarder);
    cfav1 = web3.superfluid.cfav1(addresses.cfaV1);
    host = web3.superfluid.host(addresses.host);
    idav1 = web3.superfluid.idav1(addresses.idaV1);
  });

  it("contractAddresses: should throw error if chainId is not supported", () => {
    expect(() => {
      web3.superfluid.contractAddresses(123);
    }).toThrow("Superfluid Plugin: Unsupported ChainId");
  });

  it("contractAddresses: should get contract addresses for given chainId", () => {
    const addresses = web3.superfluid.contractAddresses(chainId);
    expect(addresses).toBeInstanceOf(Object);
    expect(addresses).toHaveProperty("cfaV1Forwarder");
    expect(addresses).toHaveProperty("cfaV1");
    expect(addresses).toHaveProperty("idaV1");
    expect(addresses).toHaveProperty("host");
  });

  it("cfav1Forwarder: should get flow info", async () => {
    const { lastUpdated, flowrate } = await cfav1Forwarder.methods
      .getFlowInfo(token, sender, receiver)
      .call();
    expect(typeof lastUpdated).toBe("bigint");
    expect(typeof flowrate).toBe("bigint");
  });

  it("cfav1Forwarder: should get flowrate", async () => {
    const flowrate = await cfav1Forwarder.methods
      .getFlowrate(token, sender, receiver)
      .call();
    expect(typeof flowrate).toBe("bigint");
  });

  it("cfav1: should get flow info", async () => {
    const { timestamp, flowRate } = await cfav1.methods
      .getFlow(token, sender, receiver)
      .call();
    expect(typeof timestamp).toBe("bigint");
    expect(typeof flowRate).toBe("bigint");
  });

  it("idav1: should get token IDA subscription details", async () => {
    // Test data: Sepolia testnet
    const token = "0x9ce2062b085a2268e8d769ffc040f6692315fd2c"; //fDAIx on Sepolia
    const publisher = "0x2ba35b26b67889144f02d0bc3ab26f7e12c39123";
    const subscriber = "0x6a89aba79880d810c286070d999fdcbac8d7cdaf";
    const indexId = 0;

    const { units, exist, approved } = await idav1.methods
      .getSubscription(token, publisher, indexId, subscriber)
      .call();
    expect(typeof units).toBe("bigint");
    expect(typeof exist).toBe("boolean");
    expect(typeof approved).toBe("boolean");
  });

  it("idav1: should get token IDA index details", async () => {
    // Test data: Sepolia testnet
    const token = "0x9ce2062b085a2268e8d769ffc040f6692315fd2c"; //fDAIx on Sepolia
    const publisher = "0x2ba35b26b67889144f02d0bc3ab26f7e12c39123";
    const indexId = 0;

    const { exist, indexValue, totalUnitsApproved, totalUnitsPending } =
      await idav1.methods.getIndex(token, publisher, indexId).call();
    expect(typeof indexValue).toBe("bigint");
    expect(typeof exist).toBe("boolean");
    expect(typeof totalUnitsApproved).toBe("bigint");
    expect(typeof totalUnitsPending).toBe("bigint");
  });

  it("host: should check if address is trusted forwarder", async () => {
    // Test data: Sepolia testnet
    const cfav1ForwarderAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
    const result = await host.methods
      .isTrustedForwarder(cfav1ForwarderAddress)
      .call();
    expect(result).toBe(true);
  });
});
