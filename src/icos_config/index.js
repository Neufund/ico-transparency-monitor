import moment from 'moment';

const requireAll = r => r.keys().map(fileName => require(`./${fileName.replace('./', '')}`).default);

const icosAsList = requireAll(require.context('./', true, /\.js$/));

icosAsList.sort((a, b) => {
  console.log(a.addingDate, b.addingDate, moment(a.addingDate, 'DD-MM-YYYY').toDate(), moment(b.addingDate, 'DD-MM-YYYY').toDate());
  return moment(b.addingDate, 'DD-MM-YYYY').toDate() - moment(a.addingDate, 'DD-MM-YYYY').toDate();
}
);

console.log(icosAsList);
const icosAsDict = {};
icosAsList.forEach((element) => {
  if (element) {
    icosAsDict[element.crawdSaleTokenContract] = element;
  }
});

export default icosAsDict;
