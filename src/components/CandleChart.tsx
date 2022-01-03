import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';
import { ChartProps, IOHLCvalue } from '../routes/Chart';

function CandleChart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IOHLCvalue[]>(['ohlcv', 'chart'], () => fetchOHLCvalue(coinId), {
        refetchInterval: 5000,
    });
    const apexCandleOpt: object = {
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
    const apexCandleSeries: object[] = [
        {
            name: 'Candle',
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
                <ApexCharts
                    options={apexCandleOpt}
                    series={apexCandleSeries}
                    type="candlestick"
                    height={350}
                />
            )}
        </div>
    );
}

export default CandleChart;
