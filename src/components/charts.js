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
import { kFormatter } from '../utils';
import { downloadChartImage } from '../utils/charts';

export const SingleBarChart = ({ title, data, dataKey, xLabel, yLabel , isVisible = true , isNotVisibleMessage ="" }) => (
    data != null && data.length > 0 &&
    <div id={dataKey} className="chart-parent">
      <h3 className="title">{title}</h3>
      {isVisible &&
        <div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={value => kFormatter(value)} />
            <CartesianGrid strokeDasharray="1 3" />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <button
          className="chart-btn"
          onClick={() => {
            downloadChartImage(dataKey, title, xLabel, yLabel);
          }}
        >Download as image
            </button>
      </div>
      <label className="x-axis-label">{xLabel}</label>
      <label className="y-axis-label">{yLabel}</label>
        </div>}
      {!isVisible && <div className="alarm alarm-middle"><p>{isNotVisibleMessage}</p></div>}
    </div>
);
