import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { getThemeColor } from '../../hooks/useThemeColor';

export default function StyledBox(props) {
	return (
		<View
			style={{ ...styles.wrapper, backgroundColor: getThemeColor('secondary'), ...props.style }}>
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 10,
		padding: 20,
	},
});
