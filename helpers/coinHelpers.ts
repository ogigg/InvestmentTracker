import { CryptoData, InvestmentItem } from '../models/Item.model';

export const dataToChartData = (data: number[][]): { x: number; y: number }[] => {
	const values = data.map((item) => ({ x: item[0], y: item[1] }));
	return values;
};

export const getRandomElementFromArray = (array: string[]): string => {
	return array[Math.floor(Math.random() * array.length)];
};

export const calculateTotalAmount = (coin: InvestmentItem) => {
	if (coin.data && coin.data.current_price) {
		let totalAmount = 0;
		coin.purchases.forEach((purchase) => {
			totalAmount += +purchase.amount;
		});
		return totalAmount;
	}
};
