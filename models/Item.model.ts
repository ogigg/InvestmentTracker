export enum InvestmentType {
	crypto,
	stock,
}

export interface InvestmentItem {
	name: string;
	amount: number;
	price: number;
	type?: InvestmentType;
}
