import { getWeb3, getSmartContract } from './utils/web3';
import jQuery from 'jquery';
import { default as config } from './config.js';
import axios from 'axios';

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


export const formatDate = (datetime, fullFormat = true) => fullFormat ? moment.utc(datetime).format('YYYY-MM-DD HH:mm:ss') : moment.utc(datetime).format('YYYY-MM-DD');

export const formatNumber = (number) => {
  if (isNaN(number) || typeof number === 'undefined') { return 'Not Available'; }
  if (number === undefined || !number || typeof number !== 'number') { return number; }
  return number.toFixed(2).replace(/./g, (c, i, a) => i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}` : c);
};

export const decisionMatrix = (matrix) => {
  const questionMatrix = config.matrix;
  const nonTransparent = {};
  const transparentWithIssues = {};

  Object.keys(matrix).forEach((key) => {
    const currentQuestion = matrix[key];
    const mappedQuestionMatrix = questionMatrix[key];

    if (mappedQuestionMatrix.critical && mappedQuestionMatrix.notApplicable === false && currentQuestion.answer === false) { nonTransparent[key] = currentQuestion.comment; } else if (mappedQuestionMatrix.critical === false && mappedQuestionMatrix.notApplicable === false && currentQuestion.answer === false) {
      transparentWithIssues[key] = currentQuestion.comment;
    }
  });

  if (Object.keys(nonTransparent).length === 0 && Object.keys(transparentWithIssues).length === 0) { return ['Transparent', []]; } else if (Object.keys(nonTransparent).length !== 0) { return ['Non Transparent', nonTransparent]; } else if (Object.keys(transparentWithIssues).length !== 0) { return ['With issues', transparentWithIssues]; }
  return [];
};

Date.prototype.yyyymmdd = function () {
  const mm = this.getMonth() + 1;
  const dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
};

String.prototype.capitalizeTxt = String.prototype.capitalizeTxt || function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export const getEtherPerCurrency = async (currency, date) => axios.get(`https://api.coinbase.com/v2/prices/${currency}/spot?date=${date}`);

export const getICOs = () => Object.keys(config.ICOs).map((icoKey) => {
  const ico = config.ICOs[icoKey];
  ico.address = icoKey;
  return ico;
}
    );

export const getValueOrNotAvailable = (props, input) => props && props[input] ? props[input] : 'Not Available';

/**
 * TODO: 1- Required Data must be validate.
 * TODO: 2- Change the ID in getLog
 */

export const getICOLogs = (web3, address, callback) => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem(address)) {
    console.log(`${address} cached already.`);
    return callback(null, JSON.parse(localStorage.getItem(address)));
  }

  const ICO = config.ICOs[address];
  console.log(web3, address);
  const customArgs = ICO.event.hasOwnProperty('customArgs') ? ICO.event.customArgs : {};

  const smartContract = getSmartContract(web3, address);

  const firstTxBlockNumber = typeof ICO.event.firstTransactionBlockNumber !== 'undefined' ? ICO.event.firstTransactionBlockNumber : 0;
  const lastTxBlockNumber = typeof ICO.event.lastTransactionBlockNumber !== 'undefined' ? ICO.event.lastTransactionBlockNumber : 'latest';
  console.log(firstTxBlockNumber, lastTxBlockNumber);
  const event = smartContract[ICO.event.name](customArgs, {
    fromBlock: firstTxBlockNumber,
    toBlock: lastTxBlockNumber,
  });

  jQuery.ajax({
    type: 'POST',
    url: config.rpcHost,
    Accept: 'application/json',
    contentType: 'application/json',
        // TODO: request data from cache
        // headers: {'X-Cache-Long': 'true'},
    data: JSON.stringify({
      id: 1497353430507566,
      jsonrpc: '2.0',
      params: [{
        fromBlock: event.options.fromBlock,
        toBlock: event.options.toBlock,
        address,
        topics: event.options.topics,
      }],
      method: 'eth_getLogsDetails',
    }),
    success: (e) => {
      const res = e.result;
      if (res.length === 0) {
        callback('SHOW_MODAL_MESSAGE', res);
      } else {
        const logsFormat = res.map(log => event.formatter ? event.formatter(log) : log);
        callback(null, logsFormat);
      }
    },
    error: (status) => {
      callback('SHOW_MODAL_ERROR', `Error ${status}`);
    },
    dataType: 'json',
  });
};

