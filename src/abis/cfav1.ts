const abi = [
  {
    inputs: [
      { internalType: "contract ISuperfluid", name: "host", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [], name: "AGREEMENT_BASE_ONLY_HOST", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "_code", type: "uint256" }],
    name: "APP_RULE",
    type: "error"
  },
  { inputs: [], name: "CFA_ACL_FLOW_RATE_ALLOWANCE_EXCEEDED", type: "error" },
  { inputs: [], name: "CFA_ACL_NO_NEGATIVE_ALLOWANCE", type: "error" },
  { inputs: [], name: "CFA_ACL_NO_SENDER_CREATE", type: "error" },
  { inputs: [], name: "CFA_ACL_NO_SENDER_FLOW_OPERATOR", type: "error" },
  { inputs: [], name: "CFA_ACL_NO_SENDER_UPDATE", type: "error" },
  { inputs: [], name: "CFA_ACL_OPERATOR_NO_CREATE_PERMISSIONS", type: "error" },
  { inputs: [], name: "CFA_ACL_OPERATOR_NO_DELETE_PERMISSIONS", type: "error" },
  { inputs: [], name: "CFA_ACL_OPERATOR_NO_UPDATE_PERMISSIONS", type: "error" },
  { inputs: [], name: "CFA_ACL_UNCLEAN_PERMISSIONS", type: "error" },
  { inputs: [], name: "CFA_DEPOSIT_TOO_BIG", type: "error" },
  { inputs: [], name: "CFA_FLOW_ALREADY_EXISTS", type: "error" },
  { inputs: [], name: "CFA_FLOW_DOES_NOT_EXIST", type: "error" },
  { inputs: [], name: "CFA_FLOW_RATE_TOO_BIG", type: "error" },
  { inputs: [], name: "CFA_HOOK_OUT_OF_GAS", type: "error" },
  { inputs: [], name: "CFA_INSUFFICIENT_BALANCE", type: "error" },
  { inputs: [], name: "CFA_INVALID_FLOW_RATE", type: "error" },
  { inputs: [], name: "CFA_NON_CRITICAL_SENDER", type: "error" },
  { inputs: [], name: "CFA_NO_SELF_FLOW", type: "error" },
  { inputs: [], name: "CFA_ZERO_ADDRESS_RECEIVER", type: "error" },
  { inputs: [], name: "CFA_ZERO_ADDRESS_SENDER", type: "error" },
  { inputs: [], name: "OUT_OF_GAS", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "uuid",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "codeAddress",
        type: "address"
      }
    ],
    name: "CodeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "flowOperator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "permissions",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "int96",
        name: "flowRateAllowance",
        type: "int96"
      }
    ],
    name: "FlowOperatorUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "int96",
        name: "flowRate",
        type: "int96"
      },
      {
        indexed: false,
        internalType: "int256",
        name: "totalSenderFlowRate",
        type: "int256"
      },
      {
        indexed: false,
        internalType: "int256",
        name: "totalReceiverFlowRate",
        type: "int256"
      },
      { indexed: false, internalType: "bytes", name: "userData", type: "bytes" }
    ],
    name: "FlowUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "flowOperator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      }
    ],
    name: "FlowUpdatedExtension",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    inputs: [],
    name: "CFA_HOOK_GAS_LIMIT",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DEFAULT_MINIMUM_DEPOSIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAXIMUM_DEPOSIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAXIMUM_FLOW_RATE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint8", name: "existingPermissions", type: "uint8" },
      { internalType: "uint8", name: "permissionDelta", type: "uint8" }
    ],
    name: "addPermissions",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "agreementType",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "authorizeFlowOperatorWithFullControl",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "castrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "createFlow",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "createFlowByOperator",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      {
        internalType: "int96",
        name: "subtractedFlowRateAllowance",
        type: "int96"
      },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "decreaseFlowRateAllowance",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "uint8", name: "permissionsToRemove", type: "uint8" },
      {
        internalType: "int96",
        name: "subtractedFlowRateAllowance",
        type: "int96"
      },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "decreaseFlowRateAllowanceWithPermissions",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "deleteFlow",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "deleteFlowByOperator",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "getAccountFlowInfo",
    outputs: [
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCodeAddress",
    outputs: [
      { internalType: "address", name: "codeAddress", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "int96", name: "flowRate", type: "int96" }
    ],
    name: "getDepositRequiredForFlowRate",
    outputs: [{ internalType: "uint256", name: "deposit", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" }
    ],
    name: "getFlow",
    outputs: [
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "bytes32", name: "flowId", type: "bytes32" }
    ],
    name: "getFlowByID",
    outputs: [
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "flowOperator", type: "address" }
    ],
    name: "getFlowOperatorData",
    outputs: [
      { internalType: "bytes32", name: "flowOperatorId", type: "bytes32" },
      { internalType: "uint8", name: "permissions", type: "uint8" },
      { internalType: "int96", name: "flowRateAllowance", type: "int96" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "bytes32", name: "flowOperatorId", type: "bytes32" }
    ],
    name: "getFlowOperatorDataByID",
    outputs: [
      { internalType: "uint8", name: "permissions", type: "uint8" },
      { internalType: "int96", name: "flowRateAllowance", type: "int96" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "uint256", name: "deposit", type: "uint256" }
    ],
    name: "getMaximumFlowRateFromDeposit",
    outputs: [{ internalType: "int96", name: "flowRate", type: "int96" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "getNetFlow",
    outputs: [{ internalType: "int96", name: "flowRate", type: "int96" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "int96", name: "addedFlowRateAllowance", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "increaseFlowRateAllowance",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "uint8", name: "permissionsToAdd", type: "uint8" },
      { internalType: "int96", name: "addedFlowRateAllowance", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "increaseFlowRateAllowanceWithPermissions",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    name: "isPatricianPeriod",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "isPatricianPeriodNow",
    outputs: [
      {
        internalType: "bool",
        name: "isCurrentlyPatricianPeriod",
        type: "bool"
      },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "time", type: "uint256" }
    ],
    name: "realtimeBalanceOf",
    outputs: [
      { internalType: "int256", name: "dynamicBalance", type: "int256" },
      { internalType: "uint256", name: "deposit", type: "uint256" },
      { internalType: "uint256", name: "owedDeposit", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint8", name: "existingPermissions", type: "uint8" },
      { internalType: "uint8", name: "permissionDelta", type: "uint8" }
    ],
    name: "removePermissions",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "revokeFlowOperatorWithFullControl",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "updateCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "updateFlow",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "updateFlowByOperator",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address"
      },
      { internalType: "address", name: "flowOperator", type: "address" },
      { internalType: "uint8", name: "permissions", type: "uint8" },
      { internalType: "int96", name: "flowRateAllowance", type: "int96" },
      { internalType: "bytes", name: "ctx", type: "bytes" }
    ],
    name: "updateFlowOperatorPermissions",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export default abi;
