import moment from 'moment';
// eslint-disable-next-line import/no-dynamic-require
const requireAll = r => r.keys().map(fileName => require(`./${fileName.replace('./', '')}`).default);

export const getICOsAsList = () => {
  const icosAsList = requireAll(require.context('./', true, /\.js$/));
  icosAsList.sort((a, b) => moment(b.dateAdded, 'DD-MM-YYYY').toDate() - moment(a.dateAdded, 'DD-MM-YYYY').toDate());
  return icosAsList;
};

export const getICOsAsDict = () => {
  const icosAsDict = {};
  const icosAsList = getICOsAsList();
  icosAsList.forEach((element) => {
    if (element) {
      icosAsDict[element.crowdSaleTokenContract] = element;
    }
  });
  return icosAsDict;
};
