import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';
import ApexCharts from 'react-apexcharts';

interface IOHLCvalue {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IOHLCvalue[]>('ohlcv', () => fetchOHLCvalue(coinId));
    const apexOpt: object = {
        theme: {
            mode: 'dark',
        },
        chart: {
            background: 'transparent',
            height: 350,
            type: 'candlestick',
        },

        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#a29bfe',
                    downward: '#00b894',
                },
            },
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            labels: {
                style: {
                    fontSize: '10px',
                    colors: '#fff',
                },
            },
        },
        yaxis: {
            opposite: true,
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
    };
    const apexSeries: object[] = [
        {
            name: 'candle',
            data: data?.map((ele) => ({
                x: ele.time_close.split('T')[0],
                y: [ele.open, ele.high, ele.low, ele.close].map((ele) => ele.toFixed(2)),
            })),
        },
    ];
    return (
        <div>
            {isLoading ? (
                'Chart is Loading...'
            ) : (
                <ApexCharts options={apexOpt} series={apexSeries} type="candlestick" height={350} />
            )}
        </div>
    );
}

export default Chart;
