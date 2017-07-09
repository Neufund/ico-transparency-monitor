import {toPromise} from './utils';
import {constantValueOf, getSmartContract} from './utils/web3';

export default {
    ICOs: {
        '0xa74476443119a942de498590fe1f2454d7d4ac0d': {
            information: {
                aliasName: "Golem",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://golem.network/icons/apple-touch-icon.png",
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
                firstTransationBlockNumber:2607801 ,
                lastTransationBlockNumber:2607939
            },
            icoParameters: {
                cap: async (icoContract) => {
                    const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
                    return maxCap/10**18;
                },
                capString: async (icoContract) => {
                    const maxCap = await toPromise(icoContract.tokenCreationRate)().valueOf();
                    const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
                    return `Maximum Cap: ${maxCap/10**18}, Min Cap: ${minCap/10**18}`
                },
                startDate: async (icoContract) => {
                    const blockNumber = await toPromise(icoContract.fundingStartBlock)();
                    return constantValueOf(blockNumber, 'blockNumber')
                },
                endDate: async (icoContract) => {
                    const blockNumber = await toPromise(icoContract.fundingEndBlock)();
                    return constantValueOf(blockNumber, 'blockNumber')
                },
                status: async (icoContract) =>{
                    return "WAITING";
                }
            },
            matrix: {
                q1: {answer: true, comment: ''},
                q2: {answer: true, comment: ''},
                q3: {answer: false, comment: 'Source code is not exists'},
                q4: {answer: true, comment: ''},
                q5: {answer: true, comment: ''},
                q6: {answer: true, comment: ''},
                q7: {answer: null, comment: ''},
                q8: {answer: true, comment: ''},
                q9: {answer: false, comment: ''},
                q10: {answer: true, comment: ''},
                q11: {answer: true, comment: ''},
                q12: {answer: true, comment: ''},
                q13: {answer: true, comment: ''},
                q14: {answer: true, comment: ''},
            }
        },
        '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0': {
            tokenContract:'0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
            information: {
                aliasName: "MelonPort",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://golem.network/icons/apple-touch-icon.png",
                status: 'Closed'
            },
            event: {
                args: {
                    tokens: 'amount',
                    sender: 'sender'
                },
                name: 'TokensBought',
            },
            icoParameters: {
                cap : async(icoContract) => {
                    const minerToken = getSmartContract('0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1');
                    const cap = await toPromise(minerToken.MAX_TOTAL_TOKEN_AMOUNT_OFFERED_TO_PUBLIC)();
                    return cap.valueOf()/10**18;
                },
                startDate: async (icoContract) => {
                    const blockNumber = await toPromise(icoContract.startTime)();
                    return constantValueOf(blockNumber, 'timestamp')
                },
                endDate: async (icoContract) => {
                    const blockNumber = await toPromise(icoContract.endTime)();
                    return constantValueOf(blockNumber, 'timestamp')
                },
                status: async (icoContract) =>{
                    return "WAITING";
                }
            },
            matrix: {
                q1: {answer: true, comment: ''},
                q2: {answer: true, comment: ''},
                q3: {answer: false, comment: 'Source code is not exists'},
                q4: {answer: true, comment: ''},
                q5: {answer: true, comment: ''},
                q6: {answer: true, comment: ''},
                q7: {answer: null, comment: ''},
                q8: {answer: true, comment: ''},
                q9: {answer: false, comment: ''},
                q10: {answer: true, comment: ''},
                q11: {answer: true, comment: ''},
                q12: {answer: true, comment: ''},
                q13: {answer: true, comment: ''},
                q14: {answer: true, comment: ''},
            }
        },
        '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413': {
            information: {
                aliasName: "TheDAO",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                status: 'Closed'
            },
            event: {
                args: {
                    tokens: 'amount',
                    sender: 'to'
                },
                name: 'CreatedToken',
            },
            icoParameters: {
                status: async (icoContract) =>{
                    return "WAITING";
                }
            },
            matrix: {
                q1: {answer: true, comment: ''},
                q2: {answer: true, comment: ''},
                q3: {answer: true, comment: 'Source code is not exists'},
                q4: {answer: true, comment: ''},
                q5: {answer: true, comment: ''},
                q6: {answer: true, comment: ''},
                q7: {answer: null, comment: ''},
                q8: {answer: true, comment: ''},
                q9: {answer: false, comment: ''},
                q10: {answer: true, comment: ''},
                q11: {answer: true, comment: ''},
                q12: {answer: true, comment: ''},
                q13: {answer: true, comment: ''},
                q14: {answer: true, comment: ''},
            }

        },
        '0xE7775A6e9Bcf904eb39DA2b68c5efb4F9360e08C': {
            // tokenContract:'0x331d077518216c07c87f4f18ba64cd384c411f84',
            information: {
                aliasName: "TAAS",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
            },
            event: {
                name: 'Transfer',
                args: {
                    tokens: 'value',
                    sender: 'to'
                },
                customArgs: {
                    from: "0x94917caf0cb1131345911874a2ceaf6ae2e8ee0f",
                }
            },
            icoParameters: {
                cap : async(icoContract) => {
                    return  null;
                },
                startDate: async (icoContract) => {
                    return null
                },
                endDate: async (icoContract) => {
                    return null
                },
                status: async (icoContract) =>{
                    return null;
                }
            },
            matrix: {
                q1: {answer: true, comment: ''},
                q2: {answer: true, comment: ''},
                q3: {answer: false, comment: 'Source code is not exists'},
                q4: {answer: true, comment: ''},
                q5: {answer: false, comment: ''},
                q6: {answer: false, comment: 'Dont provide the smart contract on etherscan'},
                q7: {answer: null, comment: ''},
                q8: {answer: true, comment: ''},
                q9: {answer: false, comment: ''},
                q10: {answer: true, comment: ''},
                q11: {answer: true, comment: ''},
                q12: {answer: true, comment: ''},
                q13: {answer: true, comment: ''},
                q14: {answer: true, comment: ''},
            }
        },
        '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E': {
            information: {
                aliasName: "StatusNetwork",
                description: 'Blockchain protocol for digital asset management',
                logo: "https://yt3.ggpht.com/-JvEFRK33tZA/AAAAAAAAAAI/AAAAAAAAAAA/71uuEERmHz0/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                status: 'Closed'
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
            icoParameters: {
                cap : async(icoContract) => {
                    return  null;
                },
                startDate: async (icoContract) => {
                    const blockNumber = await toPromise(icoContract.creationBlock)();
                    return constantValueOf(blockNumber, 'blockNumber')
                },
                endDate: async (icoContract) => {
                    return null
                },
                status: async (icoContract) =>{
                    return null;
                }
            },
            matrix: {
                q1: {answer: true, comment: ''},
                q2: {answer: true, comment: ''},
                q3: {answer: false, comment: 'Source code is not exists'},
                q4: {answer: true, comment: ''},
                q5: {answer: true, comment: ''},
                q6: {answer: true, comment: ''},
                q7: {answer: null, comment: ''},
                q8: {answer: true, comment: ''},
                q9: {answer: false, comment: ''},
                q10: {answer: true, comment: ''},
                q11: {answer: true, comment: ''},
                q12: {answer: true, comment: ''},
                q13: {answer: true, comment: ''},
                q14: {answer: true, comment: ''},
            }
        }
    },
    rpcHost: 'http://localhost:8545',
    defaultDecimal: 18,
    matrix: {
        q1: {question: 'Is ICO controlled by a smart contract?', critical: false, notApplicable: false},
        q2: {question: 'Is smart contract source code available?', critical: false, notApplicable: false},
        q3: {question: 'Is smart contract source code provided in etherscan?', critical: false, notApplicable: false},
        q4: {
            question: 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)',
            critical: false,
            notApplicable: false
        },
        q5: {
            question: 'Does smart contract provide all tracking data via events?',
            critical: false,
            notApplicable: false
        },
        q6: {
            question: 'Is information on token price in ETH provided? (via event or in transaction?)',
            critical: true,
            notApplicable: false
        },
        q7: {question: 'Does smart contract handle ETH in a trustless way?', critical: false, notApplicable: false},
        q8: {
            question: 'If ICO is using other currencies is information on token price provided?',
            critical: false,
            notApplicable: false
        },
        q9: {
            question: 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?',
            critical: false,
            notApplicable: false
        },
        q10: {
            question: 'Was smart contract code easy to read and properly commented?',
            critical: false,
            notApplicable: false
        },
        q11: {
            question: 'Is the ICO doing exactly the same what they say on their website?',
            critical: false,
            notApplicable: false
        },
        q12: {question: 'is price of the token deterministic?', critical: false, notApplicable: false},
        q13: {
            question: 'is ICO start condition deterministic? (block number, date are OK',
            critical: false,
            notApplicable: false
        },
        q14: {
            question: 'is ICO end condition specified? (block number, date, cap reached, price reached, any other algo in smart contract)',
            critical: false,
            notApplicable: false
        }
    },
};