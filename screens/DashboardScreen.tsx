import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React from 'react';

export default function DashboardScreen({ navigation }: RootTabScreenProps<'Dashboard'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('dashboard.welcome')}</Text>
      <Button
        onPress={() => navigation.navigate('Modal')}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
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
});
