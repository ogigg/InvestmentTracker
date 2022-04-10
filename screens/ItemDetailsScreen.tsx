import { t } from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';

import purchaseHistoryItem from '../components/PurchaseHistoryItem';
import StyledBox from '../components/styled/StyledBox';
import { Text, View } from '../components/Themed';
import { getThemeColor } from '../hooks/useThemeColor';
import { InvestmentItem } from '../models/Item.model';
import { RootStackScreenProps } from '../types';

export default function ItemDetails({ route, navigation }: RootStackScreenProps<'ItemDetails'>) {
	const [imageLoading, setImageLoading] = useState(true);

	const { item }: { item: InvestmentItem } = route.params;
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
			<StyledBox style={styles.itemDetailsBox}>
				<View style={{ backgroundColor: getThemeColor('secondary') }}>
					<Image
						style={styles.logo}
						source={{ uri: item?.data?.image }}
						onLoadEnd={() => setImageLoading(false)}
					/>
					{/* {imageLoading && (
						<ActivityIndicator size="large" color={getThemeColor('text')}></ActivityIndicator>
					)} */}
				</View>
				<View style={{ ...styles.amountWrapper, backgroundColor: getThemeColor('secondary') }}>
					<Text style={styles.amountText}>{item.name}</Text>
					<Text style={styles.amountText}>
						{item.totalAmount} {item.symbol.toUpperCase()}
					</Text>
				</View>
			</StyledBox>
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
	itemDetailsBox: {
		marginVertical: 16,
		display: 'flex',
		flexDirection: 'row',
	},
	logo: {
		width: 50,
		height: 50,
		marginRight: 16,
	},
	amountWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		justifyContent: 'center',
	},
	amountText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
