/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StyleSheet, Image, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { InvestmentItem } from '../models/Item.model';
import { getThemeColor } from '../hooks/useThemeColor';

interface ListItemProps {
	coin: InvestmentItem;
	onClick?: () => void;
}

export default function ListItem({ coin, onClick }: ListItemProps) {
	const [profit, setProfit] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [imageLoading, setImageLoading] = useState(true);
	const spinnerColor = getThemeColor('text');

	return (
		<Pressable onPress={onClick}>
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={{ uri: coin?.data?.image }}
					onLoadEnd={() => setImageLoading(false)}
				/>
				{imageLoading && <ActivityIndicator size="large" color={spinnerColor}></ActivityIndicator>}
				<View style={styles.textContainer}>
					<View>
						<Text style={styles.itemName}>{coin.name}</Text>
						<Text style={styles.amount}>
							{coin.totalAmount} {coin.symbol.toUpperCase()}
						</Text>
					</View>

					{coin.data && (
						<View style={styles.summary}>
							<Text style={styles.itemName}>
								${Math.round(coin.totalAmount ?? 0 * coin.data.current_price)}
							</Text>
							<Text style={[styles.amount, profit > 0 ? styles.green : styles.red]}>${profit}</Text>
						</View>
					)}
				</View>
			</View>
		</Pressable>
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
	green: {
		color: '#006e00',
	},
	red: {
		color: '#c92222',
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
