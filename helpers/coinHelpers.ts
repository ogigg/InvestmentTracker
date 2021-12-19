export const convertSymbolToId = (symbol: string) => {
	return availableCryptoCoins[symbol.toUpperCase()];
};

export const availableCryptoCoins: { [key: string]: string } = {
	ETH: 'etherium',
	BTC: 'bitcoin',
	HNT: 'helium',
	XTZ: 'tezos',
};
