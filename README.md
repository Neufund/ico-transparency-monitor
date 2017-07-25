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
 Add Info Here

### Questions
ICO smart contracts are assigned a class, based on a decision matrix by manually answering these questions:

1. Is ICO controlled by a smart contract? (some ICOs are entirely performed in the backend and smart contract is created post factum. Example ICONOMI)

2. Is smart contract source code available? (license type ie. if this is open source or not does not matter)

3. Is smart contract source code provided in etherscan?

4. Is instruction provided how to reproduce deployed byte-code? (does not apply if etherscan source is there)

5. Does smart contract provide all tracking data via events? (if it is easy to read accounts, tokens, and token price from events)

6. Is information on token price in ETH provided? (via event or in transaction?)

7. Does smart contract handle ETH in a trustless way? Is ETH really sent to ICO smart contract in a transaction or we need to trust some backend on it. Please note that there can be ICO without ether at all (like Neufund ICO)

8. If ICO is using other currencies is information on token price provided?

9. Does smart contract handle other currencies in a trustless way? Does some smart contract store balance of those currencies? (it is like our EUR Token)

10. Was smart contract code easy to read and properly commented?
11. Does the ICO doing exactly the same what they say on their website?

### Classes
Using the collected data and answered questions an ICO is given one of these states:
1. Non-transparent
2. Transparent with issues
3. Fully transparent

### Decision Matrix
Based on the Decision Matrix An ICO is assigned a class. An ICO is considered Non-transparent when N "No" is given to all the questions asked for example.

The decision matrix is represented as:

| |Question | Non-Transparent |Transparent with issues|Fully Transparent|Comment|
|-|----------|-----------------|-----------------------|-----------------|-------|
|1|Is ICO controlled by a smart contract?|N|Y|Y||
|2|Is smart contract source code available?|N|Y|Y||
|3|Is smart contract source code provided in etherscan?|N|Y or N| Y|
|4|Is instruction provided how to reproduce deployed bytecode?|N|Y|Y|Source code in ether scan counts as Y|
|5|Does smart contract provide all tracking data via events?|N|Y|Y|We need information on accounts and number of tokens created. If those are sent by a backend answer is N|
|6|Is information on token price in ETH provided?|N| Y or N/A| Y or N/A|Information on token price must be provided in an event or in transaction. For non-ETH ICOs we skip this question|
|7|Does smart contract handle ETH in a trustless way?|N| Y or N or N/A| Y |ETH price must be a part of transaction.See comments above|
|8|If ICO is using other currencies is information on token price provided?|N|Y or N/A| Y|If ICO is handling other currencies natively then token price should be provided (or equivalent information like rate to ICOs base currency)|
|9|Does smart contract handle other currencies in a trustless way?|N| Y or N or N/A| Y or N or N/A|Does some smart contract store balance of those currencies?
|10|Was smart contract code easy to read and properly commented?|N|Y or N|Y or N||
|11|Is the ICO doing exactly the same what they say on their website ?|N|Y|Y|This is a post factum question, to be added during or after ICO|

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
  Config.js holds the configuration data for ICOs currently available. Every ICO should has a set of parameters in order for the ICO monitor to processes the data correctly.

  A general form of an ICO configration can be presented as:

