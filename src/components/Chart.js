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

export default ({ title, data, dataKey, xLabel, yLabel, isVisible = true, isNotVisibleMessage = '', hideTitle }) => (

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
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
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
