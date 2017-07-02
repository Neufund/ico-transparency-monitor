const BigNumber = require('bignumber.js');

export const tokenHoldersPercentage = (total , investors, percentages = [0.01 , 0.05 , 0.10]) =>{
    let investorsArray = [];
    Object.keys(investors).map((key)=>{
        investorsArray.push({
            investor : key,
            tokens : investors[key].tokens
        })
    });
    investorsArray.sort((first , last)=> {
        return last.tokens - first.tokens;
    });

    let result = [];
    percentages.map((percentageElement)=>{
        const percentage = investorsArray.length*percentageElement;
        let percentageAmount = new BigNumber(0);

        for (let i = 0 ; i < parseInt(percentage); i ++){
            percentageAmount = percentageAmount.plus(investorsArray[i].tokens.toFixed(3));
        }
        let internalResult = {};
        internalResult[percentageElement] =new BigNumber((percentageAmount*100).toFixed(3)).dividedBy(total.toFixed(3)).valueOf();
        result.push(internalResult);
    });
    return result;
};


export const getToenHoldersChartData = (total , investors, percentages = [0.01 , 0.05 , 0.10]) => {
    const holders = tokenHoldersPercentage(total , investors, percentages);
    let prevValue = 0;
    const h = holders.map((item )=>{
        const key = Object.keys(item)[0];
        const value = prevValue == 0 ?parseFloat(item[key]).toFixed(2):(parseFloat(item[key]) - parseFloat(prevValue)).toFixed(2)
        const x ={
            name : `${key}%` ,
            value : parseFloat(value)
        };
        prevValue = item[key];
        return x;
    });
    let s = 0;
    h.map((item)=> s+= parseFloat(item.value));
    h.push({name:'remains' , value:100 - s});

    return h;
}