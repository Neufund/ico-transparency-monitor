import React from 'react';
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { kFormatter, formatNumber } from '../utils';
import downloadChartImage from '../utils/charts';

const CustomTooltip = (e) => {
  let value = '';
  let key = e.label;
  if (e.payload && e.payload.length >= 1) {
    value = e.payload[0].value;
  }
  if (e.payload && e.payload.length >= 1 &&
    e.payload[0].payload.tooltipName) { key = e.payload[0].payload.tooltipName; }

  return (
    <div className="custom-tooltip">
      <strong>{e.yLabel}:</strong><span> {formatNumber(value, 2)} {e.ySymbol}</span>
      <br />
      <strong>{e.xLabel}:</strong><span> {key} {e.xSymbol}</span>
    </div>);
};
export default ({ title, data, dataKey, xLabel, yLabel, isVisible = true, isNotVisibleMessage = '', hideTitle, tooltip = {} }) => {
  const { xTitle, yTitle, ySymbol, xSymbol } = tooltip;
  return (
    <div id={dataKey} className="chart-parent relative">
      <h3 className="title">{hideTitle ? '' : title}</h3>
      {isVisible &&
        <div >
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={value => kFormatter(value)} />
                <CartesianGrid strokeDasharray="1 3" />
                <Tooltip
                  content={<CustomTooltip
                    xLabel={xTitle || xLabel}
                    yLabel={yTitle || yLabel}
                  />}
                  ySymbol={ySymbol}
                  xSymbol={xSymbol}
                />
                <Bar
                  dataKey="amount"
                  fill="#8884d8"
                  barSize={data && data.length > 250 ? 1 : undefined}
                />
              </BarChart>
            </ResponsiveContainer>
            <button
              className="chart-btn"
              onClick={() => { downloadChartImage(dataKey, title, xLabel, yLabel); }}
            >
              <i className="fa fa-download" /> Download as image
            </button>
          </div>
          <span className="x-axis-label">{xLabel}</span>
          <span className="y-axis-label">{yLabel}</span>
        </div>}
      {!isVisible && <div className="alarm alarm-middle"><p>{isNotVisibleMessage}</p></div>}
    </div>
  );
};
