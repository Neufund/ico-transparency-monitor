import React from 'react';
import {
    PieChart,
    Cell,
    Pie,
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

export const TokensBarChart = ({data, dataKey}) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{top: 5, right: 20, left: 50, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis tickFormatter={(value) => {
                return kFormatter(value)
            }}/>
            <CartesianGrid strokeDasharray="1 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8"/>
        </BarChart>
    </ResponsiveContainer>
);

export const DoubleBarChart = ({data, ChartKey}) => (
    data != null &&
    <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis tickFormatter={(value) => {
                return kFormatter(value)
            }}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey={ChartKey} fill="#8884d8"/>
            {/*<Bar dataKey="Ether" fill="#82ca9d" />*/}
        </BarChart>
    </ResponsiveContainer>
);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;


export const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if ( percent * 100 < 4){
        return (<text/>)
    }
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const TokenHoldersPieChart = ({data}) => (
    data != null &&
    <ResponsiveContainer width="100%" height={400}>
        <PieChart width={800} height={400}>
            <Pie isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={180}
                 fill="#8884d8"
                 label={renderCustomizedLabel}>
                {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
            <Tooltip/>
        </PieChart>
    </ResponsiveContainer>
);