export const convertSymbolToId = (symbol: string) => {
	return availableCryptoCoins[symbol.toUpperCase()];
};

export const availableCryptoCoins: { [key: string]: string } = {
	ETH: 'etherium',
	BTC: 'bitcoin',
	HNT: 'helium',
	XTZ: 'tezos',
};

export const dataToChartData = (data: number[][]): { x: number; y: number }[] => {
	const values = data.map((item) => ({ x: item[0], y: item[1] }));
	return values;
};
