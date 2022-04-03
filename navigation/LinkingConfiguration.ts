/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.makeUrl('/')],
	config: {
		screens: {
			Root: {
				screens: {
					Dashboard: {
						screens: {
							DashboardScreen: 'dashboard',
						},
					},
					AddNewItem: {
						screens: {
							AddNewItemScreen: 'addNewItem',
						},
					},
					ItemDetails: {
						screens: {
							ItemDetailsScreen: 'ItemDetails',
						},
					},
				},
			},
			Modal: 'modal',
			NotFound: '*',
		},
	},
};

export default linking;
