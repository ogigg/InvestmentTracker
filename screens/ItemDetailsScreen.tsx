import { t } from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import purchaseHistoryItem from '../components/PurchaseHistoryItem';
import { Text, View } from '../components/Themed';
import { getThemeColor } from '../hooks/useThemeColor';
import { InvestmentItem } from '../models/Item.model';
import { RootStackScreenProps } from '../types';

export default function ItemDetails({ route, navigation }: RootStackScreenProps<'ItemDetails'>) {
	const { item }: { item: InvestmentItem } = route.params;
	console.log(item);
	return (
		<ScrollView style={{ ...styles.screenWrapper, backgroundColor: getThemeColor('background') }}>
			<Text style={styles.title}>{item.name}</Text>
			{item.data && (
				<View>
					<Text style={styles.currentPrice}>{item.data?.current_price} USD</Text>
					<Text
						style={{
							...styles.priceChange,
							color: item.data?.price_change_24h > 0 ? 'green' : 'red',
						}}>
						{item.data?.price_change_24h > 0 ? '+' : ''}
						{item.data?.price_change_24h} USD ({item.data?.price_change_percentage_24h} %)
					</Text>
				</View>
			)}
			<View style={styles.graphPlaceholder}></View>

			<Text style={styles.title}>{t('itemDetails.purchaseHistory')}</Text>
			{item.purchases.map(purchaseHistoryItem)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		padding: 20,
		flexGrow: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	graphPlaceholder: {
		height: 250,
		width: '100%',
		backgroundColor: 'blue',
	},
	currentPrice: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	priceChange: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 14,
	},
});
