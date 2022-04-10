import {
	Platform,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
} from 'react-native';
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
import { getThemeColor } from '../hooks/useThemeColor';
import { calculateTotalAmount } from '../helpers/coinHelpers';

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
			const itemsWithTotalAmount = itemsWithData.map((item) => ({
				...item,
				totalAmount: calculateTotalAmount(item),
			}));
			setItemsList(itemsWithTotalAmount as InvestmentItem[]);
		}
	};

	return (
		<SafeAreaView style={styles.screenContainer}>
			<ScrollView
				contentContainerStyle={styles.screenContainer}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View style={styles.container}>
					<Pressable style={styles.addButton} onPress={() => navigation.navigate('AddNewItem')}>
						<Text style={{ ...styles.addButton, color: getThemeColor('link') }}>
							{t('dashboard.addNewItem')}
						</Text>
					</Pressable>
					<DashboardSummary investmentItems={items}></DashboardSummary>
					<ScrollView>
						{items.map((item) => (
							<View key={item.name} style={styles.itemContainer}>
								<ListItem
									coin={item}
									onClick={() => navigation.navigate('ItemDetails', { item })}></ListItem>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		marginTop: Platform.OS === 'android' ? 20 : 0,
	},
	container: {
		flex: 1,
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
	addButton: {
		alignItems: 'flex-end',
		fontSize: 20,
	},
});
