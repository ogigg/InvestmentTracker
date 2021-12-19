export enum InvestmentType {
	crypto,
	stock,
}

export interface InvestmentItem {
	id: string;
	name: string;
	amount: number;
	symbol: string;
	price: number;
	type?: InvestmentType;
	data?: CryptoData;
}

export interface InvestmentItemDropdown {
	id: string;
	symbol: string;
	name: string;
	title: string;
}
export interface CryptoData {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	roi: null;
	last_updated: string;
	chart?: {
		prices: number[][];
		market_caps: number[][];
		total_volumes: number[][];
	};
}
