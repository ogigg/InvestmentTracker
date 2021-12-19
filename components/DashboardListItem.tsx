/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { Text, View } from './Themed';
import { InvestmentItem } from '../models/Item.model';

export default function ListItem({ coin }: { coin: InvestmentItem }) {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('../assets/images/logos/BTC_Logo.png')} />
			<View style={styles.textContainer}>
				<View>
					<Text style={styles.itemName}>{coin.name}</Text>
					<Text style={styles.amount}>
						{coin.amount} {coin.symbol.toUpperCase()}
					</Text>
				</View>

				{coin.data && (
					<View style={styles.summary}>
						<Text style={styles.itemName}>{coin.amount * coin.data.current_price}</Text>
						<Text style={styles.amount}>
							{coin.amount * coin.data.current_price - coin.amount * coin.price}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 5,
		flexDirection: 'row',
		alignSelf: 'stretch',
	},
	textContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		flex: 1,
	},
	itemName: {
		fontSize: 24,
	},
	amount: {
		fontSize: 16,
	},
	logo: {
		width: 50,
		height: 50,
		marginRight: 16,
	},
	summary: {
		alignItems: 'flex-end',
	},
});
