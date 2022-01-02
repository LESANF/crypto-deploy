import { useQuery } from 'react-query';
import { fetchOHLCvalue } from '../api';

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery('ohlcv', () => fetchOHLCvalue(coinId));
    return <h1>{coinId}</h1>;
}

export default Chart;
