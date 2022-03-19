import { Alert, Button, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { t } from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React, { useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvestmentItem, InvestmentItemDropdown } from '../models/Item.model';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { availableCryptoCoins } from '../constants/AvailableCrypto';
import { getThemeColor } from '../hooks/useThemeColor';
import Colors from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddNewItem({ navigation }: RootStackScreenProps<'AddNewItem'>) {
	const { setValue, control, handleSubmit } = useForm<InvestmentItem>();

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

	useEffect(() => {
		addPurchase();
	}, []);

	const onSubmit = async (form: InvestmentItem) => {
		console.log(form);
		console.log(fields);
		Alert.alert('test');
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

	const [shownDatepickerIndex, setShownDatepickerIndex] = useState(-1);

	const onChange = (selectedDate: Date, index: number): void => {
		if (selectedDate) {
			setValue(`purchases.${index}.date`, selectedDate);
		}
		hideDatePicker();
	};

	const showDatepicker = (index: number) => {
		setShownDatepickerIndex(index);
	};

	const hideDatePicker = () => {
		setShownDatepickerIndex(-1);
	};

	const removeDate = (index: number) => {
		setValue(`purchases.${index}.date`, undefined);
	};

	return (
		<ScrollView style={styles.screenWrapper}>
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
						{fields.length > 1 && (
							<Button
								onPress={() => removePurchase(index)}
								title={t('newItem.removePurchase')}
								color={Colors.light.buttonText}
								accessibilityLabel="Remove purchase"
							/>
						)}
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
							required: false,
						}}
						render={({ field: { value } }) => (
							<View style={styles.datePicker}>
								<View style={styles.dateInput}>
									<Text>{value?.toDateString()}</Text>
									{value && <Button title={'X'} onPress={() => removeDate(index)} />}
								</View>

								<Button
									title={t('newItem.dateInput.button')}
									onPress={() => showDatepicker(index)}
								/>
								<DateTimePickerModal
									isVisible={shownDatepickerIndex === index}
									mode="date"
									onConfirm={(date) => onChange(date, index)}
									onCancel={hideDatePicker}
								/>
							</View>
						)}
					/>

					<Text style={styles.label}>{t('newItem.noteInput.label')}</Text>
					<Controller
						name={`purchases.${index}.note`}
						control={control}
						rules={{
							required: false,
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

			<Button
				onPress={addPurchase}
				title={t('newItem.addPurchase')}
				color={Colors.light.buttonText}
				accessibilityLabel="Learn more about this purple button"
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				title={t('newItem.save')}
				color={Colors.light.buttonText}
				accessibilityLabel="Learn more about this purple button"
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		padding: 20,
		flexGrow: 1,
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
	datePicker: {
		flex: 1,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	dateInput: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexGrow: 1,
		marginRight: 4,
	},
});
