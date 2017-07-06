const BigNumber = require('bignumber.js');
const html2canvas = require('html2canvas');
export const tokenHoldersPercentage = (total , investors, percentages) =>{
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

export const getTokenHoldersChartData = (total , investors, percentages = [0.01 , 0.05 , 0.10]) => {
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
};

export const downloadChartImage = (chartId) => {
    const div= document.getElementById(chartId);

    const watermark = '<h1>Neufund</h1>';
    const rect = div.getBoundingClientRect();

    const canvas = document.createElement("canvas");

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font="30px Verdana";

    const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","#424344");
    gradient.addColorStop("0.5","#D9DBDC");
    gradient.addColorStop("1.0","#D4E20F");

    // Fill with gradient
    ctx.fillStyle=gradient;
    ctx.fillText("Powered by Neufund",
        canvas.width/2 - 90
        ,40
    );
    ctx.translate(-rect.left,-rect.top);

    html2canvas(div, {
        canvas:canvas,
        height:rect.height,
        width:rect.width,
        onrendered: function(canvas) {
            console.log(canvas);
            const image = canvas.toDataURL("image/png");

            window.open(image);
        }
    });
};