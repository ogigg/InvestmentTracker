import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import { Text, useThemeColor, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import React from 'react';
import { Input } from 'react-native-elements';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InvestmentItem } from '../models/Item.model';

export default function AddNewItem({ navigation }:  RootStackScreenProps<'AddNewItem'>) {
    const { control, handleSubmit, formState: { errors } } = useForm<InvestmentItem>();
    const textColor = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    const onSubmit = async (form: any) => {
        const storedItems = await AsyncStorage.getItem('items')
        const newItemsArray = storedItems? JSON.parse(storedItems) : []
        newItemsArray.push(form);
        await AsyncStorage.setItem('items', JSON.stringify(newItemsArray))
        navigation.replace('Root');
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('newItem.header')}</Text>
      <Controller
      name="name"
      control={control}
      rules={{
       required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
            inputStyle={{ color: textColor }}
            label={t('newItem.cryptoInput.label')}
            placeholder={t('newItem.cryptoInput.placeholder')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
        />  
      )}
    />
      <Controller
      name="amount"
      control={control}
      rules={{
       required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
            keyboardType="numeric"
            inputStyle={{ color: textColor }}
            label={t('newItem.amountInput.label')}
            placeholder={t('newItem.amountInput.placeholder')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
        />  
      )}
    />
      <Controller
      name="price"
      control={control}
      rules={{
       required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
            keyboardType="numeric"
            inputStyle={{ color: textColor }}
            label={t('newItem.priceInput.label')}
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
        backgroundColor:'red'
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
});
