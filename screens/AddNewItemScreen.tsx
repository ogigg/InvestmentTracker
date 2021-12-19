import { Button, StyleSheet, TextInput } from 'react-native';
import { t } from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvestmentItem, InvestmentItemDropdown } from '../models/Item.model';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { availableCryptoCoins } from '../constants/AvailableCrypto';
import { getThemeColor } from '../hooks/useThemeColor';

export default function AddNewItem({ navigation }: RootStackScreenProps<'AddNewItem'>) {
	const { setValue, control, handleSubmit } = useForm<InvestmentItem>();

	const onSubmit = async (form: InvestmentItem) => {
		const storedItems = await AsyncStorage.getItem('items');
		const newItemsArray = (storedItems ? JSON.parse(storedItems) : []) as InvestmentItem[];
		newItemsArray.push(form);
		await AsyncStorage.setItem('items', JSON.stringify(newItemsArray));
		navigation.replace('Root');
	};

	const setSelectedItem = (item: InvestmentItemDropdown) => {
		if (item) {
			setValue('id', item.id);
			setValue('name', item.name);
			setValue('symbol', item.symbol);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('newItem.header')}</Text>
			<Text style={styles.label}>{t('newItem.cryptoInput.label')}</Text>
			<AutocompleteDropdown
				clearOnFocus={false}
				closeOnSubmit={false}
				onSelectItem={setSelectedItem}
				dataSet={availableCryptoCoins}
				textInputProps={{
					placeholder: t('newItem.cryptoInput.placeholder'),
					autoCorrect: false,
					borderRadius: 0,
					margin: 0,
					borderWidth: 1,
					autoCapitalize: 'none',
					style: {
						backgroundColor: getThemeColor('background'),
						color: getThemeColor('text'),
						alignSelf: 'stretch',
					},
				}}
				containerStyle={{
					alignSelf: 'stretch',
				}}
			/>
			<Text style={styles.label}>{t('newItem.cryptoInput.label')}</Text>
			<Controller
				name="amount"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						keyboardType="numeric"
						style={{ ...styles.input, color: getThemeColor('text') }}
						onBlur={onBlur}
						placeholder={t('newItem.amountInput.placeholder')}
						onChangeText={onChange}
						value={value?.toString()}
					/>
				)}
			/>
			<Text style={styles.label}>{t('newItem.priceInput.label')}</Text>
			<Controller
				name="price"
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						keyboardType="numeric"
						style={{ ...styles.input, color: getThemeColor('text') }}
						placeholder={t('newItem.priceInput.placeholder')}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value?.toString()}
					/>
				)}
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				title={t('newItem.save')}
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		alignSelf: 'stretch',
		fontSize: 16,
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
	label: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'left',
		alignSelf: 'stretch',
		marginTop: 16,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});