```
    '#ADDRES-OF-CONTRACT': {
     tokenContract:#ADDRESS-OF-TOKEN-CONTRACT,
      information: {
        aliasName: "NAME-OF-ICO",
        website: "WEBSITE-OF-ICO",
        logo: 'ICO-LOGO'
      },
      event: {
        NameofEvent: {
        args: {
          tokens: 'TOKEN-VARIABLE',
          sender: 'INVESTOR-VARIABLE',
        },
        name: 'ICO-EVENT-NAME',
        customArgs: {
          _from: 'FROM-ADDRESS'
        },
        firstTransactionBlockNumber: FIRST-BLOCK
        lastTransactionBlockNumber: LAST-BLOCK
        },
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
    }
```
  `ADDRESS-OF-CONTRACT` : Ethereum address that points to the main ICO smart contract

  `tokenContract` (Optional) : In some cases a dedicated token smart contract is responsible for token issuing and release.

  `aliasName`: Name of the ICO or its alias

  `website`: Link that points to the ICO website

  `logo`: Link that points to the ICO logo
  `event`: An array of events generated by the ICO, under this section we specify ICO events
  `NameofEvent`: Name of Generated event

  `Args`: Arguments of generated event

  `tokens`: Name of Variable that represents a token in some cases `Amount, Transfer, _amount` This can be taken from the smart contract source code or [etherscan](https://etherscan.io/)

  `sender`: Variable name that holds the address of the receiver of tokens or the investor

  `name`: Name of event generated by the smart-contract and logged in the etherium blockchain sometimes `Transfer, TokensBought, CreatedToken`. *Note:Without the correct event flag it is impossible to track token issue events*

  `_from`: In some cases smart-contracts include From addresses that are generated in the public blockchain blockchain, if that was case for your smart contract you will have to include it here

  `firstTransactionBlockNumber`(Optional): Starting block number of the ICO in the public eth blockchain can be taken from [etherscan](https://etherscan.io/). If not specified ICO-Monitor will scan it automatically

  `lastTransactionBlockNumber`(Optional): Final Block of the ICO in the public eth blockchain can be taken from [etherscan](https://etherscan.io/). If not specified ICO-Monitor will scan it automatically

  `icoParameters`: ICO Monitor uses four main parameters to analyze an ICO `cap, startDate, endDate, states`. Every parameter should be returned after conducting the needed requests and calculations from the smart-contract.
  This must be written manually for every ICO due to the lack of standards. Every smart-contract handles generating a these parameters differently

  `cap` Capsize of an ICO

  `startDate` Start date of an ICO

  `endDate` End date of an ICO

  `states` Current states of smart contract

  `Matrix` Answers for the [decision matrix](https://github.com/Neufund/ico-transparency-monitor#decision-matrix) where `True = Y , False = N , null = N/A`, all questions should be in the form
  `q'n': { answer: true, comment: '' }, ` where `n` is the questions number

### Examples
 For examples on how to add manual ICO, look at the already available contracts in [config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)

#### Note
Not all smart contracts provide the needed information, some use different smart-contracts to generate tokens, some have an obscure processes, some have no source code, and some only used a smart-contract after the end of
an ICO

## Getting started

### Setting up your development environment

I recommend and Ubuntu machine with Chrome and Atom. You can use whatever you want.

Install [Chrome][chrome] and the extensions [React Developer Tools][react-ext] and [Redux DecTools][redux-ext].

[chrome]: https://www.google.com/chrome/browser/features.html?brand=CHBD&gclid=CO2x8Ibw5NMCFYoQ0wodulgAlQ&dclid=CO7Tmofw5NMCFUakUQodVc8BvA
[react-ext]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
[redux-ext]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

#### Atom
Install [Atom][atom] and run the command bellow to install a bunch of packages. Afterwards, configure the eslint plugin to ‘fix on save’.

```
apm install editorconfig file-icons language-diff language-ini language-markdown linter linter-eslint linter-solidity linter-sass-lint linter-write-good minimap minimap-git-diff minimap-highlight-selected
```

[atom]: https://atom.io/

#### Webstorm
Enable editorconfig plugin - [JetBrains manual](https://www.jetbrains.com/help/webstorm/2017.1/configuring-code-style.html#editorconfig)
Enable ESLint plugin - [JetBrains manual](https://www.jetbrains.com/help/webstorm/2017.1/eslint.html)
Note that at this time (WebStorm 2017.1.3) you cannot set formatting rules to use one's from ```.eslintrc.json```
([issue](https://youtrack.jetbrains.com/issue/WEB-19350)). So you cannot use "Reformat Code" function but you can use plugin
integration. If you see ESLint error you can hit "alt-enter" and choose "ESLint: fix current file". Another option would be to manually edit IDE's javascript codestyle settings.

### Getting up and running

Open the project folder in Atom. Then in a terminal, download all the dependencies:

```
yarn
```


#### Possible `node-sass` issues

For some node / npm versions there is slight problem with `node-sass`. You need to recompile it for your node version after issuing `yarn`.
```
npm rebuild node-sass
```

For now we are using [create-react-app](https://github.com/facebookincubator/create-react-app) to run project:

```
yarn start

```
