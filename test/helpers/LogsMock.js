import testConfig from '../../src/config.test';

export default (address) => {
  const getLogTemplate = (eventName, index) => ({
    address: '0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf',
    args: {
      amount: index * (10 ** 18),
      user: `0x000000000000000000000000000000${index}`,
    },
    blockHash: `0xe75c5b4dcb19d1d05b99704987ea4a5385c2e3093fec623646f8585e16a36963${index}`,
    blockNumber: 3939554,
    event: eventName,
    logIndex: index,
    timestamp: 1498598604 * index,
    transactionHash: `0xd140ef0d51db7c9e1dd237f80db78520352e6909f7a4b1b13653a355c5222e87${index}`,
    transactionIndex: 31,
    transactionLogIndex: '0x0',
    type: 'mined',
    value: '0x354a6ba7a180000',
  });
  const icoConfig = testConfig.ICOs[address];
  const logs = {};
  const eventNames = Object.keys(icoConfig.events);
  eventNames.forEach((eventName) => {
    for (let i = 1; i <= 3; i += 1) {
      // eslint-disable-next-line no-prototype-builtins
      if (!logs.hasOwnProperty(eventName)) { logs[eventName] = []; }
      logs[eventName].push(getLogTemplate(eventName, i));
    }
  });

  return logs;
};
