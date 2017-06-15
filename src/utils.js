import jQuery from "jquery";

import Web3 from 'web3';
import {default as config} from './config.js';

const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

const moment = require('moment');


export const makePromise = (func) => (...args) => new Promise((resolve, fail) =>
    func(...args, (error, result) => error ? fail(error) : resolve(result))
);


export const formateDate = (datetime) => {
    return `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
};

export const formatNumber = (number) => {
    if (number === undefined || !number || typeof number !== "number")
        return number;
    return number.toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
};

export const web3Connect = ()=> {

    let engine = new ProviderEngine();
    let web3 = new Web3(engine);

// static results
    engine.addProvider(new FixtureSubprovider({
        web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
        net_listening: true,
        eth_hashrate: '0x00',
        eth_mining: false,
        eth_syncing: true,
    }));

// cache layer
    engine.addProvider(new CacheSubprovider());

// filters
    engine.addProvider(new FilterSubprovider());

// pending nonce
    engine.addProvider(new NonceSubprovider());

// vm
    engine.addProvider(new VmSubprovider());

// id mgmt
    engine.addProvider(new HookedWalletSubprovider({
        getAccounts: function (cb) {
            console.log(cb)
        },
        approveTransaction: function (cb) {
            console.log(cb)
        },
        signTransaction: function (cb) {
            console.log(cb)
        },
    }));


// data source
    engine.addProvider(new RpcSubprovider({
        rpcUrl: `${config.rpcHost}`,
    }));

    engine.start();

    return web3

};

export const decisionMatrix = (matrix) => {
    const notApplicableQuestions = [6, 7, 8, 9];
    const notCritical = [3,9,10];

    let transparentWithIssues = [];
    let nonTransparent = [];
    Object.keys(matrix).map((key)=>{
        const item = matrix[key];

        const questionNumber = key.replace( /^\D+/g, '');

        const isCritical = notCritical.indexOf(questionNumber) === -1;
        const isNotApplicable = notApplicableQuestions.indexOf(questionNumber) === -1;

        if ( item.answer === true || item.answer === null && isNotApplicable){
        } else if(item.answer === false && !isCritical){ //Not Critical Question
            transparentWithIssues.push(questionNumber);

            //Critical Question
        } else if(item.answer === false){
            nonTransparent.push(questionNumber);

        }else{
            throw "Impossible";
        }
    });
    if (nonTransparent.length === 0 && transparentWithIssues.length === 0)
        return "Transparent";

    else if (nonTransparent.length !== 0)
        return ["Non Transparent", nonTransparent];

    else if (transparentWithIssues.length !== 0)
        return ["Transparent with issues", transparentWithIssues];
    else
        return [];
};

export const getEtherPerCurrency = (callback) => {
    jQuery.ajax({
        url: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
        success: function (result) {
            callback(result , null)
        },
        error: function (err, message) {
            console.log(`Coinbase error ${message}`);
            callback(null , err)
        }
    });
};

export const getICOLogs = async(icoName , callback) => {
    const ICO = config.ICOS[icoName];
    const customArgs = ICO.hasOwnProperty('customArgs') ? ICO.customArgs : {};
    const web3 = web3Connect();
    const address = ICO.address;
    const abi = ICO.abi;

    const smartContract = web3.eth.contract(abi).at(address);

    let event = smartContract[ICO.event](customArgs, {fromBlock: 0, toBlock: 3607800});
    jQuery.ajax({
        type: "POST",
        url: config.rpcHost,
        Accept: "application/json",
        contentType: "application/json",
        data: JSON.stringify({
            "id": 1496936096059709,
            "jsonrpc": "2.0",
            "params": [{
                "fromBlock": event.options.fromBlock, "toBlock": event.options.toBlock,
                "address": address,
                "topics": event.options.topics
            }]
            , "method": "eth_getLogsDetails"
        }),
        success: (e) => {
            let res = e.result;
            callback(null, res.map(function (log) {
                return event.formatter ? event.formatter(log) : log;
            }));
        },
        dataType: 'json'
    });
};

export const getStatistics = (selectedICO ,events, statisticsICO, currencyPerEther) => {
    const web3 = web3Connect();
    const factor = selectedICO.hasOwnProperty('decimal') ? 10 ** selectedICO['decimal'] : 10 ** config['defaultDecimal'];

    statisticsICO.general.transactionsCount = this.length;

    let chartAmountTemp = {};
    let chartTokenCountTemp = {};
    let chartInvetorsDistibution = {
        'l10k' : [0,0],
        'g10kl100k' : [0,0],
        'g100kl500k' : [0,0],
        'g500k' : [0,0],
    };
    events.map((item) => {

        const tokenValue = item.args[selectedICO.args.tokens].valueOf() / factor;
        let etherValue = web3.fromWei(item.value, "ether").valueOf();

        const investor = item.args[selectedICO.args.sender];

        const datetime = new Date(item.timestamp * 1000);
        let blockDate = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
        if (chartTokenCountTemp[blockDate] == undefined)
            chartTokenCountTemp[blockDate] = 0;

        chartTokenCountTemp[blockDate] += 1;

        if (chartAmountTemp[blockDate] == undefined)
            chartAmountTemp[blockDate] = 0;

        chartAmountTemp[blockDate] += tokenValue;

        if (parseFloat(etherValue) === 0 && tokenValue !== 0)
            etherValue = tokenValue / config['defaultEtherFactor'];


        let senders = statisticsICO.investors.senders;

        if (senders[investor] == undefined)
            senders[investor] = {tokens: 0, ETH: 0, money: 0, times: 0};

        senders[investor]['ETH'] += parseFloat(etherValue);
        senders[investor]['tokens'] += parseFloat(tokenValue);
        senders[investor]['times'] += 1;

        let investorKey = null;
        if (senders[investor]['ETH'] <  10000){
            investorKey = 'l10k';
        }else if (senders[investor]['ETH'] > 10000 && senders[investor]['ETH'] < 100000 ){
            investorKey = 'g10kl100k';
        }else if (senders[investor]['ETH'] > 100000 && senders[investor]['ETH'] < 500000 ){
            investorKey = 'g100kl500k';
        }else if (senders[investor]['ETH'] > 500000){
            investorKey = 'g500k';
        }
        if(investorKey){
            chartInvetorsDistibution[investorKey][0]+=senders[investor]['ETH']; //amount of ethers
            chartInvetorsDistibution[investorKey][1]+=1; // number of invetors
        }


        statisticsICO.money.totalETH += parseFloat(etherValue);
        statisticsICO.money.tokenIssued += parseFloat(tokenValue);
    });

    statisticsICO.charts.tokensAmount= [];
    statisticsICO.charts.tokensCount= [];

    Object.keys(chartAmountTemp).map((key)=>statisticsICO.charts.tokensAmount.push({name: key, 'Tokens/Time': chartAmountTemp[key], amt: chartAmountTemp[key]}));
    Object.keys(chartAmountTemp).map((key)=>statisticsICO.charts.tokensCount.push({name: key, 'Transactions/Time': chartTokenCountTemp[key], amt: chartTokenCountTemp[key]}));

    for (let [key, value] of Object.entries(statisticsICO.investors.senders)) {

        let currencyValue = value['ETH'] * parseFloat(currencyPerEther.value);
        if (currencyValue > 100000)
            statisticsICO.investors.numberInvestorsMoreThanOne100kEuro += 1;
        if (currencyValue > 5000 && currencyValue < 100000)
            statisticsICO.investors.numberInvestorsBetween5to100kEruo += 1;
        if (currencyValue < 5000)
            statisticsICO.investors.numberInvestorsLessThan500K += 1;
        if (value['times'] > 1)
            statisticsICO.investors.numberInvestorsWhoInvestedMoreThanOnce += 1;

        if (currencyValue > statisticsICO.investors.maxInvestmentsMoney) {
            statisticsICO.investors.maxInvestmentsMoney = currencyValue;
            statisticsICO.investors.maxInvestmentsTokens = value['tokens']
        }

        if (value['ETH'] < statisticsICO.investors.minInvestments)
            statisticsICO.investors.minInvestments = value['ETH'];
    }
    const starttime = new Date(events[0].timestamp*1000);
    statisticsICO.time.startDate = formateDate(starttime);

    const endtime = new Date(events[events.length-1].timestamp*1000);
    statisticsICO.time.endDate = formateDate(endtime)
    const duration = moment.duration(moment(endtime).diff(moment(starttime)));

    statisticsICO.time.duration= `Y: ${duration.get("years")}  -
              M: ${duration.get("months")}  -
              D: ${duration.get("days")}  - 
              H: ${duration.get("hours")}  -
              I: ${duration.get("minutes")}  -
              S: ${duration.get("seconds")}`;

    statisticsICO.charts.invetorsDistribution = chartInvetorsDistibution;
    return statisticsICO;
};