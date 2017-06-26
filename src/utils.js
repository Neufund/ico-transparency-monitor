import React from 'react';
import {web3Connect, getSmartContract} from './utils/web3';
import jQuery from "jquery";
import {default as config} from './config.js';
import {store} from "./index";

const moment = require('moment');


export const toPromise = func => (...args) =>
    new Promise((resolve, reject) =>
        func(...args, (error, result) => (error ? reject(new Error(error.message)) : resolve(result)))
    );

export const formateDate = (datetime) => {
    return `${datetime.getFullYear()}-${("0" + (datetime.getMonth() + 1)).slice(-2)}-${datetime.getDate()}`;
};

export const formatNumber = (number) => {
    if (number === undefined || !number || typeof number !== "number")
        return number;
    return number.toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
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
            //TODO
        } else if(item.answer === false && !isCritical){ //Not Critical Question
            transparentWithIssues.push(questionNumber);

            //Critical Question
        } else if(item.answer === false){
            nonTransparent.push(questionNumber);

        }else{
            //todo
        }
    });
    if (nonTransparent.length === 0 && transparentWithIssues.length === 0)
        return ["Transparent"];

    else if (nonTransparent.length !== 0)
        return ["Non Transparent", nonTransparent];

    else if (transparentWithIssues.length !== 0)
        return ["Transparent with issues", transparentWithIssues];
    else
        return [];
};

