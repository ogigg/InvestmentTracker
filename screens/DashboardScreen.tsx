import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { t } from 'i18n-js';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CryptoData, InvestmentItem } from '../models/Item.model';
import axios from 'axios';
import { CRYPTO_API, CRYPTO_URL } from '../constants/Api';
import ListItem from '../components/DashboardListItem';
import DashboardSummary from '../components/DashboardSummary';

export default function DashboardScreen({ navigation }: RootTabScreenProps<'Dashboard'>) {
	const [items, setItemsList] = useState<InvestmentItem[]>([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchItems(items).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		async function getLocalStorageData(): Promise<void> {
			const itemsJSON = await AsyncStorage.getItem('items');
			const items = JSON.parse(itemsJSON ?? '[]') as InvestmentItem[];
			setItemsList(items);
			fetchItems(items);
		}
		getLocalStorageData();
	}, []);

	const fetchItems = async (items: InvestmentItem[]) => {
		if (items.length > 0) {
			const namesArray = items.map((item) => item.id).join(',');
			const url = `${CRYPTO_URL}${CRYPTO_API.MARKETS}?vs_currency=usd&ids=${namesArray}`;

			const response: { data: CryptoData[] } = await axios({
				url,
				method: 'get',
			});
			const itemsWithData = response.data.map((dataItem: CryptoData) => {
				const investmentItem = items.find((item) => item.id === dataItem.id);
				if (investmentItem) {
					investmentItem.data = dataItem;
					return investmentItem;
				}
			});
			setItemsList(itemsWithData as InvestmentItem[]);
		}
	};

	return (
		<SafeAreaView style={styles.screenContainer}>
			<ScrollView
				contentContainerStyle={styles.screenContainer}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View style={styles.container}>
					<DashboardSummary investmentItems={items}></DashboardSummary>
					<Button
						onPress={() => navigation.navigate('AddNewItem')}
						title={t('dashboard.addNewItem')}
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
					{items.map((item) => (
						<View key={item.name} style={styles.itemContainer}>
							<ListItem coin={item}></ListItem>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
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
