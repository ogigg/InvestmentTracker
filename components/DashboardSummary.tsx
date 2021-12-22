/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { InvestmentItem } from '../models/Item.model';
import { dashboardSummaryEmoji } from '../constants/DashboardSummaryEmojis';
import { t } from 'i18n-js';
import { getRandomElementFromArray } from '../helpers/coinHelpers';

export default function DashboardSummary({
	investmentItems,
}: {
	investmentItems: InvestmentItem[];
}) {
	const [emoji, setEmoji] = useState(getRandomElementFromArray(dashboardSummaryEmoji.misc));
	const [welcomeText, setWelcomeText] = useState(t('dashboard.summary.welcome.hello'));

	const getRandomEmoji = (): void => {
		const hourNow = new Date().getHours();
		if (hourNow >= 21 || hourNow <= 5) {
			setEmoji(getRandomElementFromArray(dashboardSummaryEmoji.night));
			setWelcomeText(t('dashboard.summary.welcome.night'));
		}
		if (hourNow >= 6 && hourNow < 11) {
			setEmoji(getRandomElementFromArray(dashboardSummaryEmoji.morning));
			setWelcomeText(t('dashboard.summary.welcome.morning'));
		}
		if (hourNow >= 11 && hourNow < 16) {
			setEmoji(getRandomElementFromArray(dashboardSummaryEmoji.day));
			setWelcomeText(t('dashboard.summary.welcome.day'));
		}
		if (hourNow >= 16 && hourNow < 19) {
			setEmoji(getRandomElementFromArray(dashboardSummaryEmoji.afternoon));
			setWelcomeText(t('dashboard.summary.welcome.afternoon'));
		}
		if (hourNow >= 19 && hourNow < 22) {
			setEmoji(getRandomElementFromArray(dashboardSummaryEmoji.evening));
			setWelcomeText(t('dashboard.summary.welcome.evening'));
		}
	};

	useEffect(() => getRandomEmoji(), []);

	return (
		<View style={styles.container}>
			<Text style={styles.emoji}>{emoji}</Text>
			<Text style={styles.welcomeText}>{welcomeText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'stretch',
	},
	emoji: {
		textAlign: 'center',
		fontSize: 60,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
