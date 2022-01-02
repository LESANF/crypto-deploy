import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';
import CandleChart from './CandleChart';
import LineChart from './LineChart';

const RadioTitle = styled.span`
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
            <RadioSelChart
                //type="radio"
                value="candle"
                //name="chartBtn"
                checked={chartSel === 'candle'}
                onChange={chgChart}
            />
            <RadioTitle>Candle</RadioTitle>
            <RadioSelChart
                //type="radio"
                value="line"
                //name="chartBtn"
                checked={chartSel === 'line'}
                onChange={chgChart}
            />
            <RadioTitle>Line</RadioTitle>
            {chartSel === 'candle' ? <CandleChart coinId={coinId} /> : <LineChart coinId={coinId} />}
        </div>
    );
}

export default Chart;
