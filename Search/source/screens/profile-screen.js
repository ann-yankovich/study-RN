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

import Presense from '../components/presense-indicator';
import Gallery from '../components/gallery';

const styles = StyleSheet.create({
	nameWrapper: {
		position: 'absolute',
		bottom: 10,
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		paddingVertical: 5,
		paddingHorizontal: 10,
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	name: {
		fontWeight: 'bold',
		fontSize: 30,
		color: '#fff',
	},
	about: {
		padding: 10,
		fontSize: 18,
		color: '#222'
	}
});

export class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('name')
		};
	};

	constructor(props){
		super(props);

		this.state = {}
	}

	render() {
		const { id, name, thumbnail, about, birthday, photos, status } = this.props.navigation.state.params;

		return (
			<ScrollView>
				<View>
					<Image
						source={{uri: `https://api.dating.com/users/${id}/photos/${thumbnail}.500x500.thumb-fd`}}
						resizeMode='cover'
						style={{width: '100%', height: 500}}
					/>
					<View style={styles.nameWrapper}>
						<Text style={styles.name}>
							{`${name.trim()}, ${birthday.age}`}
						</Text>
						<Presense style={styles.presence} status={status} />
					</View>
				</View>

				<Text style={styles.about}>{about.trim()}</Text>

				<Gallery id={id} photos={photos} />
			</ScrollView>
		);
	}
}

export default ProfileScreen;
