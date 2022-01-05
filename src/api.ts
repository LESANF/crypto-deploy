export async function fetchCoins() {
    return await (await fetch(`${process.env.REACT_APP_BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
    return await (await fetch(`${process.env.REACT_APP_BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinPrice(coinId: string) {
    return await (await fetch(`${process.env.REACT_APP_BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchOHLCvalue(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 2;
    return await (
        await fetch(
            `${process.env.REACT_APP_BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
        )
    ).json();
}
