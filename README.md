# Superfluid Web3 Plugin

The Superfluid Web3.js Plugin extends the capabilities of the Web3.js library to interact seamlessly with the [Superfluid Money Streaming Protocol](https://superfluid.finance). This plugin provides convenient methods for creating, updating, deleting, and retrieving information related to money streams using CFAForwarder and host contracts.

## Installation

> Note: Make sure you are using `web3` version 4.0.0 or higher in your project.

```bash
npm install web3-plugin-superfluid
```

## Usage

```js
import { Web3 } from "web3";
import SuperfluidPlugin from "web3-plugin-superfluid";

const web3 = new Web3("http://localhost:8545"); // Any RPC node you wanted to connect with
web3.registerPlugin(new SuperfluidPlugin());

const cfav1ForwarderAddress = "0x..."; // varies based on network
const cfav1Forwarder = web3.superfluid.cfav1Forwarder(cfav1ForwarderAddress);

const token = "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"; //fDAIx on Mumbai
const sender = "0xc7203561EF179333005a9b81215092413aB86aE9";
const receiver = "0x7348943C8d263ea253c0541656c36b88becD77B9";

const flowRate = await cfav1Forwarder.methods
  .getFlowRate(token, sender, receiver)
  .call();

console.log("FlowRate: ", flowRate.toString());
```

### Publishing

To publish a new version of the package to npm, run the following command:

```bash
npm run build

npm publish
```

### Change Log

#### 0.0.1

- Added support for CFAv1Forwarder and Host contracts

## Resources

- [Superfluid Documentation](https://docs.superfluid.finance)
- [Web3js Plugins Documentation](https://docs.web3js.org/guides/web3_plugin_guide/)

### Safety

This is experimental software and subject to change over time.

This package is not audited and has not been tested for security. Use at your own risk.
I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
