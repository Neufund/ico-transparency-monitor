import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export const TokensBarChart = ({data , dataKey}) => (
    <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey={dataKey} fill="#8884d8" />
    </BarChart>
);

export const DoubleBarChart = ({data}) => (
    data != null  &&
    <BarChart width={600} height={300} data={[
        {
            name: 'x < 10k',
            Investors: data['l10k'][1],
            Ether: data['l10k'][0],
        },
        {
            name: '10k>x>100k',
            Investors: data['g10kl100k'][1],
            Ether: data['g10kl100k'][0],
        },
        {
            name: '100k>x>500k',
            Investors: data['g100kl500k'][1],
            Ether: data['g100kl500k'][0],
        },
        {
            name: 'x > 500k',
            Investors: data['g500k'][1],
            Ether: data['g500k'][0],
        },
    ]}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Investors" fill="#8884d8" />
        <Bar dataKey="Ether" fill="#82ca9d" />
    </BarChart>
);