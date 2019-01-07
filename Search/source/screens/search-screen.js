import React, { Component } from 'react';
import { Navigation } from 'react-navigation';

import {
	View,
	ActivityIndicator,
	Button,
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

// import api from '@sdv/api';
import SearchItem from '../components/search-item';

const USERS_COUNT = 10;

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#d5232f'
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30,
		textAlign: 'center'
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		position: 'absolute',
		top: 140,
		width: '100%'
	}
});

export class SearchScreen extends Component {
	static navigationOptions = {
		title: 'Search',
	};

	constructor(props){
		super(props);

		this.state = {
			isLoading: false,
			users: []
		}
	}

	componentDidMount(){
		this.setState({
			isLoading: true
		});
		this.getUsers();
	}

	getUsers = () => {
		let { users, isLoading } = this.state;

		if (isLoading) {
			return false;
		}

		let params = {
			filter: 'photos',
			gender: 'fem',
			k: 1,
			omit: users.length,
			'preferences.gender': 'mal',
			q: 1,
			seed: 7,
			select: USERS_COUNT,
			sort: 7
		};

		// api.users.search(params, resp => {
		// });

		return fetch(`https://api.dating.com/users?` + Object.keys(params).map(item => {
			return `${item}=${params[item]}`
		}).join('&'))
			.then((response) => response.json())
			.then((response) => {
				let nextUsers = response.map(item => {
					item.key = item.id;
					return item;
				});

				this.setState({
					isLoading: false,
					users: [...users, ...nextUsers]
				});

			})
			.catch((error) =>{
				console.error(error);
			});
	}

	renderItem = ({ item }) => {
		const { id } = item;
		const { navigate } = this.props.navigation;

		return <SearchItem
					key={id}
					onPress={navigate}
					user={item}
				/>
	}

	showMore = () => {
		this.setState({
			isLoading: true
		});

		this.getUsers();
	}

	render() {
		const { isLoading, users } = this.state;

		return (
			<View>
				<ScrollView>

					<FlatList data={users} renderItem={this.renderItem}/>

					<TouchableOpacity style={styles.button} onPress={this.showMore}>
						<Text style={styles.buttonText}> Show More </Text>
					</TouchableOpacity>

				</ScrollView>

				{ isLoading &&
					<View style={styles.loader}>
						<ActivityIndicator size="large" color="#d5232f" animating={true} />
					</View>
				}
			</View>
		);
	}
}

export default SearchScreen;
