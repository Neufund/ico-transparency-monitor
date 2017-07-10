import {getWeb3, getSmartContract} from './utils/web3';
import jQuery from "jquery";
import {default as config} from './config.js';
import axios from 'axios';
const BigNumber = require('bignumber.js');


const moment = require('moment');

export const deepFreeze = (obj) => {
    if (obj !== null && typeof obj === 'object') {
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            deepFreeze(obj[prop]);
            });
        }
    return obj;
};

export const toPromise = func => (...args) =>
    new Promise((resolve, reject) =>
        func(...args, (error, result) => (error ? reject(new Error(error.message)) : resolve(result)))
    );

export const formateDate = (datetime, fullFormat = true) => {
    return fullFormat ? moment.utc(datetime).format("YYYY-MM-DD HH:mm:ss") : moment.utc(datetime).format("YYYY-MM-DD");

};

export const formatNumber = (number) => {
    if (isNaN(number) || number == undefined)
        return "Not Available";
    if (number === undefined || !number || typeof number !== "number")
        return number;
    return number.toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
};

export const decisionMatrix = (matrix) => {

    const questionMatrix = config.matrix;
    let nonTransparent = {};
    let transparentWithIssues = {};

    Object.keys(matrix).map((key, index)=>{
        const currentQuestion = matrix[key];
        const mappedQuestionMatrix = questionMatrix[key];

        if( mappedQuestionMatrix.critical && mappedQuestionMatrix.notApplicable === false && currentQuestion.answer === false )
            nonTransparent[key] = currentQuestion.comment;
        else if (mappedQuestionMatrix.critical === false && mappedQuestionMatrix.notApplicable === false && currentQuestion.answer === false) {
            transparentWithIssues[key]= currentQuestion.comment;
        }
    });

    if (Object.keys(nonTransparent).length === 0 && Object.keys(transparentWithIssues).length === 0)
        return ["Transparent", []];

    else if (Object.keys(nonTransparent).length !== 0)
        return ["Non Transparent", nonTransparent];

    else if (Object.keys(transparentWithIssues).length !== 0)
        return ["With issues", transparentWithIssues];
    else
        return [];
};

