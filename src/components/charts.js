import React from 'react';
import { BarChart,ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {kFormatter} from '../utils';

export const TokensBarChart = ({data , dataKey}) => (
    <ResponsiveContainer width="100%" height={300} >
    <BarChart data={data} margin={{top: 5, right: 20, left: 50, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis tickFormatter={(value)=> {return kFormatter(value)}}/>
        <CartesianGrid strokeDasharray="1 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey={dataKey} fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>
);

export const DoubleBarChart = ({data , ChartKey}) => (
    data != null  &&
    <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis tickFormatter={(value)=> {return kFormatter(value)}}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey={ChartKey} fill="#8884d8" />
        {/*<Bar dataKey="Ether" fill="#82ca9d" />*/}
    </BarChart>
);