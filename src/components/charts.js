import React from 'react';
import {
    BarChart,
    ResponsiveContainer,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import {kFormatter} from '../utils';
import {downloadChartImage} from '../utils/charts';

export const SingleBarChart = ({data, dataKey, xLabel, yLabel}) => (
    data != null && data.length > 0 &&
    <div className="chart-parent">
        <div id={dataKey} className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{top: 5, right: 20, left: 50, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => {
                        return kFormatter(value)
                    }}/>
                    <CartesianGrid strokeDasharray="1 3"/>
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
            <button className="chart-btn" onClick={() => {
                downloadChartImage(dataKey)
            }}>Download as image
            </button>
        </div>
        <label className="x-axis-label">{xLabel}</label>
        <label className="y-axis-label">{yLabel}</label>

    </div>
);