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

            constants:{
                symbol:{name:'symbol' , type:'string'},
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: null,
                name:{name:'name' , type:'string'},
                startDate: {name:'fundingStartBlock', type:'blockNumber'},
                endDate: {name:'fundingEndBlock', type:'blockNumber'},
            },
            matrix: [
                {question : 'Is ICO controlled by a smart contract?' ,
                    answer:true, required:true , notApplicable:false}, //#1
                {question : 'Is smart contract source code available?' ,
                    answer:true,  required:true, notApplicable:false},//#2
                {question : 'Is smart contract source code provided in etherscan?' ,
                    answer:false , required:false, notApplicable:false},//#3
                {question : 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)' ,
                    answer:true, required:true, notApplicable:false},//#4
                {question : 'Does smart contract provide all tracking data via events?' ,
                    answer:true ,required:true, notApplicable:true},//#5
                {question : 'Is information on token price in ETH provided? (via event or in transaction?)' ,
                    answer:true, required:true, notApplicable:false},//#6
                {question : 'Does smart contract handle ETH in a trustless way?' ,
                    answer:null, required:false, notApplicable:true},//#7
                {question : 'If ICO is using other currencies is information on token price provided?' ,
                    answer:true, required:true, notApplicable:true},//#8
                {question : 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?' ,
                    answer:false, required:false, notApplicable:false},//#9
                {question : 'Was smart contract code easy to read and properly commented?' ,
                    answer:true, required:false, notApplicable:false},//#10
                {question : 'Is the ICO doing exactly the same what they say on their website?' ,
                    answer:true, required:true, notApplicable:false},//#11
                {question : 'is price of the token deterministic?' ,
                    answer:true, required:false, notApplicable:false},//#12
                {question : 'is ICO start condition deterministic? (block number, date are OK' ,
                    answer:true, required:false, notApplicable:false},//#13
                {question : 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)' ,
                    answer:true, required:false, notApplicable:false},//#14

            ],
            description:'Blockchain protocol for digital asset management',
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
            matrix: [
                {question : 'Is ICO controlled by a smart contract?' ,
                    answer:true, required:true , notApplicable:false}, //#1
                {question : 'Is smart contract source code available?' ,
                    answer:true,  required:true, notApplicable:false},//#2
                {question : 'Is smart contract source code provided in etherscan?' ,
                    answer:false , required:false, notApplicable:false},//#3
                {question : 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)' ,
                    answer:true, required:true, notApplicable:false},//#4
                {question : 'Does smart contract provide all tracking data via events?' ,
                    answer:false ,required:true, notApplicable:true},//#5
                {question : 'Is information on token price in ETH provided? (via event or in transaction?)' ,
                    answer:true, required:true, notApplicable:true},//#6
                {question : 'Does smart contract handle ETH in a trustless way?' ,
                    answer:null, required:false, notApplicable:true},//#7
                {question : 'If ICO is using other currencies is information on token price provided?' ,
                    answer:true, required:true, notApplicable:true},//#8
                {question : 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?' ,
                    answer:false, required:false, notApplicable:false},//#9
                {question : 'Was smart contract code easy to read and properly commented?' ,
                    answer:true, required:false, notApplicable:false},//#10
                {question : 'Is the ICO doing exactly the same what they say on their website?' ,
                    answer:true, required:true, notApplicable:false},//#11
                {question : 'is price of the token deterministic?' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO start condition deterministic? (block number, date are OK' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)' ,
                    answer:true, required:false, notApplicable:false},//#11

            ],
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

            abi :[{
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
            event:{
                args: {
                    tokens: 'amount',
                    sender: 'to'
                },
                name:'CreatedToken',
            },
            matrix: [
                {question : 'Is ICO controlled by a smart contract?' ,
                    answer:false, required:true , notApplicable:false}, //#1
                {question : 'Is smart contract source code available?' ,
                    answer:false,  required:true, notApplicable:false},//#2
                {question : 'Is smart contract source code provided in etherscan?' ,
                    answer:false, required:false, notApplicable:false},//#3
                {question : 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)' ,
                    answer:false, required:true, notApplicable:false},//#4
                {question : 'Does smart contract provide all tracking data via events?' ,
                    answer:false ,required:true, notApplicable:false},//#5
                {question : 'Is information on token price in ETH provided? (via event or in transaction?)' ,
                    answer:false, required:true, notApplicable:true},//#6
                {question : 'Does smart contract handle ETH in a trustless way?' ,
                    answer:false, required:false, notApplicable:true},//#7
                {question : 'If ICO is using other currencies is information on token price provided?' ,
                    answer:false, required:true, notApplicable:true},//#8
                {question : 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?' ,
                    answer:false, required:false, notApplicable:false},//#9
                {question : 'Was smart contract code easy to read and properly commented?' ,
                    answer:true, required:false, notApplicable:false},//#10
                {question : 'Is the ICO doing exactly the same what they say on their website?' ,
                    answer:true, required:true, notApplicable:false},//#11
                {question : 'is price of the token deterministic?' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO start condition deterministic? (block number, date are OK' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)' ,
                    answer:true, required:false, notApplicable:false},//#11

            ]
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
            matrix: [
                {question : 'Is ICO controlled by a smart contract?' ,
                    answer:true, required:true , notApplicable:false}, //#1
                {question : 'Is smart contract source code available?' ,
                    answer:true,  required:true, notApplicable:false},//#2
                {question : 'Is smart contract source code provided in etherscan?' ,
                    answer:false , required:false, notApplicable:false},//#3
                {question : 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)' ,
                    answer:true, required:true, notApplicable:false},//#4
                {question : 'Does smart contract provide all tracking data via events?' ,
                    answer:false ,required:true, notApplicable:true},//#5
                {question : 'Is information on token price in ETH provided? (via event or in transaction?)' ,
                    answer:false, required:true, notApplicable:true},//#6
                {question : 'Does smart contract handle ETH in a trustless way?' ,
                    answer:null, required:false, notApplicable:true},//#7
                {question : 'If ICO is using other currencies is information on token price provided?' ,
                    answer:true, required:true, notApplicable:true},//#8
                {question : 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?' ,
                    answer:false, required:false, notApplicable:false},//#9
                {question : 'Was smart contract code easy to read and properly commented?' ,
                    answer:true, required:false, notApplicable:false},//#10
                {question : 'Is the ICO doing exactly the same what they say on their website?' ,
                    answer:true, required:true, notApplicable:false},//#11
                {question : 'is price of the token deterministic?' ,
                    answer:false, required:false, notApplicable:false},//#11
                {question : 'is ICO start condition deterministic? (block number, date are OK' ,
                    answer:false, required:false, notApplicable:false},//#11
                {question : 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)' ,
                    answer:false, required:false, notApplicable:false},//#11

            ],
            summary :{
                description:"Blockchain protocol for digital asset management",
                logo:"https://golem.network/icons/apple-touch-icon.png",
            }
        },
        StatusNetwork: {
            address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
            event:{
                args: {
                    tokens: '_amount',
                    sender: '_to'
                },
                customArgs: {
                    _from: "0x0000000000000000000000000000000000000000",
                },
                name:'Transfer'
            },
            abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creationBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newController","type":"address"}],"name":"changeController","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"balanceOfAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cloneTokenName","type":"string"},{"name":"_cloneDecimalUnits","type":"uint8"},{"name":"_cloneTokenSymbol","type":"string"},{"name":"_snapshotBlock","type":"uint256"},{"name":"_transfersEnabled","type":"bool"}],"name":"createCloneToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"parentToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_amount","type":"uint256"}],"name":"generateTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"parentSnapShotBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroyTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenFactory","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_transfersEnabled","type":"bool"}],"name":"enableTransfers","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_tokenFactory","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_token","type":"address"},{"indexed":true,"name":"_controller","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_cloneToken","type":"address"},{"indexed":false,"name":"_snapshotBlock","type":"uint256"}],"name":"NewCloneToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"}]
            ,constants:{
                symbol:{name:'symbol' , type:'string'},
                totalSupply: { name:'totalSupply' , type:'uint256' },
                cap: null,
                name:{name:'name' , type:'string'},
                startDate: {name:'creationBlock', type:'timestamp'},
                endDate: null,
            },
            matrix: [
                {question : 'Is ICO controlled by a smart contract?' ,
                    answer:true, required:true , notApplicable:false}, //#1
                {question : 'Is smart contract source code available?' ,
                    answer:true,  required:true, notApplicable:false},//#2
                {question : 'Is smart contract source code provided in etherscan?' ,
                    answer:false , required:false, notApplicable:false},//#3
                {question : 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)' ,
                    answer:true, required:true, notApplicable:false},//#4
                {question : 'Does smart contract provide all tracking data via events?' ,
                    answer:false ,required:true, notApplicable:true},//#5
                {question : 'Is information on token price in ETH provided? (via event or in transaction?)' ,
                    answer:true, required:true, notApplicable:true},//#6
                {question : 'Does smart contract handle ETH in a trustless way?' ,
                    answer:null, required:false, notApplicable:true},//#7
                {question : 'If ICO is using other currencies is information on token price provided?' ,
                    answer:true, required:true, notApplicable:true},//#8
                {question : 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?' ,
                    answer:false, required:false, notApplicable:false},//#9
                {question : 'Was smart contract code easy to read and properly commented?' ,
                    answer:true, required:false, notApplicable:false},//#10
                {question : 'Is the ICO doing exactly the same what they say on their website?' ,
                    answer:true, required:true, notApplicable:false},//#11
                {question : 'is price of the token deterministic?' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO start condition deterministic? (block number, date are OK' ,
                    answer:true, required:false, notApplicable:false},//#11
                {question : 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)' ,
                    answer:true, required:false, notApplicable:false},//#11

            ],
            summary :{
                logo:"https://golem.network/icons/apple-touch-icon.png",
            }
        },

    },
    rpcHost: 'http://localhost:8545',
    defaultDecimal: 18,
    defaultEtherFactor: 1000,
    supportedCurrencies: ['BTC', 'EUR', 'USD']
};