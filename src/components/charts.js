import React from 'react';
import {
    BarChart,
    ResponsiveContainer,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import {kFormatter} from '../utils';
import {downloadChartImage} from '../utils/charts';

export const SingleBarChart = ({data, dataKey, xLabel, yLabel}) => (
    data != null &&
    <div className="chart">
        <div id={dataKey}>
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
            <label className="x-axis-label">{xLabel}</label>
            <label className="y-axis-label">{yLabel}</label>
        </div>
        <button className="chart-btn" onClick={() => {
            downloadChartImage(dataKey)
        }}>Download as image
        </button>
    </div>
);