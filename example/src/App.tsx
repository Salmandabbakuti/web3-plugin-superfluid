/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, message, Form, Input, Tabs } from "antd";
import { Web3 } from "web3";
import {
  SuperfluidPlugin,
  CFAV1Forwarder,
  CFAV1
} from "web3-plugin-superfluid";
import "./App.css";

interface FlowInput {
  token: string;
  sender: string;
  receiver: string;
}

interface CreateFlowInput extends FlowInput {
  flowRate: string;
}

function App() {
  const [account, setAccount] = useState<string>("");
  const [cfav1Forwarder, setCfav1Forwarder] = useState<CFAV1Forwarder | null>(
    null
  );
  const [cfav1, setCfav1] = useState<CFAV1 | null>(null);
  const [flowInfo, setFlowInfo] = useState<any>(null);
  const [createFlowInput, setCreateFlowInput] = useState<CreateFlowInput>({
    token: "",
    sender: "",
    receiver: "",
    flowRate: ""
  });
  const [getFlowInfoInput, setGetFlowInfoInput] = useState<FlowInput>({
    token: "",
    sender: "",
    receiver: ""
  });

  const handleCreateFlowInputChange = (changedValues: any) => {
    console.log(changedValues);
    setCreateFlowInput({
      ...createFlowInput,
      ...changedValues
    });
  };

  const handleGetFlowInfoInputChange = (changedValues: any) => {
    console.log(changedValues);
    setGetFlowInfoInput({
      ...getFlowInfoInput,
      ...changedValues
    });
  };

  const handleConnectWallet = async () => {
    if (!(window as any)?.ethereum)
      return message.error("Please install MetaMask!");
    try {
      const web3 = new Web3((window as any).ethereum);
      web3.registerPlugin(new SuperfluidPlugin());
      // get chainid from metamask
      const chainId = await web3.eth.getChainId();
      const protocolAddresses = web3.superfluid.contractAddresses(
        Number(chainId)
      );
      const cfav1Forwarder = web3.superfluid.cfav1Forwarder(
        protocolAddresses.cfaV1Forwarder
      );
      const cfav1 = web3.superfluid.cfav1(protocolAddresses.cfaV1);
      setCfav1Forwarder(cfav1Forwarder);
      setCfav1(cfav1);
      const [account1] = await (window as any).ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccount(account1);
      message.success("Wallet Connected");
    } catch (err: any) {
      console.log("Connect Wallet Error", err);
      message.error(err.message);
    }
  };

  const getFlowInfo = async () => {
    if (!cfav1) return message.error("Please connect wallet first!");
    console.log(getFlowInfoInput);
    const { token, sender, receiver } = getFlowInfoInput;
    try {
      const flowInfo = await cfav1.methods
        .getFlow(token, sender, receiver)
        .call();
      console.log(flowInfo);
      setFlowInfo(flowInfo);
    } catch (err: any) {
      console.log("Get Flow Info Error", err);
      message.error(err.message);
    }
  };

  const handleCreateFlow = async () => {
    if (!cfav1Forwarder) return message.error("Please connect wallet first!");
    const { token, sender, receiver, flowRate } = createFlowInput;
    message.info("Creating Flow...");

    try {
      const tx = await cfav1Forwarder.methods
        .createFlow(token, sender, receiver, flowRate, "0x")
        .send({
          from: account
        });
      console.log(tx);
      message.success(`Flow Created, tx: ${tx.transactionHash}`);
    } catch (err: any) {
      console.log("Create Flow Error", err);
      message.error(err.message);
    }
  };

  return (
    <>
      <h2>Superfluid Web3 Plugin Example</h2>
      <p>
        This is an example of how to use the Superfluid Web3 Plugin to interact
        with the Superfluid Protocol.
      </p>
      {/* add docs link here */}
      <p>
        <a href="https://github.com/Salmandabbakuti/web3-plugin-superfluid/tree/main?tab=readme-ov-file#superfluid-web3-plugin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </p>
      {account ? (
        <>
          <Button
            type="primary"
            onClick={() => {
              setAccount("");
              setCfav1Forwarder(null);
            }}
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
          <Tabs
            animated
            defaultActiveKey="info"
            items={[
              {
                key: "info",
                label: "Flow Info",
                children: (
                  <Form
                    labelCol={{ span: 10 }}
                    layout="vertical"
                    onValuesChange={handleGetFlowInfoInputChange}
                    onFinish={getFlowInfo}
                  >
                    <Form.Item name="token" label="Token">
                      <Input placeholder="Enter token address" required autoFocus />
                    </Form.Item>
                    <Form.Item name="sender" label="Sender">
                      <Input placeholder="Enter sender address" required />
                    </Form.Item>
                    <Form.Item name="receiver" label="Receiver">
                      <Input placeholder="Enter receiver address" required />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Get Flow Info
                    </Button>

                    {flowInfo && (
                      <div
                        style={{
                          marginTop: 20,
                          backgroundColor: "#eee",
                          padding: 10,
                          textAlign: "center"
                        }}
                      >
                        <p>Flow Rate: {Number(flowInfo.flowRate)} wei/sec</p>
                        <p>
                          Flow Updated At:{" "}
                          {new Date(
                            Number(flowInfo.timestamp) * 1000
                          ).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </Form>
                )
              },
              {
                key: "create",
                label: "Create Flow",
                children: (
                  <Form
                    labelCol={{ span: 10 }}
                    layout="vertical"
                    onFinish={handleCreateFlow}
                    onValuesChange={handleCreateFlowInputChange}
                  >
                    <Form.Item name="token" label="Token">
                      <Input placeholder="Enter token address" autoFocus required />
                    </Form.Item>
                    <Form.Item name="sender" label="Sender">
                      <Input placeholder="Enter sender address" required />
                    </Form.Item>
                    <Form.Item name="receiver" label="Receiver">
                      <Input placeholder="Enter receiver address" required />
                    </Form.Item>
                    <Form.Item name="flowRate" label="Flow Rate">
                      <Input placeholder="Enter flowrate in wei/sec" required />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Create Flow
                    </Button>
                  </Form>
                )
              }
            ]}
          />
        </>
      ) : (
        <Button type="primary" onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}

export default App;
