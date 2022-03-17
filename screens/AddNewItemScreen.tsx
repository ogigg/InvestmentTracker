import { Button, StyleSheet, TextInput } from 'react-native';
import { t } from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvestmentItem, InvestmentItemDropdown } from '../models/Item.model';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { availableCryptoCoins } from '../constants/AvailableCrypto';
import { getThemeColor } from '../hooks/useThemeColor';

export default function AddNewItem({ navigation }: RootStackScreenProps<'AddNewItem'>) {
	const { setValue, control, handleSubmit } = useForm<InvestmentItem>();
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'purchases',
	});

	const addPurchase = (): void => {
		append({ id: new Date().getTime() });
	};

	const removePurchase = (index: number): void => {
		remove(index);
	};

	const onSubmit = async (form: InvestmentItem) => {
		console.log(form);
		// const storedItems = await AsyncStorage.getItem('items');
		// const newItemsArray = (storedItems ? JSON.parse(storedItems) : []) as InvestmentItem[];
		// newItemsArray.push(form);
		// await AsyncStorage.setItem('items', JSON.stringify(newItemsArray));
		// navigation.replace('Root');
	};

	const setSelectedItem = (item: InvestmentItemDropdown) => {
		if (item) {
			setValue('id', item.id);
			setValue('name', item.name);
			setValue('symbol', item.symbol);
		}
	};
	return (
		<View style={styles.screenWrapper}>
			<Text style={styles.title}>{t('newItem.header')}</Text>
			<Text style={styles.label}>{t('newItem.cryptoInput.label')}</Text>
			<AutocompleteDropdown
				clearOnFocus={false}
				closeOnSubmit={false}
				onSelectItem={setSelectedItem}
				dataSet={availableCryptoCoins}
				textInputProps={{
					placeholder: t('newItem.cryptoInput.placeholder'),
					placeholderTextColor: getThemeColor('placeholder'),
					autoCorrect: false,
					borderRadius: 0,
					margin: 0,
					paddingHorizontal: 0,
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
			{fields.map((field, index) => (
				<View key={field.id} style={styles.container}>
					<View style={styles.purchaseTitleContainer}>
						<Text style={styles.purchaseTitle}>{`${t('newItem.purchase')} ${index + 1}`}</Text>
						<Button
							onPress={() => removePurchase(index)}
							title={t('newItem.removePurchase')}
							color="#841584"
							accessibilityLabel="Remove purchase"
						/>
					</View>
					<Text style={styles.label}>{t('newItem.amountInput.label')}</Text>
					<Controller
						name={`purchases.${index}.amount`}
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
								placeholderTextColor={getThemeColor('placeholder')}
							/>
						)}
					/>
					<Text style={styles.label}>{t('newItem.priceInput.label')}</Text>
					<Controller
						name={`purchases.${index}.price`}
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
								placeholderTextColor={getThemeColor('placeholder')}
							/>
						)}
					/>
					<Text style={styles.label}>{t('newItem.dateInput.label')}</Text>
					<Controller
						name={`purchases.${index}.date`}
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={{ ...styles.input, color: getThemeColor('text') }}
								placeholder={t('newItem.dateInput.placeholder')}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value?.toString()}
								placeholderTextColor={getThemeColor('placeholder')}
							/>
						)}
					/>

					<Text style={styles.label}>{t('newItem.noteInput.label')}</Text>
					<Controller
						name={`purchases.${index}.note`}
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={{ ...styles.input, color: getThemeColor('text') }}
								placeholder={t('newItem.noteInput.placeholder')}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value?.toString()}
								placeholderTextColor={getThemeColor('placeholder')}
							/>
						)}
					/>
				</View>
			))}

			{/* <Button title="Open" onPress={() => setOpen(true)} /> */}
			{/* <DatePicker date={date} onDateChange={setDate} /> */}
			<Button
				onPress={addPurchase}
				title={t('newItem.addPurchase')}
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
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
	screenWrapper: {
		flex: 1,
		padding: 20,
	},
	purchaseTitleContainer: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	purchaseTitle: {
		fontSize: 25,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	input: {
		alignSelf: 'stretch',
		fontSize: 16,
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