export const initStatistics = () => ({
  general: {
    transactionsCount: 0,
  },
  time: {
    startDate: null,
    endDate: null,
    scale: 'blocks',
  },
  investors: {
    numberInvestorsWhoInvestedMoreThanOnce: 0,
    sendersSortedArray: [],
    senders: {},
  },
  money: {
    tokenIssued: 0,
    totalETH: 0,
  },
  charts: {
    transactionsCount: [],
    tokensCount: [],
    investorsDistribution: [],
    investmentDistribution: [],
    tokenHolders: [],
  },
});

const calculateTicks = (max) => {
  let tick = 0.1;
  const ticks = [];
  ticks.push(tick);
  while (tick < max) {
    tick *= 10;
    ticks.push(tick);
  }

  return ticks;
};

export const kFormatter = (num) => {
  const ranges = [
        { divider: 1e18, suffix: 'P' },
        { divider: 1e15, suffix: 'E' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'G' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'k' },
  ];

  for (let i = 0; i < ranges.length; i++) {
    if (num >= ranges[i].divider) {
      return (num / ranges[i].divider).toString() + ranges[i].suffix;
    }
  }
  return num.toString();
};

export const getDistributedDataFromDataset = (ethersDataset = [], currencyPerEther = 1) => {
  let max = 0;

    // investors
  const investorsChartXAxis = [];

    // investment
  const investmentChartXAxis = [];

  for (let i = 0; i < ethersDataset.length; i++) {
    let item = ethersDataset[i];
    item *= currencyPerEther;
    if (item > max) max = item;
  }

  const ticks = calculateTicks(max);

  let previousTick = 0;

  let xAxisLength = 0;
  for (let i = 0; i < ticks.length; i++) {
    const tick = ticks[i];
    const name = `${kFormatter(previousTick)} - ${kFormatter(tick)}`;
    investorsChartXAxis.push({ name: `${name}`, amount: 0 });
    investmentChartXAxis.push({ name: `${name}`, amount: 0 });
    previousTick = tick;
    xAxisLength = i;
  }

  ethersDataset.forEach((item) => {
    const money = item * currencyPerEther;
    for (let i = 0; i < xAxisLength; i++) {
      if (money < ticks[i]) {
        investorsChartXAxis[i].amount += 1;
        investmentChartXAxis[i].amount += parseFloat(money.toFixed(2));
        break;
      }
    }
  });

  return [investorsChartXAxis, investmentChartXAxis];
};

const getChartTimescale = (durationDays) => {
  if (durationDays === 0) { return 'blocks'; } else if (durationDays === 1) { return 'hours'; } else if (durationDays > 1) { return 'days'; }
};

const mapEventIntoTimeScale = (event, timeScale) => {
    // todo: instead return a function that just is processing event, without ifs
  const datetime = new Date(event.timestamp * 1000);
  const data = {
    hours: moment.utc(datetime).format('YYYY-MM-DD HH'),
    blocks: event.blockNumber,
    days: formatDate(datetime, false),
  };
  return data[timeScale];
};

export const analyzeIssuedTokens = (tokenSupply, issuedToken) => {
  const tokens = (tokenSupply - issuedToken).toFixed(2);
  return tokens.valueOf();
};

const getDurationFormat = duration => `${duration.get('years') > 0 ? `${duration.get('years')} Years` : ''}
            ${duration.get('months') > 0 ? `${duration.get('months')} Months` : ''}
            ${duration.get('days') > 0 ? `${duration.get('days')} Days` : ''}

            ${duration.get('hours') > 0 ? `${duration.get('hours')} Hours` : ''}
            ${duration.get('minutes') > 0 ? `${duration.get('minutes')} Minutes` : ''}
            ${duration.get('seconds') > 0 ? `${duration.get('seconds')} Seconds` : ''}`;

const convertInvestorsToSortedArray = (investorsObject) => {
  const investorsArray = [];
  Object.keys(investorsObject).forEach((key) => {
    investorsArray.push({
      investor: key,
      tokens: investorsObject[key].tokens,
    });
  });
  investorsArray.sort((first, last) => last.tokens - first.tokens);

  return investorsArray;
};

export const getPercentagesDataSet = (limit = 100) => {
  const percentages = [];
  let i = 1;
  while (i < limit) {
    percentages.push(i * 0.01);
    i += i < 5 ? 4 : (i < 9 ? 5 : 10);
  }
  return percentages;
};

