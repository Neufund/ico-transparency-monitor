# ICO-Transparency-Monitor

[![Build Status](https://travis-ci.org/Neufund/ico-transparency-monitor.svg)](https://travis-ci.org/Neufund/ico-transparency-monitor) [![Greenkeeper badge](https://badges.greenkeeper.io/Neufund/generic-ico.svg)](https://greenkeeper.io/)

ICO-Transparency-Monitor is a powerful tool that tracks ICOs for different features in order to evaluate how transparent these ICOs are. This is done by answering a number of questions, for example the availability of source code and quality of the ICOs smart-contract. <br/>

In addition a number of generated graphs from these ICOs can help users assess statistically these ICOs. These graphs can be directly used for publication and articles related to analysis if ICOs.

Currently a number of ICOs are already available and more can be manually added to the Transparency-Monitor in order study a specific ICO or compare between different ICOs.
## How it works

### Data Collection
All [transactions](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#index-8) executed in the ethereum network are logged and stored as [blocks](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#blocks) in the public ethereum blockchain. These transactions can either be a transfer or execution of code in the form of a [Smart Contract](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contract).<br/>

 When a Smart Contract is executed, it generates  [log](http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#logs) events based on how it is programmed and what function is  executed at the time. In most cases ICOs are token generating smart contracts, where every token generation by the ICO's smart contract is permanently logged in the blockchain.

 Using [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API#watch-callback-return-value) The ICO-Monitor takes the address of an ICO Smart Contract and scans through the whole blockchain and collects all token generation events logged by the ICO smart contract.


 ### Parity Node 
Parity is an Ethereum client tool which allows you to interact with the blockchain and which is written in Rust programming language. If you wish to read more about Parity, please click [here](https://github.com/paritytech/parity#about-parity).

There is a JSON-RPC method called [`eth_getLogs`](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getlogs) that returns an array of all logs matching the filter object.
 Since we scan all the logs for the ICO from the Ethereum network, and because we do not want to make two requests to have the `timestamp` and ether `value` of transaction that created the log, we decided to have our
  Neufund [fork](https://github.com/Neufund/parity) on `Neufund_mod` branch, we added custom JSON-RPC method `eth_getLogsDetails`.
 It has the same inputs as `eth_getLogs`, but here, you will find the `timestamp` and ether `value` of transaction attached in each log in the output. 
 This enhances the performance of the ICO Transparency Monitor greatly.

Testing `eth_getLogsDetails` using cURL :

Request

```$xslt
curl http://localhost:8545 -H "Content-Type: application/json" -X POST --data '{"id":1497353430507566,"jsonrpc":"2.0","params":[{"fromBlock":"0x0","toBlock":"latest","address":"0xa74476443119a942de498590fe1f2454d7d4ac0d","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000",null]}],"method":"eth_getLogsDetails"}'

```

The response is exactly the same like `eth_getLogs` but with `timestamp` and the ether `value` of transaction attached for each single log.
```$xslt
[ ... ,
{"address":"0xa74476443119a942de498590fe1f2454d7d4ac0d",
"blockHash":"0x49e03d72cfa4f95601b15f61d6785ddf32e17fc4c6e352bd72f49de1f7a7a56d",
"blockNumber":"0x27cb43",
"data":"0x00000000000000000000000000000000000000000094e47b8d68171534000000",
"logIndex":"0x10",
"timestamp":1478878985,
"topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
"0x0000000000000000000000000000000000000000000000000000000000000000",
"0x0000000000000000000000004319c142f7b6cd722fc3a49289b8a22a7a51ca1e"],
"transactionHash":"0x1bdf7f7da468cdf9d5098abb2c06fd6fc1264a33eaf36bdc35e617cc8010e681",
"transactionIndex":"0x19",
"transactionLogIndex":"0x0",
"type":"mined",
"value":"0x0"}]
```

### Transparency Questionnaire
ICO smart contracts are assigned a transparency class via a [decision function](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/utils.js#L34) which takes a set of answers as an input. In principle all questions are answered by analysis of the Solidity code of smart contracts. We are not looking at teams, token models or their ecosystem impact. We also are not doing a typical code review that looks for bugs. We are looking for the following:

* Breaches in trustless trust, where essential terms are controlled by a person, not a smart contract. A serious breach is for example a contracts that issues tokens from previously pledged ETH by action of an owner (and not in typical 'claim' pattern), less serious are token prices, caps and end dates that can be changed by the owner and not by some market mechanism or smart contract code.
* ETH/money flow is not going through smart contract but is handled by some backend service (serious breach) or ETH goes directly to some wallet where it is out of control of smart contract even before ICO ends and tokens are issued.
* Smart Contract code is convoluted or it does something different than it looks. Most serious breach is a lack of source code. Less serious breach could be for example a day computation that uses 23 hours not 24 ;>

Please note again note that we are not evaluation products or business model. A scam (like financial pyramid) can be 100% trustless and transparent from the code point of view.

To help assess ICO issues we answer following set of questions for ICOs we list here:

1. Is ICO controlled by a smart contract? (some ICOs are entirely performed on the backend or smart contract and filled by data post factum.)

2. Is smart contract source code available? (even if there is a smart contract we need its source code, pretty obvious)

3. Is smart contract source code provided in etherscan? (it is very handy but not required)

4. Is instruction provided how to reproduce deployed byte-code? (we trust etherscan but other byte code verification methods are also fine!)

5. Does smart contract provide all tracking data via events? (if it is easy to read accounts, tokens, and token price from events)

6. Is information on token price in ETH provided? (via event or in transaction?)

7. Does smart contract handle ETH in a trustless way? Is ETH really sent to ICO smart contract in a transaction or we need to trust some backend on it?

8. If ICO is using other currencies is information on token price provided? (future ICOs may use tokens or tokenized fiat currencies as base currency for the ICO)

9. Does smart contract handle other currencies in a trustless way? Does some smart contract store balance of those currencies? (like Melonport's EURO Token)

10. Was smart contract code easy to read and properly commented?

11. Are token holder rights protected in trustless way? (see paragraph on breaches of trustless trust above)

12. Is price of the token deterministic? (is price or mechanism controlling the price specified in smart contract or owner can change it as s/he wants?)

13. Is ICO start condition specified in contract? (as above)

14. Is ICO end condition specified in contract? (as above)

### Transparency Decision
Transparency decision is based on answers to questions above, as a result an ICO is assigned to one of these classes:
1. Non-transparent
2. Transparent with issues
3. Fully transparent

Each question has two properties `critical` and `notApplicable`, based on the type of question and how much it effects the transparency processes of the ICO.

An ICO is immediately considered *Non-Transparent* if any question that was answered false `answer: false` and was considered critical `critical: true`. However, if the question was considered non critical `critical: false` and had `answer: false` the ICO is considered *Transparent with issues* instead.

In some cases a question is considered `notApplicable` for some ICO's where answering this question does not effect the transparency, if a `notApplicable: true` question was given `answer: null` the ICO monitor will discard this question and not count it in the transparency processes.

The decision matrix is represented as (as specified in [config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js#L506)):

| |Question | Critical |Not Applicable|
|-|----------|-----------------|-----------------------|
|1|Is ICO controlled by a smart contract?|false|false|
|2|Is smart contract source code available?|true|false|
|3|Is smart contract source code provided in etherscan?|false|false|
|4|Is instruction provided how to reproduce deployed bytecode?|true| true|
|5|Does smart contract provide all tracking data via events?|false|false|
|6|Is information on token price in ETH provided?|true|true|
|7|Does smart contract handle ETH in a trustless way?|false|true|
|8|If ICO is using other currencies is information on token price provided?|true|true|
|9|Does smart contract handle other currencies in a trustless way?|false|true|
|10|Was smart contract code easy to read and properly commented?|false|false|
|11|Is the ICO doing exactly the same what they say on their website ?|true|false|
|12|Is price of the token deterministic?|false| false |
|13|Is ICO start condition specified in contract?| false| false |
|14|Is ICO end condition specified in contract?| false | false |

## Adding custom ICOs to the Transparency-Monitor
The ICO-monitor collects information from the blockchain public-ledger using a set of predefined
rules set in [config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)

To add your own ICO you would have to:

1. Include the ICO Smart-Contract [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI) in the [Smart_Contracts](https://github.com/Neufund/ico-transparency-monitor/tree/master/src/smart_contracts) folder
    this ABI is generated from the smart-contract source code and can be found in some cases in [etherscan](https://etherscan.io/)

2. Configure [config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)
  and add the required information from the smart contract manually. This will require some JavaScript modifications.

3. Any official addition to the ICO-Monitor should be done in the form of a Pull Request. This PR will be checked for accuracy
  and then merged to the ICO-Monitor which can be accessed through our running node.

### Config.js
Config.js holds the configuration data for ICOs currently available. Every ICO should have a set of parameters in order for the ICO monitor to processes the data correctly.

A general form of an ICO configuration can be presented as:

```
    '#ADDRES-OF-CONTRACT': {
     tokenContract:#ADDRESS-OF-TOKEN-CONTRACT,
      information: {
        aliasName: "NAME-OF-ICO",
        website: "WEBSITE-OF-ICO",
        logo: 'ICO-LOGO'
      },
      events: {
        NameofEvent: {
        args: {
          tokens: 'TOKEN-VARIABLE',
          sender: 'INVESTOR-VARIABLE',
          ether: 'EHTER-VALUE'
        },
        customArgs: {
          CUSTOM-ARGS
        },
        firstTransactionBlockNumber: FIRST-BLOCK
        lastTransactionBlockNumber: LAST-BLOCK
        maxBlocksInChunk: BLOCK-SIZE
        countTransactions: TRUE or FALSE
        },
        {}
      },
      icoParameters: {
        cap: {
          CODE-TO-GENERATE-CAP
        },
        startDate: {
          CODE-TO-GENERATE-STARTDATE
        },
        endDate: {
          CODE-TO-GENERATE-ENDDATE
        },
        status: {
        CODE-TO-GET-CONTRACT-STATUS,
        },
      },
      matrix: {
        q1: { answer: true, comment: '' },
        q2: { answer: true, comment: '' },
        q3: { answer: false, comment: 'Source code is not exists' },
        q4: { answer: true, comment: '' },
        q5: { answer: true, comment: '' },
        q6: { answer: true, comment: '' },
        q7: { answer: null, comment: '' },
        q8: { answer: true, comment: '' },
        q9: { answer: false, comment: '' },
        q10: { answer: true, comment: '' },
        q11: { answer: true, comment: '' },
        q12: { answer: true, comment: '' },
        q13: { answer: true, comment: '' },
        q14: { answer: true, comment: '' },
      }
      alternativeLoadingMsg:
      addedBy:
    }
```
  `ADDRESS-OF-CONTRACT` : Ethereum address that points to the main ICO smart contract

  `tokenContract` (Optional) : In some cases a dedicated token smart contract is responsible for token issuing and release.

  `aliasName`: Name of the ICO, will be overwritten by `name` from ERC20 token interface

  `website`: Link that points to the ICO website

  `logo`: Link that points to the ICO logo image

  `events`: An dictionary of events generated by the ICO, under this section we specify events that we will acquire from Ethereum logs

  `NameofEvent`: Name of event in ICO contract ABI

  `Args`: Arguments of interest in generated event

  `tokens`: Name of argument that represents amount of created tokens; in some cases `Amount, Transfer, _amount`. Skip if there is no information on tokens in event.

  'ether': Name of argument that represents amount of ether for which tokens were acquired. If skipped we'll take ether value from transaction that created this event.

  `sender`: Variable name that holds the address of the receiver of tokens and or sender of ether.

  `customArgs`: Additional filter for the events as passed to eth_getLogs. Typical use case is `Transfer` event of ERC20 Token where token generation is marked by having '_from' set to 0x0. See `Golem` ICO for a reference.

  `firstTransactionBlockNumber`(Optional): Starting block number of the ICO in the public eth blockchain can be taken from [etherscan](https://etherscan.io/). If not specified ICO-Monitor will scan for events from genesis block. (when submitting ICO please use as close range as possible)

  `lastTransactionBlockNumber`(Optional): Final Block of the ICO in the public eth blockchain can be taken from [etherscan](https://etherscan.io/). If not specified ICO-Monitor will scan until current block. `latest` is a valid value here. (when submitting ICO please use as close range as possible))

  `maxBlocksInChunk` (Optional): Used in case of large or ongoing ICO. We will download data from Parity in chunks with specified size. This is required for caching as Parity is currently serializing all request and wait times under heavy load will be long.

  `countTransactions`: At least one event in dictionary should be marked as true. This will tell Monitor to count those events as Transactions in graphs. Typically those should be events that are associated with sender/investor sending ether to smart contract.

  `icoParameters`: This section should be written manually using JavaScript code that connects with the smart contract and return the needed variables.

  The ICO-Monitor uses four main parameters:

  1. `cap` Capsize of an ICO

  2. `startDate` Start date of an ICO

  3. `endDate` End date of an ICO

  4. `status` Current status of smart contract, this can be returned as a string enum and must be one of these values  `in progress`, `successful`, `not provided`.

  `Matrix` Answers for the [decision matrix](https://github.com/Neufund/ico-transparency-monitor#decision-matrix). The ICO monitor scans this matrix for answers and produces a final conclusion based on the answers. For each specific question in the dicision matrix an answer should be either:

  1. `true`: if the answer to the specific qustion is **Yes**
  2. `false`: if the answer to the specific qustion is **No**
  3. `null` if the answer was **Not Applicable** and couldn't be answered

  `alternativeLoadingMsg` You can provide alternative loading message that will be displayed while contract is being analyzed.

  `addedBy` Name of the person that added this ICO. This will be displayed on the ICO monitor next to this ICO

### Examples
Best way to learn how to add new ICO is to look at existing examples. Let's take EOS ICO
```
ICOs: {
    '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf': {
      tokenContract: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
      information: {
        aliasName: 'EOS',
        logo: 'https://d340lr3764rrcr.cloudfront.net/Images/favicon.ico',
        website: 'https://eos.io/',
      },
      events: {
        // in this transactions investors send money but claim their tokens later
        LogBuy: {
          args: {
            tokens: null, // tokens not generated here, just ether gathered
            sender: 'user',
            ether: null // we will take ether from transaction value
          },
          firstTransactionBlockNumber: 3932884,
          lastTransactionBlockNumber: null, // follow last block
          maxBlocksInChunk: 12960, // scan in 3 const eventArgs = selectedICO.event.args;days blocks, last one is open
          countTransactions: true,
        },
        // in this transaction people come and claim their tokens
        LogClaim: {
          args: {
            tokens: 'amount', // tokens are generated when claimed
            sender: 'user',
          },
          firstTransactionBlockNumber: 3932884,
          lastTransactionBlockNumber: null, // follow last block
          maxBlocksInChunk: 12960, // scan in 3 days blocks, last one is open
          countTransactions: false,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const totEOS = convertWeb3Value(await toPromise(icoContract.totalSupply)(), 'ether');
          const foundersEOS = convertWeb3Value(await toPromise(icoContract.foundersAllocation)().valueOf(), 'ether');
          return `Max ${formatNumber(totEOS - foundersEOS)} EOS, no ETH cap!`;
        },
        startDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.openTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        endDate: async (web3, icoContract) => {
          const timestamp = parseInt(await toPromise(icoContract.startTime)().valueOf());
          // (timestamp - startTime) / 23 hours + 1 -> EOS day has 23 hour days :P
          // enddate = (numberofdays - 1) * 23h + startdate
          const endTs = (await toPromise(icoContract.numberOfDays)().valueOf() - 1) * 23 * 60 * 60 + timestamp;
          return (new Date(endTs * 1000)).formatDate();
        },
        status: async (web3, icoContract) => {
          // mind EOS 23h days
          // assert(time() >= openTime && today() <= numberOfDays);
          const today = await toPromise(icoContract.today)().valueOf();
          const noDays = await toPromise(icoContract.numberOfDays)().valueOf();
          console.log(`${today} ${noDays}`);
          return today <= noDays ? 'in progress' : 'successful';
        },
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true, comment: 'Mind that owners can take ETH whenever thay want - nothing is locked! In principle this allows to manipulate daily EOS price' },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: false, comment: 'Code is short but full of tricks: for example EOS day has 23 hours, claimAll method will soon throw out of gas (it is a gas eater!), one day after ICO ends claims are blocked etc.' },
        q11: { answer: true, comment: 'Contract is designed to be an ETH sucking mechanism without any shame, but as it is done transparently and in a trustless way, we say Yes here. code is law ;>' },
        q12: { answer: true, comment: 'Price set due to demand each day, mind to claim your tokens!' },
        q13: { answer: true, comment: 'May be started and re-started whenever Tezos wants' },
        q14: { answer: false, comment: 'EOS day has 23 hours and after ICO is closed you lose your ability to claim' },
      },
      addedBy: 'Rudolfix',
    },

  ```

We'll go thru important config settings only. We start simply by looking for EOS in etherscan and we find ICO smart contract and from there all accompanying contracts:
`0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf`: smart contracts main address taken from etherscan

`tokenContract: 0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0` In this case there was a different smart contract dealt with token generation.

`events`: The smart-contract should be scanned for events, in this case there were two `LogBuy,LogClaim`.It was apparent that the smart contract first uses `LogBuy` to gather received ether and `LogClaim` to issue tokens.

`LogBuy`: First event that gathers tokens

`tokens: null`: Null was given, since this was not a token issuing event

`sender: 'user'`: In this event `user` was the name of variable that indicates the sender address

`firstTransactionBlockNumber: 3932884`: we started with 0 value and then we took first block from Chrome console (Monitor will log block ranges)

 `lastTransactionBlockNumber: null`: This was set null for the ICO monitor to scan till the last block as this is ICO in progress

`maxBlocksInChunk: 12960`: We download in chunks as EOS is an ICO with hundred of thousands of log entries to analyze

`countTransactions: true`: This indicates ether sending transaction


`LogClaim`: Second event that issue tokens after investors buy them

`tokens: amount`: In this event `amount` was the name of variable that indicates amount of tokens

`sender: 'user'`: In this event `user` was the name of variable that indicates the sender address


`cap:`
```
cap: async (web3, icoContract) => {
  const totEOS = convertWeb3Value(await toPromise(icoContract.totalSupply)(), 'ether');
  const foundersEOS = convertWeb3Value(await toPromise(icoContract.foundersAllocation)().valueOf(), 'ether');
  return 'Max ${formatNumber(totEOS - foundersEOS)} EOS, no ETH cap!';
},
```
Analyzing smart contract source code, we quickly discovered that there is no ETH cap, but there is predefined number of tokens sold. All tokens were created at start (`totalSupply`) and some were transfered to founders `foundersAllocation`, rest is being sold

`startDate:`
```
startDate: async (web3, icoContract) => {
  const timestamp = await toPromise(icoContract.openTime)();
  return convertWeb3Value(timestamp, 'timestamp').formatDate();
```
startDate was taken by converting the `openTime` timestamp in a smart contract to a date

`endDate:`
```
const timestamp = parseInt(await toPromise(icoContract.startTime)().valueOf());
// (timestamp - startTime) / 23 hours + 1 -> EOS day has 23 hour days :P
// enddate = (numberofdays - 1) * 23h + startdate
const endTs = (await toPromise(icoContract.numberOfDays)().valueOf() - 1) * 23 * 60 * 60 + timestamp;
return (new Date(endTs * 1000)).formatDate();
```
This is really tricky, there is time limit in BuyWithLimit method and we had to painfully reverse engineer how it is computed and we ported it to javascript... mind the 23h day EOS is using ;>

`status`
```
status: async (web3, icoContract) => {
  // mind EOS 23h days
  // assert(time() >= openTime && today() <= numberOfDays);
  const today = await toPromise(icoContract.today)().valueOf();
  const noDays = await toPromise(icoContract.numberOfDays)().valueOf();
  console.log(`${today} ${noDays}`);
  return today <= noDays ? 'in progress' : 'successful';
},
```
ICO is simply in progress before it's end day. We are using smart contract methods directly to compute those days and then did comparison in javascript. Cool, no?

For examples on how to add manual ICO, look at the already available contracts in [config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)

#### Note
Not all smart contracts provide the needed information, some use different smart-contracts to generate tokens, some have an obscure processes, some have no source code, and some only used a smart-contract after the end of
an ICO


## Getting started
Clone project into local directory

Make sure your local parity node is running

### Getting up and running
Install Dependencies
```
yarn
```
Run Server
```
yarn run serve
```
