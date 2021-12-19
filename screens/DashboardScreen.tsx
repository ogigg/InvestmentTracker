import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvestmentItem } from '../models/Item.model';
import axios from 'axios';
import { CRYPTO_API, CRYPTO_URL } from '../constants/Api';
import ListItem from '../components/DashboardListItem';
import { cryptoCoinMock } from '../mocks/cryptoCoin.mock';

export default function DashboardScreen({ navigation }: RootTabScreenProps<'Dashboard'>) {
	const [itemsList, setItemsList] = useState<InvestmentItem[]>([]);

	useEffect(() => {
		async function getLocalStorageData(): Promise<void> {
			const itemsJSON = await AsyncStorage.getItem('items');
			const items = JSON.parse(itemsJSON ?? '[]') as InvestmentItem[];
			const fixed = items.map((item) => ({ ...item, data: cryptoCoinMock[0] }));
			setItemsList(fixed);
		}
		getLocalStorageData();
	}, []);

	// useEffect(() => {
	// 	const itemsWithoutData = itemsList.filter((item) => !item.data);
	// 	const namesArray = itemsWithoutData.map((item) => convertSymbolToId(item.name)).join(',');
	// 	const url = `${CRYPTO_URL}${CRYPTO_API.MARKETS}?vs_currency=usd&ids=${namesArray}`;
	// 	const fixed = itemsList.map((item) => ({ ...item, data: cryptoCoinMock[0] }));
	// 	console.log(fixed);
	// 	setItemsList(fixed);
	// 	axios({
	// 		url,
	// 		method: 'get',
	// 	}).then((response) => {
	// 		console.log(response.data);
	// 	});
	// }, [itemsList]);

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
			{/* <View style={styles.red}> */}
			{itemsList.map((item) => (
				<View key={item.name} style={styles.itemContainer}>
					<ListItem coin={item}></ListItem>
				</View>
			))}
			{/* </View> */}
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
