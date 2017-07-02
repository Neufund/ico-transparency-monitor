module.exports = {
    ICOs: {
        '0xa74476443119a942de498590fe1f2454d7d4ac0d':{
            information:{
                aliasName :"Golem",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://golem.network/icons/apple-touch-icon.png",
                status : 'Open'
            },
            event: {
                args: {
                    tokens: '_value',
                    sender: '_to'
                },
                name: 'Transfer',
                customArgs: {
                    _from: "0x0000000000000000000000000000000000000000",
                },
            },
            constants: {
                symbol: {name: 'symbol', type: 'string'},
                totalSupply: {name: 'totalSupply', type: 'uint256'},
                cap: null,
                name: {name: 'name', type: 'string'},
                startDate: {name: 'fundingStartBlock', type: 'blockNumber'},
                endDate: {name: 'fundingEndBlock', type: 'blockNumber'},
            },
            matrix: [
                {answer: true, critical: true, notApplicable: false}, //#1
                {answer: true, critical: true, notApplicable: false},//#2
                {answer: false, critical: false, notApplicable: false},//#3
                {answer: true, critical: true, notApplicable: false},//#4
                {answer: true, critical: true, notApplicable: true},//#5
                {answer: true, critical: true, notApplicable: false},//#6
                {answer: null, critical: false, notApplicable: true},//#7
                {answer: true, critical: true, notApplicable: true},//#8
                {answer: false, critical: false, notApplicable: false},//#9
                {answer: true, critical: false, notApplicable: false},//#10
                {answer: true, critical: true, notApplicable: false},//#11
                {answer: true, critical: false, notApplicable: false},//#12
                {answer: true, critical: false, notApplicable: false},//#13
                {answer: true, critical: false, notApplicable: false},//#14
            ]
        },
        '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0':{
            information:{
                aliasName :"MelonPort",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://golem.network/icons/apple-touch-icon.png",
                status : 'Closed'
            },
            event: {
                args: {
                    tokens: 'amount',
                    sender: 'sender'
                },
                name: 'TokensBought',
            },
            constants: {
                symbol: null,
                totalSupply: {name: 'totalSupply', type: 'uint256'},
                cap: {name: 'ETHER_CAP', type: 'uint256'},
                name: null,
                startDate: {name: 'startTime', type: 'timestamp'},
                endDate: {name: 'endTime', type: 'timestamp'},
            },
            matrix: [
                {answer: true, critical: true, notApplicable: false}, //#1
                {answer: true, critical: true, notApplicable: false},//#2
                {answer: false, critical: false, notApplicable: false},//#3
                {answer: true, critical: true, notApplicable: false},//#4
                {answer: true, critical: true, notApplicable: true},//#5
                {answer: true, critical: true, notApplicable: false},//#6
                {answer: null, critical: false, notApplicable: true},//#7
                {answer: true, critical: true, notApplicable: true},//#8
                {answer: false, critical: false, notApplicable: false},//#9
                {answer: true, critical: false, notApplicable: false},//#10
                {answer: true, critical: true, notApplicable: false},//#11
                {answer: true, critical: false, notApplicable: false},//#12
                {answer: true, critical: false, notApplicable: false},//#13
                {answer: true, critical: false, notApplicable: false},//#14
            ]
        },
        '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413':{
            information:{
                aliasName :"TheDAO",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                status : 'Closed'
            },
            event: {
                args: {
                    tokens: 'amount',
                    sender: 'to'
                },
                name: 'CreatedToken',
            },
            constants: {
                symbol: null,
                totalSupply: {name: 'totalSupply', type: 'uint256'},
                cap: null,
                name: null,
                startDate: null,
                endDate: {name: 'closingTime', type: 'timestamp'},
            },
            matrix: [
                {answer: true, critical: true, notApplicable: false}, //#1
                {answer: true, critical: true, notApplicable: false},//#2
                {answer: false, critical: false, notApplicable: false},//#3
                {answer: true, critical: true, notApplicable: false},//#4
                {answer: true, critical: true, notApplicable: true},//#5
                {answer: true, critical: true, notApplicable: false},//#6
                {answer: null, critical: false, notApplicable: true},//#7
                {answer: true, critical: true, notApplicable: true},//#8
                {answer: false, critical: false, notApplicable: false},//#9
                {answer: true, critical: false, notApplicable: false},//#10
                {answer: true, critical: true, notApplicable: false},//#11
                {answer: true, critical: false, notApplicable: false},//#12
                {answer: true, critical: false, notApplicable: false},//#13
                {answer: true, critical: false, notApplicable: false},//#14
            ]
        },
        '0xE7775A6e9Bcf904eb39DA2b68c5efb4F9360e08C':{
            information:{
                aliasName :"TAAS",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                status : 'Closed'
            },
            event: {
                name: 'Transfer',
                args: {
                    tokens: 'value',
                    sender: 'to'
                },
            },
            constants: {
                symbol: {name: 'symbol', type: 'string'},
                totalSupply: {name: 'totalSupply', type: 'uint256'},
                cap: null,
                name: {name: 'name', type: 'string'},
                startDate: null,
                endDate: null,
            },
            matrix: [
                {answer: true, critical: true, notApplicable: false}, //#1
                {answer: true, critical: true, notApplicable: false},//#2
                {answer: false, critical: false, notApplicable: false},//#3
                {answer: false, critical: true, notApplicable: false},//#4
                {answer: false, critical: true, notApplicable: true},//#5
                {answer: false, critical: true, notApplicable: false},//#6
                {answer: null, critical: false, notApplicable: true},//#7
                {answer: false, critical: true, notApplicable: true},//#8
                {answer: false, critical: false, notApplicable: false},//#9
                {answer: true, critical: false, notApplicable: false},//#10
                {answer: true, critical: true, notApplicable: false},//#11
                {answer: true, critical: false, notApplicable: false},//#12
                {answer: true, critical: false, notApplicable: false},//#13
                {answer: true, critical: false, notApplicable: false},//#14
            ]
        },
        '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E':{
            information:{
                aliasName :"StatusNetwork",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                status : 'Closed'
            },
            event: {
                args: {
                    tokens: '_amount',
                    sender: '_to'
                },
                customArgs: {
                    _from: "0x0000000000000000000000000000000000000000",
                },
                name: 'Transfer'
            },
            constants: {
                symbol: {name: 'symbol', type: 'string'},
                totalSupply: {name: 'totalSupply', type: 'uint256'},
                cap: null,
                name: {name: 'name', type: 'string'},
                startDate: {name: 'creationBlock', type: 'timestamp'},
                endDate: null,
            },
            matrix: [
                {answer: true, critical: true, notApplicable: false}, //#1
                {answer: true, critical: true, notApplicable: false},//#2
                {answer: false, critical: false, notApplicable: false},//#3
                {answer: true, critical: true, notApplicable: false},//#4
                {answer: true, critical: true, notApplicable: true},//#5
                {answer: true, critical: true, notApplicable: false},//#6
                {answer: null, critical: false, notApplicable: true},//#7
                {answer: true, critical: true, notApplicable: true},//#8
                {answer: false, critical: false, notApplicable: false},//#9
                {answer: true, critical: false, notApplicable: false},//#10
                {answer: true, critical: true, notApplicable: false},//#11
                {answer: true, critical: false, notApplicable: false},//#12
                {answer: true, critical: false, notApplicable: false},//#13
                {answer: true, critical: false, notApplicable: false},//#14
            ]
        }

    },
    rpcHost: 'http://localhost:8545',
    defaultDecimal: 18,
    matrix: ['Is ICO controlled by a smart contract?',
        'Is smart contract source code available?',
        'Is smart contract source code provided in etherscan?',
        'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)',
        'Does smart contract provide all tracking data via events?',
        'Is information on token price in ETH provided? (via event or in transaction?)',
        'Does smart contract handle ETH in a trustless way?',
        'If ICO is using other currencies is information on token price provided?',
        'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?',
        'Was smart contract code easy to read and properly commented?',
        'Is the ICO doing exactly the same what they say on their website?',
        'is price of the token deterministic?',
        'is ICO start condition deterministic? (block number, date are OK',
        'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)',
    ],
};