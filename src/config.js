/**
 * Matrix

 .1 Is ICO controlled by a smart contract?
 .2 Is smart contract source code available?
 .3 Is smart contract source code provided in etherscan?
 .4 Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)
 .5 Does smart contract provide all tracking data via events?
 .6 Is information on token price in ETH provided? (via event or in transaction?)
 .7 Does smart contract handle ETH in a trustless way?
 .8 If ICO is using other currencies is information on token price provided?
 .9 Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?
 .10 Was smart contract code easy to read and properly commented?
 .11 Is the ICO doing exactly the same what they say on their website?
*/
/*
abi: [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "golemFactory",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_master", "type": "address"}],
    "name": "setMigrationMaster",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_value", "type": "uint256"}],
    "name": "migrate",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "finalize",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "refund",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "migrationMaster",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "tokenCreationCap",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_agent", "type": "address"}],
    "name": "setMigrationAgent",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "migrationAgent",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fundingEndBlock",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalMigrated",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "tokenCreationMin",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "funding",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "tokenCreationRate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fundingStartBlock",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "create",
    "outputs": [],
    "payable": true,
    "type": "function"
}, {
    "inputs": [{"name": "_golemFactory", "type": "address"}, {
        "name": "_migrationMaster",
        "type": "address"
    }, {"name": "_fundingStartBlock", "type": "uint256"}, {"name": "_fundingEndBlock", "type": "uint256"}],
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Migrate",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
    }],
    "name": "Refund",
    "type": "event"
}],

 [{
 "constant": true,
 "inputs": [{"name": "", "type": "uint256"}],
 "name": "proposals",
 "outputs": [{"name": "recipient", "type": "address"}, {
 "name": "amount",
 "type": "uint256"
 }, {"name": "description", "type": "string"}, {
 "name": "votingDeadline",
 "type": "uint256"
 }, {"name": "open", "type": "bool"}, {
 "name": "proposalPassed",
 "type": "bool"
 }, {"name": "proposalHash", "type": "bytes32"}, {
 "name": "proposalDeposit",
 "type": "uint256"
 }, {"name": "newCurator", "type": "bool"}, {"name": "yea", "type": "uint256"}, {
 "name": "nay",
 "type": "uint256"
 }, {"name": "creator", "type": "address"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_spender", "type": "address"}, {"name": "_amount", "type": "uint256"}],
 "name": "approve",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "minTokensToCreate",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "rewardAccount",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "daoCreator",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "totalSupply",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "divisor",
 "outputs": [{"name": "divisor", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "extraBalance",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_proposalID", "type": "uint256"}, {"name": "_transactionData", "type": "bytes"}],
 "name": "executeProposal",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
 "name": "_value",
 "type": "uint256"
 }],
 "name": "transferFrom",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [],
 "name": "unblockMe",
 "outputs": [{"name": "", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "totalRewardToken",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "actualBalance",
 "outputs": [{"name": "_actualBalance", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "closingTime",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "", "type": "address"}],
 "name": "allowedRecipients",
 "outputs": [{"name": "", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
 "name": "transferWithoutReward",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [],
 "name": "refund",
 "outputs": [],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_recipient", "type": "address"}, {
 "name": "_amount",
 "type": "uint256"
 }, {"name": "_description", "type": "string"}, {
 "name": "_transactionData",
 "type": "bytes"
 }, {"name": "_debatingPeriod", "type": "uint256"}, {"name": "_newCurator", "type": "bool"}],
 "name": "newProposal",
 "outputs": [{"name": "_proposalID", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "", "type": "address"}],
 "name": "DAOpaidOut",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "minQuorumDivisor",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_newContract", "type": "address"}],
 "name": "newContract",
 "outputs": [],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "_owner", "type": "address"}],
 "name": "balanceOf",
 "outputs": [{"name": "balance", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_recipient", "type": "address"}, {"name": "_allowed", "type": "bool"}],
 "name": "changeAllowedRecipients",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [],
 "name": "halveMinQuorum",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "", "type": "address"}],
 "name": "paidOut",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_proposalID", "type": "uint256"}, {"name": "_newCurator", "type": "address"}],
 "name": "splitDAO",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "DAOrewardAccount",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "proposalDeposit",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "numberOfProposals",
 "outputs": [{"name": "_numberOfProposals", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "lastTimeMinQuorumMet",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_toMembers", "type": "bool"}],
 "name": "retrieveDAOReward",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [],
 "name": "receiveEther",
 "outputs": [{"name": "", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
 "name": "transfer",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "isFueled",
 "outputs": [{"name": "", "type": "bool"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_tokenHolder", "type": "address"}],
 "name": "createTokenProxy",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "_proposalID", "type": "uint256"}],
 "name": "getNewDAOAddress",
 "outputs": [{"name": "_newDAO", "type": "address"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_proposalID", "type": "uint256"}, {"name": "_supportsProposal", "type": "bool"}],
 "name": "vote",
 "outputs": [{"name": "_voteID", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [],
 "name": "getMyReward",
 "outputs": [{"name": "_success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "", "type": "address"}],
 "name": "rewardToken",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
 "name": "_value",
 "type": "uint256"
 }],
 "name": "transferFromWithoutReward",
 "outputs": [{"name": "success", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
 "name": "allowance",
 "outputs": [{"name": "remaining", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": false,
 "inputs": [{"name": "_proposalDeposit", "type": "uint256"}],
 "name": "changeProposalDeposit",
 "outputs": [],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "", "type": "address"}],
 "name": "blocked",
 "outputs": [{"name": "", "type": "uint256"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "curator",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [{"name": "_proposalID", "type": "uint256"}, {
 "name": "_recipient",
 "type": "address"
 }, {"name": "_amount", "type": "uint256"}, {"name": "_transactionData", "type": "bytes"}],
 "name": "checkProposalCode",
 "outputs": [{"name": "_codeChecksOut", "type": "bool"}],
 "type": "function"
 }, {
 "constant": true,
 "inputs": [],
 "name": "privateCreation",
 "outputs": [{"name": "", "type": "address"}],
 "type": "function"
 }, {
 "inputs": [{"name": "_curator", "type": "address"}, {
 "name": "_daoCreator",
 "type": "address"
 }, {"name": "_proposalDeposit", "type": "uint256"}, {
 "name": "_minTokensToCreate",
 "type": "uint256"
 }, {"name": "_closingTime", "type": "uint256"}, {"name": "_privateCreation", "type": "address"}],
 "type": "constructor"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
 "indexed": true,
 "name": "_to",
 "type": "address"
 }, {"indexed": false, "name": "_amount", "type": "uint256"}],
 "name": "Transfer",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
 "indexed": true,
 "name": "_spender",
 "type": "address"
 }, {"indexed": false, "name": "_amount", "type": "uint256"}],
 "name": "Approval",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": false, "name": "value", "type": "uint256"}],
 "name": "FuelingToDate",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "to", "type": "address"}, {
 "indexed": false,
 "name": "amount",
 "type": "uint256"
 }],
 "name": "CreatedToken",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "to", "type": "address"}, {
 "indexed": false,
 "name": "value",
 "type": "uint256"
 }],
 "name": "Refund",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "proposalID", "type": "uint256"}, {
 "indexed": false,
 "name": "recipient",
 "type": "address"
 }, {"indexed": false, "name": "amount", "type": "uint256"}, {
 "indexed": false,
 "name": "newCurator",
 "type": "bool"
 }, {"indexed": false, "name": "description", "type": "string"}],
 "name": "ProposalAdded",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "proposalID", "type": "uint256"}, {
 "indexed": false,
 "name": "position",
 "type": "bool"
 }, {"indexed": true, "name": "voter", "type": "address"}],
 "name": "Voted",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "proposalID", "type": "uint256"}, {
 "indexed": false,
 "name": "result",
 "type": "bool"
 }, {"indexed": false, "name": "quorum", "type": "uint256"}],
 "name": "ProposalTallied",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "_newCurator", "type": "address"}],
 "name": "NewCurator",
 "type": "event"
 }, {
 "anonymous": false,
 "inputs": [{"indexed": true, "name": "_recipient", "type": "address"}, {
 "indexed": false,
 "name": "_allowed",
 "type": "bool"
 }],
 "name": "AllowedRecipientChanged",
 "type": "event"
 }],
*/



