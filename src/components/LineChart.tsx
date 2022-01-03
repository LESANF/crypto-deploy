import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';
import { ChartProps, IOHLCvalue } from '../routes/Chart';

function LineChart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IOHLCvalue[]>(['ohlcv', 'line'], () => fetchOHLCvalue(coinId), {
        refetchInterval: 5000,
    });
    const apexLineOpt: object = {
        theme: {
            mode: 'dark',
        },
        chart: {
            height: 300,
            width: 500,
            toolbar: {
                show: false,
            },
            background: 'transparent',
        },
        grid: { show: false },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        yaxis: {
            show: false,
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: 'datetime',
            categories: data?.map((price) => price.time_close),
        },
        fill: {
            type: 'gradient',
            gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
        },
        colors: ['#0fbcf9'],
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toFixed(2)}`,
            },
        },
    };
    const apexLineSeries: object[] = [
        {
            name: 'Price',
            data: data?.map((price) => price.close),
        },
    ];

    return (
        <div>
            {isLoading ? 'Chart is Loading' : <ApexCharts options={apexLineOpt} series={apexLineSeries} />}
        </div>
    );
}

export default LineChart;
