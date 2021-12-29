export async function fetchCoins() {
    return await (await fetch('https://api.coinpaprika.com/v1/coins')).json();
}
