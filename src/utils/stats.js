import moment from 'moment';
import gini from 'gini';
import config from '../config';

export const initStatistics = () => ({
  general: {
    transactionsCount: 0,
    giniIndex: null,
  },
  time: {
    startDate: null,
    endDate: null,
    scale: 'blocks',
  },
  investors: {
    sortedByTicket: [],
    sortedByETH: [],
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

export const formatDuration = duration =>
  `${duration.get('years') > 0 ? `${duration.get('years')} Years` : ''}
  ${duration.get('months') > 0 ? `${duration.get('months')} Months` : ''}
  ${duration.get('days') > 0 ? `${duration.get('days')} Days` : ''}

  ${duration.get('hours') > 0 ? `${duration.get('hours')} Hours` : ''}
  ${duration.get('minutes') > 0 ? `${duration.get('minutes')} Minutes` : ''}
  ${duration.get('seconds') > 0 ? `${duration.get('seconds')} Seconds` : ''}`;



  const getChartTimescale = (durationHours, startTimestamp) => {
  if (durationHours < 12) {
    return ['blocks', event => event.blockNumber];
  } else if (durationHours > 12 && durationHours < 96) {
    // difference in full hours
    return ['hours', event => 1 + ((event.timestamp - startTimestamp) / 3600) >> 0];
  }
  // difference in full days
  return ['days', event => 1 + ((event.timestamp - startTimestamp) / 86400) >> 0];
};

const getPercentagesDataSet = (limit = 100) => {
  const percentages = [];
  let i = 1;
  while (i < limit) {
    percentages.push(i * 0.01);
    // i += i < 5 ? 4 : (i < 9 ? 5 : 10);
    if (i < 5) { i += 4; } else if (i < 9) { i += 5; } else { i += 10; }
  }
  return percentages;
};

const tokenHoldersPercentage = (total, sortedInvestors) => {
  const percentages = getPercentagesDataSet(100);
  let totalTokens = 0;
  let arrayIndex = 0;
  return percentages.map((singlePercent) => {
    const noInvestorsInRange = parseInt(sortedInvestors.length * singlePercent, 10);

    while (arrayIndex < noInvestorsInRange) {
      totalTokens += sortedInvestors[arrayIndex].value;
      arrayIndex += 1;
    }
    return {
      name: `${singlePercent * 100}%`,
      amount: parseFloat(((totalTokens * 100) / total).toFixed(2)),
    };
  }).filter(range => range.amount > 0);
};

const sortInvestorsByTicket = (investors) => {
  const sortedByTokens = [];
  const sortedByETH = [];
  Object.keys(investors).forEach((key) => {
    const s = investors[key];
    sortedByTokens.push({
      investor: key,
      value: s.tokens,
    });
    sortedByETH.push({
      investor: key,
      value: s.ETH,
    });
  });
  sortedByTokens.sort((first, last) => last.value - first.value);
  sortedByETH.sort((first, last) => last.value - first.value);

  return [sortedByTokens, sortedByETH];
};

const getMoneyFromEvents = (icoConfig, allLogs, investors, toTimeBucket) => {
  let totalETH = 0;
  let totalCurrencyBase = 0;
  let tokenIssued = 0;
  const senders = investors;
  let tranCount = 0;
  const csvContentArray = [];
  const chartTokensCountTemp = {};
  const chartTransactionsCountTemp = {};

  const precision = 10 ** (parseFloat(icoConfig.decimals) || config.defaultDecimal);

  Object.keys(allLogs).forEach((eventName) => {
    const eventArgs = icoConfig.events[eventName].args;
    const countTransactions = icoConfig.events[eventName].countTransactions;
    const events = allLogs[eventName];
    let prevTxHash = null;

    for (let i = 0; i < events.length; i += 1) {
      const item = events[i];
      // allow for ICOs that do not generate tokens: like district0x
      const tokenValue = eventArgs.tokens ?
        parseFloat(item.args[eventArgs.tokens].valueOf()) / precision : 0;

      // removed operations on bigint which may decrease precision!
      // const etherValue = parseFloat(
      //   eventArgs.ether ? (typeof eventArgs.ether === 'function' ?
      //     eventArgs.ether(tokenValue * precision) : item.args[eventArgs.ether].valueOf())
      //     : parseInt(item.value, 16)
      // ) / (10 ** 18);
      let etherValue = null;
      if (eventArgs.ether) {
        if (typeof eventArgs.ether === 'function') {
          etherValue = eventArgs.ether(tokenValue * precision);
        } else {
          etherValue = item.args[eventArgs.ether].valueOf();
        }
      } else {
        etherValue = parseInt(item.value, 16);
      }
      etherValue = parseFloat(etherValue) / (10 ** 18);

      const investor = item.args[eventArgs.sender];
      csvContentArray.push([investor, tokenValue, etherValue,
        item.timestamp, item.blockNumber]); // (new Date(item.timestamp * 1000)).formatDate(true)

      // only if event is transaction event
      const timeBucket = toTimeBucket(item);

      if (countTransactions) {
        if (item.transactionHash !== prevTxHash) {
          if (timeBucket in chartTransactionsCountTemp) {
            chartTransactionsCountTemp[timeBucket] += 1;
          } else {
            chartTransactionsCountTemp[timeBucket] = 1;
          }
          prevTxHash = item.transactionHash;
          tranCount += 1;
        }
      }
      // skip empty transactions
      if (tokenValue) {
        if (timeBucket in chartTokensCountTemp) {
          chartTokensCountTemp[timeBucket] += tokenValue;
        } else {
          chartTokensCountTemp[timeBucket] = tokenValue;
        }
      }

      if (tokenValue > 0 || etherValue > 0) {
        if (investor in senders) {
          const sender = senders[investor];
          sender.ETH += etherValue;
          sender.tokens += tokenValue;
        } else {
          senders[investor] = { tokens: tokenValue, ETH: etherValue };
        }
        totalCurrencyBase += etherValue;
        totalETH += etherValue;
        tokenIssued += tokenValue;
      }
    }
  });

  return {
    totalETH,
    tokenIssued,
    totalCurrencyBase,
    senders,
    tranCount,
    csvContentArray,
    chartTokensCountTemp,
    chartTransactionsCountTemp,
  };
};

export const getDatesDuration = (endTime, startTime) =>
  moment.duration(moment(endTime).diff(moment(startTime)));

const getTimeFromLogs = (transactionLogs) => {
  const startTimestamp = transactionLogs[0].timestamp;
  const endTimestamp = transactionLogs[transactionLogs.length - 1].timestamp;

  const startDate = new Date(startTimestamp * 1000);
  const endDate = new Date(endTimestamp * 1000);

  const icoDuration = getDatesDuration(endDate, startDate);

  const duration = formatDuration(icoDuration);
  const durationDays = icoDuration.get('days');

  const timeScale = getChartTimescale(icoDuration.asHours(), startTimestamp);
  const toTimeBucket = timeScale[1];
  return {
    startDate,
    endDate,
    duration,
    durationDays,
    scale: timeScale[0],
    toTimeBucket,
  };
};

const getChartData = (timeScale, chartData) => {
  // when building charts fill empty days and hours with 0
  const keys = Object.keys(chartData);
  const timeIterator = timeScale !== 'blocks' ?
    Array.from(new Array(Math.max.apply(null, keys)), (x, i) => i + 1) :
    keys;

  return timeIterator.map(key => ({
    name: key,
    amount: key in chartData ? chartData[key] : 0,
  }));
};

/* allLogs contains dictionary {event_name: logs_array} 
where each logs_array is sorted by timestamp (by ETH node) */
export const getStatistics = (icoConfig, allLogs) => {
  const statsResult = initStatistics();
  /* get event that defines investor transaction and extract
  timestamps that will scale the time charts */
  const transactionLogs = allLogs[Object.keys(allLogs).filter(name =>
    icoConfig.events[name].countTransactions)[0]];
  if (!transactionLogs) {
    throw new Error("You need to mark at least one event with 'countTransactions'");
  }

  const investors = statsResult.investors.senders;

  // Time statistcs
  statsResult.time = getTimeFromLogs(transactionLogs);

  console.log('Block info', transactionLogs[0].blockNumber,
    transactionLogs[transactionLogs.length - 1].blockNumber);

  const toTimeBucket = statsResult.time.toTimeBucket;

  const { senders,
    totalETH,
    totalCurrencyBase,
    tokenIssued,
    tranCount,
    csvContentArray,
    chartTokensCountTemp,
    chartTransactionsCountTemp,
  } = getMoneyFromEvents(icoConfig, allLogs, investors, toTimeBucket);

  // Money statistcs
  statsResult.money.totalETH = totalETH;
  statsResult.money.totalCurrencyBase = totalCurrencyBase;
  statsResult.money.tokenIssued = tokenIssued;

  // General stats
  statsResult.general.transactionsCount = tranCount;

  // Tokens chart
  statsResult.charts.tokensCount = getChartData(statsResult.time.scale,
    chartTokensCountTemp);

  // Transactions chart
  statsResult.charts.transactionsCount = getChartData(statsResult.time.scale,
    chartTransactionsCountTemp);

  const sortedSenders = sortInvestorsByTicket(senders);

  // Investors statistcs
  statsResult.investors.sortedByTicket = sortedSenders[0];
  statsResult.investors.sortedByETH = sortedSenders[1];

  // Charts statistcs
  statsResult.charts.tokenHolders = tokenHoldersPercentage(
    statsResult.money.tokenIssued,
    statsResult.investors.sortedByTicket
  );

  if (statsResult.money.tokenIssued > 0) {
    const tokens = sortedSenders[0].map(investor => investor.value);
    // todo: should just rewrite gini.ordered to accept reverse ordered array
    statsResult.general.giniIndex = gini.ordered(tokens.reverse());
  }

  return [statsResult, csvContentArray];
};
