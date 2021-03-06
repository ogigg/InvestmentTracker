import React from 'react';
import { Purchase } from '../models/Item.model';
import { ScrollView, StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { Text } from '../components/Themed';
import { getThemeColor } from '../hooks/useThemeColor';
import StyledBox from './styled/StyledBox';

export default function purchaseHistoryItem(purchaseItem: Purchase, index: number) {
	return (
		<StyledBox style={{ marginBottom: 16 }}>
			<Text key={index}>{purchaseItem.date ?? t('itemDetails.noDate')}</Text>
			<Text style={styles.text} key={index}>
				{purchaseItem.amount} x {purchaseItem.price}$
			</Text>
			<Text key={index}>{purchaseItem.note}</Text>
		</StyledBox>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		marginBottom: 16,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 6,
	},
});