Date.prototype.yyyymmdd = function() {
    const mm = this.getMonth() +1;
    const dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

export const getEtherPerCurrency = (callback ,currency = "ETH-EUR", date=new Date().yyyymmdd()) => {
    jQuery.ajax({
        // url: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
        url : `https://api.coinbase.com/v2/prices/${currency}/spot?date=${date}`,
        success: function (result) {
            console.log(result);
            callback(result.data.amount , null)
        },
        error: function (err, message) {
            callback(null , err)
        }
    });
};

export const getICOs = ()=>{
    let icos = [];
    const icosObject = config['ICOS'];
    Object.keys(icosObject).map((icoKey) => {
            const ico = icosObject[icoKey]['summary'];
            ico['name'] = icoKey;
            ico['matrix'] = icosObject[icoKey]['matrix'];
            icos.push(ico);
        }
    );
    return icos;

};


//TODO: Required Data must be validate.
export const getICOLogs = async(icoName , callback) => {
    const ICO = config.ICOS[icoName];

    const customArgs = ICO['event'].hasOwnProperty('customArgs') ? ICO['event'].customArgs : {};

    const address = ICO.address;

    /**
     * Zero index for the smart contract, One index for the constants
     */
    let smartContract = null;
    let event = null;
    try{
        smartContract = getSmartContract(icoName)[0];
        event = smartContract[ICO.event.name](customArgs, {fromBlock: 0, toBlock: 'latest'});

    }catch(error){
        store.dispatch({ type: 'SHOW_MODAL_ERROR',message :`Cant read smart Contract for ${icoName} from RPC Host url ${config.rpcHost}.` })
        return;
    }

    jQuery.ajax({
        type: "POST",
        url: config.rpcHost,
        Accept: "application/json",
        contentType: "application/json",
        data: JSON.stringify({
            "id": 1497353430507566,
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
            if(res.length == 0) {
                store.dispatch({type: 'SHOW_MODAL_MESSAGE', message: `Empty result`})
                callback('Empty result', res);
            }else
                callback(null, res.map(function (log) {
                    return event.formatter ? event.formatter(log) : log;
                }));
        },
        error:(status, error)=>{
            store.dispatch({ type: 'SHOW_MODAL_ERROR',message :`Error ${status}` })
        },
        dataType: 'json'
    });
};

export const initStatistics = () => {
    return {
        general: {
            transactionsCount: 0
        },
        time: {
            startDate: null,
            endDate: null
        },
        investors: {
            numberInvestorsMoreThanOne100kEuro: 0,
            numberInvestorsBetween5to100kEruo: 0,
            numberInvestorsLessThan500K: 0,
            numberInvestorsWhoInvestedMoreThanOnce: 0,
            maxInvestmentsMoney: 0,
            maxInvestmentsTokens: 0,
            minInvestments: 999999999999,
            senders: {}
        },
        money: {
            tokenIssued: 0,
            totalETH: 0,
        },
        charts: {
            tokensCount: null,
            tokensAmount: null,
            invetorsDistribution: null
        }
    };
};

export const prepareStatsInvestment = (senders , currencyPerEther) => {

    let investors = initStatistics().investors;
    investors.senders = senders;

    for (let [key, value] of Object.entries(senders)) {

        let currencyValue = value['ETH'] * parseFloat(currencyPerEther);
        if (currencyValue > 100000)
            investors.numberInvestorsMoreThanOne100kEuro += 1;
        if (currencyValue > 5000 && currencyValue < 100000)
            investors.numberInvestorsBetween5to100kEruo += 1;
        if (currencyValue < 5000)
            investors.numberInvestorsLessThan500K += 1;
        if (value['times'] > 1)
            investors.numberInvestorsWhoInvestedMoreThanOnce += 1;

        if (currencyValue > investors.maxInvestmentsMoney) {
            investors.maxInvestmentsMoney = currencyValue;
            investors.maxInvestmentsTokens = value['tokens']
        }

        if (value['ETH'] < investors.minInvestments)
            investors.minInvestments = value['ETH'];
    }
    return investors;
};

export const getStatistics = (selectedICO ,events, statisticsICO, currencyPerEther) => {
    const web3 = web3Connect(config.rpcUrl);
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

        const tokenValue = item.args[selectedICO.event.args.tokens].valueOf() / factor;
        let etherValue = web3.fromWei(item.value, "ether").valueOf();

        const investor = item.args[selectedICO.event.args.sender];

        const datetime = new Date(item.timestamp * 1000);
        let blockDate = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
        if (chartTokenCountTemp[blockDate] == undefined)
            chartTokenCountTemp[blockDate] = 0;

        chartTokenCountTemp[blockDate] += 1;

        if (chartAmountTemp[blockDate] == undefined)
            chartAmountTemp[blockDate] = 0;

        chartAmountTemp[blockDate] += tokenValue;

        // if (parseFloat(etherValue) === 0 && tokenValue !== 0)
        //     etherValue = tokenValue / config['defaultEtherFactor'];


        let senders = statisticsICO.investors.senders;

        if (senders[investor] == undefined)
            senders[investor] = {tokens: 0, ETH: 0, money: 0, times: 0};

        senders[investor]['ETH'] += parseFloat(etherValue);
        senders[investor]['tokens'] += parseFloat(tokenValue);
        senders[investor]['times'] += parseFloat(etherValue) >1?+1:+0;

        let investorKey = null;

        if (senders[investor]['ETH'] <  10000)
            investorKey = 'l10k';
        else if (senders[investor]['ETH'] > 10000 && senders[investor]['ETH'] < 100000 )
            investorKey = 'g10kl100k';
        else if (senders[investor]['ETH'] > 100000 && senders[investor]['ETH'] < 500000 )
            investorKey = 'g100kl500k';
        else if (senders[investor]['ETH'] > 500000)
            investorKey = 'g500k';

        if(investorKey){
            chartInvetorsDistibution[investorKey][0]+=senders[investor]['ETH']; //amount of ethers
            chartInvetorsDistibution[investorKey][1]+=1; // number of investors
        }


        statisticsICO.money.totalETH += parseFloat(etherValue);
        statisticsICO.money.tokenIssued += parseFloat(tokenValue);
    });

    statisticsICO.charts.tokensAmount= [];
    statisticsICO.charts.tokensCount= [];

    Object.keys(chartAmountTemp).map((key)=>statisticsICO.charts.tokensAmount.push({name: key, 'Tokens/Time': chartAmountTemp[key], amt: chartAmountTemp[key]}));
    Object.keys(chartAmountTemp).map((key)=>statisticsICO.charts.tokensCount.push({name: key, 'Transactions/Time': chartTokenCountTemp[key], amt: chartTokenCountTemp[key]}));

    statisticsICO.investors = prepareStatsInvestment(statisticsICO.investors.senders , currencyPerEther);


    const startTime = new Date(events[0].timestamp*1000);
    statisticsICO.time.startDate = formateDate(startTime);

    const endTime = new Date(events[events.length-1].timestamp*1000);
    statisticsICO.time.endDate = formateDate(endTime)
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));

    statisticsICO.time.duration= `Y: ${duration.get("years")}  -
              M: ${duration.get("months")}  -
              D: ${duration.get("days")}  - 
              H: ${duration.get("hours")}  -
              I: ${duration.get("minutes")}  -
              S: ${duration.get("seconds")}`;

    statisticsICO.charts.invetorsDistribution = chartInvetorsDistibution;
    return statisticsICO;
};