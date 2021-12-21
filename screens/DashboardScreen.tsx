import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CryptoData, InvestmentItem } from '../models/Item.model';
import axios from 'axios';
import { CRYPTO_API, CRYPTO_URL } from '../constants/Api';
import ListItem from '../components/DashboardListItem';

export default function DashboardScreen({ navigation }: RootTabScreenProps<'Dashboard'>) {
	const [items, setItemsList] = useState<InvestmentItem[]>([]);

	useEffect(() => {
		async function getLocalStorageData(): Promise<void> {
			const itemsJSON = await AsyncStorage.getItem('items');
			const items = JSON.parse(itemsJSON ?? '[]') as InvestmentItem[];
			setItemsList(items);
			fetchItems(items);
		}
		getLocalStorageData();
	}, []);

	const fetchItems = (items: InvestmentItem[]) => {
		if (items.length > 0) {
			const namesArray = items.map((item) => item.id).join(',');
			const url = `${CRYPTO_URL}${CRYPTO_API.MARKETS}?vs_currency=usd&ids=${namesArray}`;

			axios({
				url,
				method: 'get',
			}).then(({ data }: { data: CryptoData[] }) => {
				console.log(data);
				const itemsWithData = data.map((dataItem: CryptoData) => {
					const investmentItem = items.find((item) => item.id === dataItem.id);
					if (investmentItem) {
						investmentItem.data = dataItem;
						return investmentItem;
					}
				});
				setItemsList(itemsWithData as InvestmentItem[]);
			});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('dashboard.welcome')}</Text>
			<Button
				onPress={() => navigation.navigate('AddNewItem')}
				title={t('dashboard.addNewItem')}
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
			<TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
			{items.map((item) => (
				<View key={item.name} style={styles.itemContainer}>
					<ListItem coin={item}></ListItem>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	itemContainer: {
		alignSelf: 'stretch',
	},
});
