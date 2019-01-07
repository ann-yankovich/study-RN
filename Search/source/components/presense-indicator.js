import React, { Component } from 'react';
import {
	View,
	Modal,
	ScrollView,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
	indicator: {
		width: 20,
		height: 20,
		borderRadius: 20
	},
	online: {
		backgroundColor: '#009f83'
	},
	offline: {
		backgroundColor: '#b6b6b6'
	}
});

export class PresenceIndicator extends Component {

	render() {
		const { status } = this.props;

		return (
			<View>
				<View style={[styles.indicator, status ? styles.online : styles.offline]} />
			</View>
		);
	}
}

export default PresenceIndicator;
