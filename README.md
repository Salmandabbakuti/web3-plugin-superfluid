# Superfluid Web3 Plugin

[![npm version](https://img.shields.io/badge/npm-0.2.7-brightgreen)](https://www.npmjs.com/package/web3-plugin-superfluid)

The Superfluid Web3.js Plugin extends the capabilities of the Web3.js library to interact seamlessly with the [Superfluid Protocol](https://superfluid.finance). This plugin provides convenient methods for interacting with the Superfluid protocol contracts.

#### Supported Features:

- [Money Streaming(CFA)](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa)

- [Superfluid Host](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/superfluid-host)

- [Distributions(IDA)](https://docs.superfluid.finance/superfluid/developers/instant-distribution-agreement-ida)

## Installation

> Note: Make sure you are using `web3` version 4.0.3 or higher in your project.

```bash
npm install web3-plugin-superfluid web3@latest --save
```

## Usage

### Basic Usage

```js
import { Web3 } from "web3";
import { SuperfluidPlugin } from "web3-plugin-superfluid";

const web3 = new Web3("https://rpc-mumbai.maticvigil.com"); // Any RPC node you wanted to connect with
web3.registerPlugin(new SuperfluidPlugin());

// Getting contract addresses of the network
const addresses = web3.superfluid.contractAddresses(80001); // chainId of the network

// Contract Instances
const cfav1Forwarder = web3.superfluid.cfav1Forwarder(addresses.cfaV1Forwarder);
const cfav1 = web3.superfluid.cfav1(addresses.cfaV1);
const host = web3.superfluid.host(addresses.host);
const idav1 = web3.superfluid.idav1(addresses.idaV1);

const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0x7348943C8d263ea253c0541656c36b88becD77B9";

// Getting FlowRate with cfav1Forwarder
const flowRate = await cfav1Forwarder.methods
  .getFlowRate(token, sender, receiver)
  .call();

console.log("FlowRate: ", flowRate.toString());

// Getting Flow Info with cfav1
const flow = await cfav1.methods.getFlow(token, sender, receiver).call();

console.log("Flow Info: ", flow);
```

### Connecting Accounts to Web3

```js
import { Web3 } from "web3";
import { SuperfluidPlugin } from "web3-plugin-superfluid";

// With any RPC node and private key
const web3 = new Web3("https://rpc-mumbai.maticvigil.com/");
const wallet = web3.eth.accounts.wallet.add("0x..."); // Private Key
const { address: account } = wallet[0];

// or with browser wallets
const web3 = new Web3(window.ethereum);
const [account] = await window.ethereum.request({
  method: "eth_requestAccounts"
});

web3.registerPlugin(new SuperfluidPlugin());

// Getting contract addresses of the network
const addresses = web3.superfluid.contractAddresses(80001); // chainId of the network

// Contract Instances
const cfav1Forwarder = web3.superfluid.cfav1Forwarder(addresses.cfaV1Forwarder);
const cfav1 = web3.superfluid.cfav1(addresses.cfaV1);
const host = web3.superfluid.host(addresses.host);
const idav1 = web3.superfluid.idav1(addresses.idaV1);
```

### Money Streaming(CFA):

#### Creating flow:

```js
// using cfav1forwarder
const tx = await cfav1Forwarder.methods
  .createFlow(token, sender, receiver, flowRate, "0x")
  .send({ from: account });

// using host
const callData = cfav1.methods
  .createFlow(token, receiver, flowRate, "0x")
  .encodeABI();

const tx = await host.methods
  .callAgreement(cfav1Address, callData, "0x")
  .send({ from: account });
```

#### Updating flow:

```js
// using cfav1forwarder
const tx = await cfav1Forwarder.methods
  .updateFlow(token, sender, receiver, flowRate, "0x")
  .send({ from: account });

// using host
const callData = cfav1.methods
  .updateFlow(token, receiver, flowRate, "0x")
  .encodeABI();

const tx = await host.methods
  .callAgreement(cfav1Address, callData, "0x")
  .send({ from: account });
```

#### Deleting flow:

```js
// using cfav1forwarder
const tx = await cfav1Forwarder.methods
  .deleteFlow(token, sender, receiver, "0x")
  .send({ from: account });

// using host
const callData = cfav1.methods
  .deleteFlow(token, sender, receiver, "0x")
  .encodeABI();

const tx = await host.methods
  .callAgreement(cfav1Address, callData, "0x")
  .send({ from: account });
```

#### Retrieving flow:

```js
// with cfav1forwarder
const flow = await cfav1Forwarder.methods
  .getFlowInfo(token, sender, receiver)
  .call();

// with cfav1
const flow = await cfav1.methods.getFlow(token, sender, receiver).call();
```

Refer [Superfluid CFA docs](https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa) for more on respective contract methods.

### Distributions(IDA):

#### Creating Index:

```js
const callData = idav1.methods.createIndex(token, indexId, "0x").encodeABI();

const tx = await host.methods
  .callAgreement(idav1Address, callData, "0x")
  .send({ from: account });
```

#### Getting Subscription:

```js
const { units, exist, approved } = await idav1.methods
  .getSubscription(token, publisher, indexId, subscriber)
  .call();
```

#### Getting Index:

```js
const { exist, totalUnitsApproved, totalUnitsPending } = await idav1.methods
  .getIndex(token, publisher, indexId)
  .call();
```

Refer [Superfluid IDA docs](https://docs.superfluid.finance/superfluid/developers/instant-distribution-agreement-ida) for more on respective contract methods.

### Publishing

To publish a new version of the package to npm, run the following command:

```bash
npm run build

npm publish
```

## Change Log

#### 0.2.7

- Added example to show how to use the plugin in a react app
- Few tsdoc improvements
- Updated dependencies

#### 0.2.6

- Added handy `contractAddresses` method to get contract addresses of the network
- Updated tests and README.md examples with `contractAddresses` method

#### 0.2.5

- Updated README.md examples and TSDoc

#### 0.2.3

- Using jest for tests instead of mocha
- Added tests for invalid address to cfav1Forwarder, cfav1, idav1, host

#### 0.2.1

- Updated README.md examples and docs

#### 0.2.0

- Added support for IDAv1 contract
- IDAv1 examples, tests, and docs

#### 0.1.0

- Added support for CFAv1 contract
- Added examples on encoding calldata with cfav1 contract for creating, updating, deleting in host's callAgreement method

#### 0.0.9

- Added examples for creating, updating, deleting, and retrieving flows using CFAv1Forwarder and Host contracts
- Added examples for connecting accounts to web3 using private key and metamask

#### 0.0.8

- cfav1Forwarder, host contract type exports, function natspec comments
- Tests Cleanup and refactoring

#### 0.0.7

- Fixed Types not being interpreted correctly, Plugin named export

#### 0.0.1

- Added support for CFAv1Forwarder and Host contracts

## Resources

- [Superfluid Documentation](https://docs.superfluid.finance)
- [Web3js Plugins Documentation](https://docs.web3js.org/guides/web3_plugin_guide/)

## Safety

This is experimental software and subject to change over time.

This package is not audited and has not been tested for security. Use at your own risk.
I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
