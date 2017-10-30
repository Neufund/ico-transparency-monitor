const requireAll = (r) => r.keys().map(fileName => require(`./${fileName.replace("./", "")}`).default );

const icosAsList = requireAll(require.context('./', true, /\.js$/));
let icosAsDict = {};
icosAsList.forEach((element) => {
  if(element) {
    icosAsDict[element.crawdSaleTokenContract] = element;
  }
});

export default icosAsDict