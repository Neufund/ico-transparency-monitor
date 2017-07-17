# ICO-Transparency-Monitor

[![Build Status](https://travis-ci.org/Neufund/ico-transparency-monitor.svg)](https://travis-ci.org/Neufund/ico-transparency-monitor) [![Greenkeeper badge](https://badges.greenkeeper.io/Neufund/generic-ico.svg)](https://greenkeeper.io/)

## Adding your own ICOs to the Transparency-Monitor
The ICO-monitor collects information from the blockchain public-ledger using a set of pre-defined
rules set in [\config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)

To add your own ICO you would have to

1 - Include the ICO Smart-Contract [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI) in the [\Smart_Contracts](https://github.com/Neufund/ico-transparency-monitor/tree/master/src/smart_contracts) folder
    this ABI is generated from the smart-contract source code and can be found in some cases in [etherscan](https://etherscan.io/)

2 - Configure [\config.js](https://github.com/Neufund/ico-transparency-monitor/blob/master/src/config.js)
  and add the required information from the smart contract manually. Because there is almost no standard
  in ICOs and it is impossible to generate data based on a static set of variables, this
  will require some JavaScript modifications to handle promises.

  The more information added, the higher the transparency grade can be.  <br/>

  An example of a smart contract configuration

    '0xa74476443119a942de498590fe1f2454d7d4ac0d': {
      information: {
        aliasName: 'Golem',
        website: 'https://golem.network/',
        logo: 'https://golem.network/icons/apple-touch-icon.png',
      },
      event: {
        args: {
          tokens: '_value',
          sender: '_to',
        },
        name: 'Transfer',
        customArgs: {
          _from: '0x0000000000000000000000000000000000000000',
        },
        firstTransactionBlockNumber: 2607801,
        lastTransactionBlockNumber: 2607939,
      },
      icoParameters: {
        cap: async (icoContract) => {
          const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
          return maxCap / 10 ** 18;
        },
        capString: async (icoContract) => {
          const maxCap = await toPromise(icoContract.tokenCreationRate)().valueOf();
          const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
          return `Maximum Cap: ${maxCap / 10 ** 18}, Min Cap: ${minCap / 10 ** 18}`;
        },
        startDate: async (icoContract) => {
          const blockNumber = await toPromise(icoContract.fundingStartBlock)();
          return constantValueOf(blockNumber, 'blockNumber');
        },
        endDate: async (icoContract) => {
          const blockNumber = await toPromise(icoContract.fundingEndBlock)();
          return constantValueOf(blockNumber, 'blockNumber');
        },
        status: async icoContract => 'WAITING',
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
      },
    },

Where

    '#ADDRES-OF-CONTRACT': {
     tokenContract:#ADDRESS-OF-TOKEN-CONTRACT,
    information: {
      aliasName: "NAME-OF-ICO",
      website: "WEBSITE-OF-ICO",
      logo: 'ICO-LOGO'
    },
    event: {
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
    icoParameters: {
      cap: {
        CODE-TO-GENERATE-CAP
      },
      capString: {
        CODE-TO-GENERATE-CAP-STRING
      },
      startDate: {
        CODE-TO-GENERATE-STARTDATE
      },
      endDate: {
        CODE-TO-GENERATE-ENDDATE
      },
    status: CODE-TO-GET-CONTRACT-STATUS,
    },
    matrix: {
      ANSWER-TO-SMART-CONTRACT-QUESTIONS
    }
    }

  `ADDRESS-OF-CONTRACT` : Ethereum address that points to the ICO-Smart-Contract

  `ADDRESS-OF-TOKEN-CONTRACT` (Optional) : In some cases a dedicated token smart contract is responsible
  for token issuing and release, if that was the case its address should me provided here

  `NAME-OF-ICO`: Usually should represent the name of the ICO or its alias

  `WEBSITE-OF-ICO`: A link that points to the ICO website

  `ICO-LOGO`: A link that points to the ICO logo

  `TOKEN-VARIABLE`: Name of Variable that represents a token in some cases `Amount, Transfer, _amount` This
  can be taken from the smart-contract source or [etherscan](https://etherscan.io/)

  `INVESTOR-ADDRESS`: Variable name that holds the address of the receiver of tokens or the Investor

  `ICO-EVENT-NAME`: Name of event generated by the smart-contract and logged in the etherium ledger sometimes `Transfer, TokensBought, CreatedToken`. Without the correct event flag
  it is impossible to track token issue events

  `FROM-ADDRESS`: If found in a contract it presents the address sent from in the log, this is not in all smart-contracts and can be neglected if not
  found




Not all smart contracts provide the needed informtation and for

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
