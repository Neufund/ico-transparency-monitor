/* eslint-env browser */
const saveAs = require('file-saver').saveAs;

const svgDataURL = (svg) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
};

export default (chartId, title, xLabel, yLabel, projectName) => {
  const div = document.getElementById(chartId);
  const rect = div.getBoundingClientRect();

  const canvas = document.createElement('canvas');

  canvas.width = rect.width;
  canvas.height = rect.height + 50;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop('0', '#424344');
  gradient.addColorStop('0.5', '#D9DBDC');
  gradient.addColorStop('1.0', '#D4E20F');


  const svgTag = document.getElementById(chartId).getElementsByTagName('svg')[0];
  const url = svgDataURL(svgTag);
  const img = new Image();

  img.width = canvas.width;
  img.height = canvas.height;

  img.onload = function loadImage() {
    ctx.drawImage(img, 0, canvas.height / 5);

    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.font = '10px Lato';
    ctx.fillText(yLabel, 20, 70);
    ctx.fillText(xLabel, canvas.width / 2, canvas.height - 30);

    ctx.font = '15px Lato';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(`${projectName.toUpperCase()} ICO`, canvas.width / 2, 30);
    ctx.font = '20px Lato';
    ctx.fillText(title, canvas.width / 2, 55);

    ctx.font = '15px Lato';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'left';
    ctx.fillText('Powered by neufund.org', 15, canvas.height - 15);

    canvas.toBlob((blob) => {
      saveAs(blob, `${projectName}-${title}.png`);
    });
  };
  img.src = url;
};