export const tokenHoldersPercentage = (total, investorsArray) => {
  const percentages = getPercentagesDataSet(100);
  let totalTokens = 0;
  let arrayIndex = 0;
  return percentages.map((singlePercent) => {
    const iterationNumbers = parseInt(investorsArray.length * singlePercent);

    while (arrayIndex < iterationNumbers) {
      totalTokens += investorsArray[arrayIndex].tokens;
      arrayIndex++;
    }
    return {
      name: `${singlePercent * 100}%`,
      amount: parseFloat(((totalTokens * 100) / total).toFixed(2)),
    };
  });
};

// TODO: Dispatch error message if any error raised by getWeb3 function
export const getStatistics = (selectedICO, events, statisticsICO, currencyPerEther) => {
  let web3;
  try {
    web3 = getWeb3();
  } catch (err) {
    console.log(err);
    return;
  }

  const startTime = new Date(events[0].timestamp * 1000);
  statisticsICO.time.startDate = formatDate(startTime);

  const endTime = new Date(events[events.length - 1].timestamp * 1000);
  statisticsICO.time.endDate = formatDate(endTime);
  const icoDuration = moment.duration(moment(endTime).diff(moment(startTime)));

  statisticsICO.time.durationDays = icoDuration.get('days');
  statisticsICO.time.duration = getDurationFormat(icoDuration);

  const factor = 10 ** selectedICO.decimals;

  statisticsICO.general.transactionsCount = events.length;

  const chartAmountTemp = {};
  const chartTokenCountTemp = {};

  const ethersDataset = [];

    // todo: how are you going to know what timescale is used by getChartTimescale to set up axis display on chart properly?

  const startTimestamp = events[0].timestamp;
  const endTimestamp = events[events.length - 1].timestamp;

  const duration = moment.duration(moment(new Date(endTimestamp * 1000)).diff(moment(new Date(startTimestamp * 1000))));
  const daysNumber = duration._data.days;

  const format = getChartTimescale(daysNumber);

  console.log(events[0].blockNumber, events[events.length - 1].blockNumber);
  for (let i = 0; i < events.length; i++) {
    const item = events[i];
    const tokenValue = item.args[selectedICO.event.args.tokens].valueOf() / factor;
    const etherValue = web3.fromWei(item.value, 'ether').valueOf();

    const investor = item.args[selectedICO.event.args.sender];

    const blockDate = mapEventIntoTimeScale(item, format);

    if (chartTokenCountTemp[blockDate] == undefined) { chartTokenCountTemp[blockDate] = 0; }

    chartTokenCountTemp[blockDate] += 1;

    if (chartAmountTemp[blockDate] == undefined) { chartAmountTemp[blockDate] = 0; }


    chartAmountTemp[blockDate] += tokenValue;

    const senders = statisticsICO.investors.senders;

    if (senders[investor] == undefined) { senders[investor] = { tokens: 0, ETH: 0, times: 0 }; }

    senders[investor].ETH += parseFloat(etherValue);
    senders[investor].tokens += parseFloat(tokenValue);
    senders[investor].times += parseFloat(etherValue) > 1 ? +1 : +0;
    ethersDataset.push(parseFloat(etherValue));

    statisticsICO.money.totalETH += parseFloat(etherValue);
    statisticsICO.money.tokenIssued += parseFloat(tokenValue);
  }

  statisticsICO.charts.transactionsCount = [];
  statisticsICO.charts.tokensCount = [];

  Object.keys(chartAmountTemp).forEach((key) => {
    statisticsICO.charts.transactionsCount.push({
      name: parseFloat(key),
      amount: parseFloat(chartAmountTemp[key].toFixed(2)),
    });
  });

  Object.keys(chartAmountTemp).forEach(key => statisticsICO.charts.tokensCount.push({
    name: key,
    amount: parseFloat(chartTokenCountTemp[key].toFixed(2)),
  }));

  statisticsICO.investors.sendersSortedArray = convertInvestorsToSortedArray(statisticsICO.investors.senders);
    // Initialize the chart of investors by ether value
  statisticsICO.etherDataset = ethersDataset;
  const distribution = getDistributedDataFromDataset(ethersDataset, currencyPerEther);
  statisticsICO.charts.investorsDistribution = distribution[0];
  statisticsICO.charts.investmentDistribution = distribution[1];

  statisticsICO.charts.tokenHolders = tokenHoldersPercentage(
        statisticsICO.money.tokenIssued,
        statisticsICO.investors.sendersSortedArray
    );
  return statisticsICO;
};
