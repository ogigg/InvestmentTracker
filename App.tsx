import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './assets/languages/en.json';
import React from 'react';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	i18n.fallbacks = true;
	i18n.translations = { en };
	i18n.locale = Localization.locale;

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
