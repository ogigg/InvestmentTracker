import Colors from '../constants/Colors';
import useColorScheme from './useColorScheme';

export function getThemeColor(type: keyof typeof Colors.dark): string {
	const theme = useColorScheme();
	return Colors[theme][type];
}
