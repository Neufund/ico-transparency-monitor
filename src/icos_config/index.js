import moment from 'moment';

const requireAll = r => r.keys().map(fileName => require(`./${fileName.replace('./', '')}`).default);

export const getICOsAsList = (limit) => {
  const icosAsList = requireAll(require.context('./', true, /\.js$/));
  icosAsList.sort((a, b) => moment(b.dateAdded, 'DD-MM-YYYY').toDate() - moment(a.dateAdded, 'DD-MM-YYYY').toDate());

  return {
    icos: icosAsList.slice(0, limit),
    length: icosAsList.length,
  };
};

export const getICOsAsDict = () => {
  const icosAsDict = {};
  const icosAsList = getICOsAsList();
  icosAsList.icos.forEach((element) => {
    if (element && element.crowdSaleTokenContract) {
      icosAsDict[element.crowdSaleTokenContract] = element;
    }
  });
  return icosAsDict;
};

export const getICOByAddress = (address) => {
  const icosAsList = getICOsAsList();
  return icosAsList.icos.find((ico, index) => ico && ico.crowdSaleTokenContract === address);
};

export const getNextICOAddressByPreviousAddress = (previousAddress) => {
  const icosAsList = getICOsAsList();
  for (let i = 0; i < icosAsList.icos.length; i += 1) {
    const ico = icosAsList.icos[i];
    if (ico && ico.crowdSaleTokenContract === previousAddress && i !== icosAsList.icos.length - 2) { return icosAsList.icos[i + 1].crowdSaleTokenContract; }
  }
  return icosAsList.icos[0].crowdSaleTokenContract;
};
