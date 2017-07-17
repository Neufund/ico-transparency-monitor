const saveAs = require('file-saver').saveAs;

const svgDataURL = (svg) => {
  const svgAsXML = new XMLSerializer().serializeToString(svg);
  return `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
};

export const downloadChartImage = (chartId) => {
  const div = document.getElementById(chartId);
  const rect = div.getBoundingClientRect();

  const canvas = document.createElement('canvas');

  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px Verdana';

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop('0', '#424344');
  gradient.addColorStop('0.5', '#D9DBDC');
  gradient.addColorStop('1.0', '#D4E20F');

    // Fill with gradient
  ctx.fillStyle = gradient;

  const svgTag = document.getElementById(chartId).getElementsByTagName('svg')[0];
  const url = svgDataURL(svgTag);
  const img = new Image();
  img.width = canvas.width;
  img.height = canvas.height;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.fillText('Powered by Neufund', canvas.width / 2 - 90, canvas.height / 2 - 40);
    canvas.toBlob((blob) => {
      saveAs(blob, `${chartId}.png`);
    });
  };
  img.src = url;
};
