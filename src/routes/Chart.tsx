import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';
import CandleChart from './CandleChart';
import LineChart from './LineChart';

const RadioLabel = styled.label`
    margin-right: 5px;
`;
const RadioSelChart = styled.input.attrs({ type: 'radio', name: 'chartBtn' })``;

export interface IOHLCvalue {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

export interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const [chartSel, setChartSel] = useState('candle');

    const chgChart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setChartSel(value);
    };

    return (
        <div>
            <RadioLabel>
                <RadioSelChart value="candle" checked={chartSel === 'candle'} onChange={chgChart} />
                Candle
            </RadioLabel>
            <RadioLabel>
                <RadioSelChart value="line" checked={chartSel === 'line'} onChange={chgChart} />
                Line
            </RadioLabel>
            {chartSel === 'candle' ? <CandleChart coinId={coinId} /> : <LineChart coinId={coinId} />}
        </div>
    );
}

export default Chart;