Date.prototype.yyyymmdd = function () {
    const mm = this.getMonth() + 1;
    const dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

export const getEtherPerCurrency = async (currency, date) => {
    return axios.get(`https://api.coinbase.com/v2/prices/${currency}/spot?date=${date}`);
};

export const getICOs = () => {
    let icos = [];
    const icosObject = config.ICOs;
    Object.keys(icosObject).map((icoKey) => {
            const ico = icosObject[icoKey];
            ico['address'] = icoKey;
            icos.push(ico);
        }
    );
    return icos;

};

const cache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getValueOrNotAvailable = (object, input) => {
    return object && object[input] ? object[input] : "Not Available";
};

/**
 * TODO: 1- Required Data must be validate.
 * TODO: 2- Change the ID in getLog
 */

export const getICOLogs = (address, callback) => {

    if (typeof localStorage != "undefined" && localStorage.getItem(address)) {
        console.log(`${address} cached already.`);
        return callback(null, JSON.parse(localStorage.getItem(address)));
    }

    const ICO = config.ICOs[address];

    const customArgs = ICO['event'].hasOwnProperty('customArgs') ? ICO['event'].customArgs : {};

    /**
     * Zero index for the smart contract, One index for the constants
     */
    let event = null;
    const smartContract = getSmartContract(address);


    const firstTxBlockNumber = typeof ICO['event']['firstTransationBlockNumber'] !== "undefined" ?ICO['event']['firstTransationBlockNumber']:0;
    const lastTxBlockNumber = typeof ICO['event']['lastTransationBlockNumber'] !== "undefined"?ICO['event']['lastTransationBlockNumber']:'latest';
    console.log(firstTxBlockNumber , lastTxBlockNumber);
    event = smartContract[ICO.event.name](customArgs, {fromBlock: firstTxBlockNumber, toBlock: lastTxBlockNumber});

    jQuery.ajax({
        type: "POST",
        url: config.rpcHost,
        Accept: "application/json",
        contentType: "application/json",
        //TODO: request data from cache
        // headers: {'X-Cache-Long': 'true'},
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
            if (res.length === 0) {
                callback('SHOW_MODAL_MESSAGE', res);
            } else {
                const logsFormated = res.map(function (log) {
                    return event.formatter ? event.formatter(log) : log;
                });
                // cache(address,logsFormated);
                callback(null, logsFormated);

            }
        },
        error: (status, error) => {
            callback('SHOW_MODAL_ERROR', `Error ${status}`)
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
            minInvestments: Number.MAX_SAFE_INTEGER,
            senders: {}
        },
        money: {
            tokenIssued: 0,
            totalETH: 0,
        },
        charts: {
            tokensCount: null,
            tokensAmount: null,
            invetorsDistribution: null,
            investmentDistribution: null,
        }
    };
};

export const prepareStatsInvestment = (senders, currencyPerEther) => {

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

const calculateTicks = (max) => {
    let tick = 0.1;
    let ticks = [];
    ticks.push(tick);
    while (tick < max) {
        tick *= 10;
        ticks.push(tick);
    }

    return ticks;
};

export const kFormatter = (num) => {
    const ranges = [
        {divider: 1e18, suffix: 'P'},
        {divider: 1e15, suffix: 'E'},
        {divider: 1e12, suffix: 'T'},
        {divider: 1e9, suffix: 'G'},
        {divider: 1e6, suffix: 'M'},
        {divider: 1e3, suffix: 'k'}
    ];

    for (let i = 0; i < ranges.length; i++) {
        if (num >= ranges[i].divider) {
            return (num / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return num.toString();

};

export const getDistributedDataFromDataset = (ethersDataset = [], currencyPerEther = 1) => {
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;

    //investors
    let chartInvetorsDistibution = [];

    //investment
    let chartInvestmentDistibution = [];

    ethersDataset.map((item, index) => {
        item = item * currencyPerEther;
        if (item > max) max = item;
    });
    const ticks = calculateTicks(max);

    let previousTick = 0;
    ticks.map((tick) => {
        const name = `${kFormatter(previousTick)} - ${kFormatter(tick)}`
        if (tick !== 0) chartInvetorsDistibution.push({name: `${name}`, Investors: 0, key: tick})
        if (tick !== 0) chartInvestmentDistibution.push({name: `${name}`, Investments: 0, key: tick})
        previousTick = tick;
    });

    for (let i = 0; i < ethersDataset.length; i++) {
        const money = ethersDataset[i] * currencyPerEther;
        for (let j = 0; j < chartInvetorsDistibution.length; j++) {
            if (money < chartInvetorsDistibution[j].key) {
                chartInvetorsDistibution[j].Investors += 1;
                break;
            }
        }
    }
    for (let i = 0; i < ethersDataset.length; i++) {
        const money = ethersDataset[i] * currencyPerEther;
        for (let j = 0; j < chartInvestmentDistibution.length; j++) {
            if ((ethersDataset[i] * currencyPerEther) < chartInvestmentDistibution[j].key) {
                chartInvestmentDistibution[j].Investments += parseFloat(money.toFixed(2));
                break;
            }
        }
    }

    return [chartInvetorsDistibution, chartInvestmentDistibution];
};

// const getChartFormat = (durationDays)=>{
//     if (durationDays === 0)
//         return 'Block Numbers';
//     else if (durationDays === 1)
//         return 'Hours';
//     else if (durationDays > 1)
//         return 'Days';
// };
//

const getChartTimescale= (startTimestamp, endTimestamp) => (event) => {
    const duration = moment.duration(moment(new Date(endTimestamp * 1000)).diff(moment(new Date(startTimestamp * 1000))));
    const daysNumber = duration._data.days;

    if (daysNumber === 0)
        return event.blockNumber;
    else if (daysNumber === 1 ) {
        const datetime = new Date(event.timestamp * 1000);
        return moment.utc(datetime).format("YYYY-MM-DD HH");

    } else if (daysNumber > 1) {
        const datetime = new Date(event.timestamp * 1000);
        return formateDate(datetime, false)
    }

};

export const analyizeIssedTokens = (tokenSupply, issuedToken) => {
    const tokens = new BigNumber(tokenSupply.toFixed(2)).minus(issuedToken.toFixed(2));
    return tokens.valueOf()
};

//TODO: Dispatch error message if any error raised by getWeb3 function
export const getStatistics = async (selectedICO, events, statisticsICO, currencyPerEther) => {
    let web3;
    try {
        web3 = getWeb3();
    } catch (err) {
        console.log(err);
        return;
    }
    const smartContract = getSmartContract(selectedICO.address);

    const decimals = typeof smartContract.decimals !== "undefined" ?await toPromise(smartContract.decimals)(): config['defaultDecimal'];

    const factor = 10 ** decimals;

    statisticsICO.general.transactionsCount = events.length;

    let chartAmountTemp = {};
    let chartTokenCountTemp = {};

    let ethersDataset = [];

    const format = getChartTimescale(events[0].timestamp, events[events.length - 1].timestamp);
    console.log(events[0].blockNumber, events[events.length - 1].blockNumber);
    events.map((item) => {

        const tokenValue = item.args[selectedICO.event.args.tokens].valueOf() / factor;
        let etherValue = web3.fromWei(item.value, "ether").valueOf();

        const investor = item.args[selectedICO.event.args.sender];

        let blockDate = format(item);

        if (chartTokenCountTemp[blockDate] == undefined)
            chartTokenCountTemp[blockDate] = 0;

        chartTokenCountTemp[blockDate] += 1;

        if (chartAmountTemp[blockDate] == undefined)
            chartAmountTemp[blockDate] = 0;


        chartAmountTemp[blockDate] += tokenValue;

        let senders = statisticsICO.investors.senders;

        if (senders[investor] == undefined)
            senders[investor] = {tokens: 0, ETH: 0, times: 0};

        senders[investor]['ETH'] += parseFloat(etherValue);
        senders[investor]['tokens'] += parseFloat(tokenValue);
        senders[investor]['times'] += parseFloat(etherValue) > 1 ? +1 : +0;
        ethersDataset.push(parseFloat(etherValue));

        statisticsICO.money.totalETH += parseFloat(etherValue);
        statisticsICO.money.tokenIssued += parseFloat(tokenValue);
    });

    statisticsICO.charts.tokensAmount = [];
    statisticsICO.charts.tokensCount = [];

    Object.keys(chartAmountTemp).map((key) => {
        statisticsICO.charts.tokensAmount.push({
            name: key,
            'Tokens/Time': parseFloat(chartAmountTemp[key].toFixed(2)),
            amt: chartAmountTemp[key]
        })
    });

    Object.keys(chartAmountTemp).map((key) => statisticsICO.charts.tokensCount.push({
        name: key,
        'Transactions/Time': parseFloat(chartTokenCountTemp[key].toFixed(2)),
        amt: chartTokenCountTemp[key]
    }));

    statisticsICO.investors = prepareStatsInvestment(statisticsICO.investors.senders, currencyPerEther);


    const startTime = new Date(events[0].timestamp * 1000);
    statisticsICO.time.startDate = formateDate(startTime);

    const endTime = new Date(events[events.length - 1].timestamp * 1000);
    statisticsICO.time.endDate = formateDate(endTime);
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));

    statisticsICO.time.durationDays = duration.get("days");
    statisticsICO.time.duration =
        `
            ${duration.get("years") > 0 ? duration.get("years") + " Years" : ""}
            ${duration.get("months") > 0 ? duration.get("months") + " Months" : ""}
            ${duration.get("days") > 0 ? duration.get("days") + " Days" : ""}

            ${duration.get("hours") > 0 ? duration.get("hours") + " Hours" : ""}
            ${duration.get("minutes") > 0 ? duration.get("minutes") + " Minutes" : ""}
            ${duration.get("seconds") > 0 ? duration.get("seconds") + " Seconds" : ""}`;

    //Initialize the chart of investors by ether value
    statisticsICO.etherDataset = ethersDataset;
    const distribution = getDistributedDataFromDataset(ethersDataset, currencyPerEther);
    statisticsICO.charts.invetorsDistribution = distribution[0];
    statisticsICO.charts.investmentDistribution = distribution[1];
    return statisticsICO;
};
