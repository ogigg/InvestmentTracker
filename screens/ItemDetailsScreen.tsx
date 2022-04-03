import { t } from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '../components/Themed';
import { InvestmentItem } from '../models/Item.model';
import { RootStackScreenProps } from '../types';

export default function ItemDetails({ route, navigation }: RootStackScreenProps<'ItemDetails'>) {
	const { item }: { item: InvestmentItem } = route.params;
	return (
		<ScrollView style={styles.screenWrapper}>
			<Text style={styles.title}>{item.name}</Text>
			<View style={styles.graphPlaceholder}></View>
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
	},
	graphPlaceholder: {
		height: 250,
		width: '100%',
		backgroundColor: 'blue',
	},
});
