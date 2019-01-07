import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	ActivityIndicator,
	Image,
	Modal,
	TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
	loader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -10,
		marginLeft: -10,
	}
});

export class Gallery extends Component {

	constructor(props){
		super(props);

		this.state = {
			openedItem: false,
			isLoadingModal: false
		}
	}

	toggleModal = (src) => {
		this.setState({
			openedItem: src
		})
	}

	render() {
		const { openedItem, isLoadingModal } = this.state;
		const { id, photos } = this.props;

		return (
			<View>
				<ScrollView horizontal={true}>
					{photos.map((photo, index) => {
						return (
							<TouchableOpacity
								key={`${photo}-${index}`}
								onPress={() => {
									this.toggleModal(`https://api.dating.com/users/${id}/photos/${photo}.600x600.thumb-fd`)
								}}>
								<Image
									style={{ width: 180, height: 180, }}
									resizeMode='cover'
									source={{ uri: `https://api.dating.com/users/${id}/photos/${photo}.180x180.thumb-fd` }}
								/>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
				<Modal
					animationType="slide"
					transparent={false}
					visible={!!openedItem}>
					<TouchableOpacity onPress={() => {
						this.toggleModal(false)
					}}>
						<Image
							onLoadStart={(e) => {
								this.setState({isLoadingModal: true});
							}}
							onLoadEnd={(e) => {
								this.setState({isLoadingModal: false});
							}}
							resizeMode='contain'
							style={{
								width: '100%',
								height: '100%',
							}}
							source={{ uri: openedItem || '' }}
						/>
					</TouchableOpacity>
					{isLoadingModal &&
						<ActivityIndicator
							style={styles.loader}
							size="large"
							color="#d5232f"
							animating={true}
						/>
					}
				</Modal>
			</View>
		);
	}
}

export default Gallery;
