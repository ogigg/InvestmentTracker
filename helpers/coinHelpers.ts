export const dataToChartData = (data: number[][]): { x: number; y: number }[] => {
	const values = data.map((item) => ({ x: item[0], y: item[1] }));
	return values;
};
