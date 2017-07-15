# ICO-Transparency-Monitor

[![Build Status](https://travis-ci.org/Neufund/ico-transparency-monitor.svg)](https://travis-ci.org/Neufund/ico-transparency-monitor) [![Greenkeeper badge](https://badges.greenkeeper.io/Neufund/generic-ico.svg)](https://greenkeeper.io/)

## Adding your own ICO's to the Transparency-Monitor
The ICO monitor collects information from the public-ledger using a set of pre defined
rules found in /config.js

To add your ICO you would have to

1 - Include the ICO Smart-Contracts ABI in the "/Smart_Contracts" folder
    which can be found in etherscan

2 - Configure /Config.js and the needed information for the smart contract
    the more information added the higher the grade can be, an example of 
    a smart contract configuration
    
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
    
    '#Address-of-contract': {
    information: {
      aliasName: "Name of ICO",
      website: "Website of ICO",
      logo: 'Link that points to the logo of the ICO'
    },
    event: {
      args: {
        tokens: 'Variable name that represents token value in the smart-contract',
        sender: 'Viriable name that represents sender',
      },
      name: 'Name of Buying event ex Transfer, TokensBought',
      customArgs: {
        _from: 'Address that represents from in '
      },
      firstTransactionBlockNumber: Number that specifies the first transaction blockNumber
      lastTransactionBlockNumber: Block number that represents the last transaction
      Ico
    }
  }

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

