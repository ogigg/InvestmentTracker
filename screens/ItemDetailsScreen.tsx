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
	return (
		<ScrollView style={{ ...styles.screenWrapper, backgroundColor: getThemeColor('background') }}>
			<Text style={styles.title}>{item.name}</Text>
			<View style={styles.graphPlaceholder}></View>
			<Text>{t('itemDetails.purchaseHistory')}</Text>
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
	},
	graphPlaceholder: {
		height: 250,
		width: '100%',
		backgroundColor: 'blue',
	},
});