module.exports = {
    ICOS: {
        Golem: {
            address: '0xa74476443119a942de498590fe1f2454d7d4ac0d',
            event:{
                args: {
                    tokens: '_value',
                    sender: '_to'
                },
                name:'Transfer',
                customArgs: {
                    _from: "0x0000000000000000000000000000000000000000",
                },
            },
            constants:{
                symbol:{name:'symbol' , type:'string'},
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: null,
                name:{name:'name' , type:'string'},
                startDate: {name:'fundingStartBlock', type:'blockNumber'},
                endDate: {name:'fundingEndBlock', type:'blockNumber'},
            },
            matrix: {
                q1: {answer: true, reason: null }, // Y/N
                q2: {answer: true, reason: null}, // Y/N
                q3: {answer: true, reason: null}, // Y/N -- not critical
                q4: {answer: true, reason: null}, // Y/N
                q5: {answer: true, reason: null}, // Y/N
                q6: {answer: true, reason: null}, // Y N/A
                q7: {answer: true, reason: null}, // Y/N N/A -- not critical
                q8: {answer: null, reason: "Golem doesn't have other currencies"}, // Y N/A
                q9: {answer: null, reason: "Golem doesn't have other currencies"},// Y/N N/A -- not critical
                q10: {answer: true, reason: null}, // Y/N -- not critical
                q11: {answer: true, reason: null} // Y/N
            },
            summary :{
                logo:"https://golem.network/icons/apple-touch-icon.png",
            }
        },
        MelonPort: {
            address: '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0',
            abi: [{
                "constant": true,
                "inputs": [],
                "name": "BTCS_ETHER_CAP",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_STAKE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_STAKE_THREE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "newAddress", "type": "address"}],
                "name": "changeMelonportAddress",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "signer",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "DIVISOR_PRICE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "endTime",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_THREE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "FOUNDER_ONE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_STAKE_TWO",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_ONE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "FOUNDER_STAKE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "DIVISOR_STAKE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_STAKE_ONE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_STAKE_THREE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_STAKE_TWO",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "halt",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_SEVEN",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "FOUNDER_TWO",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_STAKE_ONE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_THREE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "melonToken",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_TWO",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "PRICE_RATE_SECOND",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "startTime",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_STAKE_ONE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "PRICE_RATE_THIRD",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_SIX",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "MELONPORT_COMPANY_STAKE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_STAKE_TWO",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_STAKE_THREE",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "EXT_COMPANY_TWO",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_ONE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_ONE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "SPECIALIST_TWO",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "halted",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "btcs",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "PRICE_RATE_FIRST",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_THREE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "unhalt",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "etherRaised",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "priceRate",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "recipient", "type": "address"}],
                "name": "btcsBuyRecipient",
                "outputs": [],
                "payable": true,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_FOUR",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "recipient", "type": "address"}, {"name": "v", "type": "uint8"}, {
                    "name": "r",
                    "type": "bytes32"
                }, {"name": "s", "type": "bytes32"}],
                "name": "buyRecipient",
                "outputs": [],
                "payable": true,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_TWO",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_THREE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "v", "type": "uint8"}, {"name": "r", "type": "bytes32"}, {
                    "name": "s",
                    "type": "bytes32"
                }],
                "name": "buy",
                "outputs": [],
                "payable": true,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_ONE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ETHER_CAP",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "MAX_CONTRIBUTION_DURATION",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "PRICE_RATE_FOURTH",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_FOUR",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "AMBASSADOR_FIVE",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "ADVISOR_STAKE_FOUR",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "melonport",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "inputs": [{"name": "setMelonport", "type": "address"}, {
                    "name": "setBTCS",
                    "type": "address"
                }, {"name": "setSigner", "type": "address"}, {"name": "setStartTime", "type": "uint256"}],
                "payable": false,
                "type": "constructor"
            }, {
                "anonymous": false,
                "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {
                    "indexed": false,
                    "name": "eth",
                    "type": "uint256"
                }, {"indexed": false, "name": "amount", "type": "uint256"}],
                "name": "TokensBought",
                "type": "event"
            }],
            event:{
                args: {
                    tokens: 'amount',
                    sender: 'sender'
                },
                name:'TokensBought',
            },
            constants:{
                symbol:null,
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: { name:'ETHER_CAP' , type:'uint256' },
                name:null,
                startDate: {name:'startTime', type:'timestamp'},
                endDate: {name:'endTime', type:'timestamp'},
            },
            // decimal: 2.2,
            matrix: {
                q1: {answer: false, reason: null}, // Y/N
                q2: {answer: true, reason: null}, // Y/N
                q3: {answer: true, reason: null}, // Y/N -- not critical
                q4: {answer: true, reason: null}, // Y/N
                q5: {answer: true, reason: null}, // Y/N
                q6: {answer: true, reason: null}, // Y N/A
                q7: {answer: true, reason: null}, // Y/N N/A -- not critical
                q8: {answer: null, reason: "Golem doesn't have other currencies"}, // Y N/A
                q9: {answer: null, reason: "Golem doesn't have other currencies"},// Y/N N/A -- not critical
                q10: {answer: true, reason: null}, // Y/N -- not critical
                q11: {answer: true, reason: null} // Y/N
            },
            summary :{
                description:"Blockchain protocol for digital asset management",
                logo:"https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
            }

        },
        TheDAO: {
            summary :{
                description:"Blockchain protocol for digital asset management",
                logo:"https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
            },
            constants:{
                symbol:null,
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: null,
                name:null ,
                startDate: null,
                endDate: {name:'closingTime', type:'timestamp'},
            },
            address: '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',

            // abi: [],

            event:{
                args: {
                    tokens: 'amount',
                    sender: 'to'
                },
                name:'CreatedToken',
            },
            matrix: {
                q1: {answer: true, reason: null}, // Y/N
                q2: {answer: true, reason: null}, // Y/N
                q3: {answer: true, reason: null}, // Y/N -- not critical
                q4: {answer: true, reason: null}, // Y/N
                q5: {answer: false, reason: null}, // Y/N
                q6: {answer: false, reason: null}, // Y N/A
                q7: {answer: true, reason: null}, // Y/N N/A -- not critical
                q8: {answer: true, reason: null}, // Y N/A
                q9: {answer: false, reason: null},// Y/N N/A -- not critical
                q10: {answer: true, reason: null}, // Y/N -- not critical
                q11: {answer: true, reason: null} // Y/N
            }
        },
        TAAS: {
            constants:{
                symbol:{name: 'symbol' , type:'string'},
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: null,
                name:{name:'name' , type:'string'} ,
                startDate: null,
                endDate: null,
            },

            address: '0xE7775A6e9Bcf904eb39DA2b68c5efb4F9360e08C',
            abi: [{
                "constant": true,
                "inputs": [],
                "name": "multiAsset",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [{"name": "", "type": "string"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
                "name": "approve",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "commitUpgrade",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "getLatestVersion",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }, {"name": "_reference", "type": "string"}, {"name": "_sender", "type": "address"}],
                "name": "_forwardTransferFromWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {
                    "name": "_spender",
                    "type": "address"
                }, {"name": "_value", "type": "uint256"}],
                "name": "emitApprove",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "transferFrom",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "emitTransfer",
                "outputs": [],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_value", "type": "uint256"}],
                "name": "recoverTokens",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{"name": "", "type": "uint8"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "etoken2",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "getPendingVersionTimestamp",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "purgeUpgrade",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "optIn",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }, {"name": "_reference", "type": "string"}],
                "name": "transferFromWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"name": "_owner", "type": "address"}],
                "name": "balanceOf",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_icap", "type": "bytes32"}, {"name": "_value", "type": "uint256"}],
                "name": "transferToICAP",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_icap", "type": "bytes32"}, {
                    "name": "_value",
                    "type": "uint256"
                }, {"name": "_reference", "type": "string"}],
                "name": "transferToICAPWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_spender", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }, {"name": "_sender", "type": "address"}],
                "name": "_forwardApprove",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{"name": "", "type": "string"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {
                    "name": "_icap",
                    "type": "bytes32"
                }, {"name": "_value", "type": "uint256"}, {"name": "_reference", "type": "string"}, {
                    "name": "_sender",
                    "type": "address"
                }],
                "name": "_forwardTransferFromToICAPWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {
                    "name": "_icap",
                    "type": "bytes32"
                }, {"name": "_value", "type": "uint256"}, {"name": "_reference", "type": "string"}],
                "name": "transferFromToICAPWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {
                    "name": "_icap",
                    "type": "bytes32"
                }, {"name": "_value", "type": "uint256"}],
                "name": "transferFromToICAP",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "etoken2Symbol",
                "outputs": [{"name": "", "type": "bytes32"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "getPendingVersion",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
                "name": "transfer",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_to", "type": "address"}, {
                    "name": "_value",
                    "type": "uint256"
                }, {"name": "_reference", "type": "string"}],
                "name": "transferWithReference",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_etoken2", "type": "address"}, {
                    "name": "_symbol",
                    "type": "string"
                }, {"name": "_name", "type": "string"}],
                "name": "init",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"name": "_newVersion", "type": "address"}],
                "name": "proposeUpgrade",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "optOut",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_spender", "type": "address"}],
                "name": "allowance",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"name": "_sender", "type": "address"}],
                "name": "getVersionFor",
                "outputs": [{"name": "", "type": "address"}],
                "payable": false,
                "type": "function"
            }, {"payable": true, "type": "fallback"}, {
                "anonymous": false,
                "inputs": [{"indexed": false, "name": "newVersion", "type": "address"}],
                "name": "UpgradeProposal",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }, {"indexed": false, "name": "value", "type": "uint256"}],
                "name": "Transfer",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                }, {"indexed": false, "name": "value", "type": "uint256"}],
                "name": "Approval",
                "type": "event"
            }],
            event: {
                name: 'Transfer' ,
                args: {
                    tokens: 'value',
                    sender: 'to'
                },
            },
            decimal: 6,
            matrix: {
                q1: {answer: false, reason: null}, // Y/N
                q2: {answer: false, reason: null}, // Y/N
                q3: {answer: false, reason: null}, // Y/N -- not critical
                q4: {answer: false, reason: null}, // Y/N
                q5: {answer: false, reason: null}, // Y/N
                q6: {answer: false, reason: null}, // Y N/A
                q7: {answer: false, reason: null}, // Y/N N/A -- not critical
                q8: {answer: true, reason: null}, // Y N/A
                q9: {answer: false, reason: null},// Y/N N/A -- not critical
                q10: {answer: false, reason: null}, // Y/N -- not critical
                q11: {answer: false, reason: null} // Y/N
            },
            summary :{
                description:"Blockchain protocol for digital asset management",
                logo:"https://golem.network/icons/apple-touch-icon.png",
            }
        }

    },
    rpcHost: 'http://localhost:8545',
    defaultDecimal: 18,
    defaultEtherFactor: 1000,
    supportedCurrencies: ['BTC', 'EUR', 'USD']
};