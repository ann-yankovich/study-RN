import React, { Component } from 'react';
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

import Item from './source/item';

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
    }
});

export default class SearchApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            users: []
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers = () => {
        let { users, isLoading } = this.state;

        if (isLoading) {
            return false;
        }

        return fetch(`https://api.dating.com/users?filter=photos&gender=fem&k=1&omit=${users.length}&preferences.gender=mal&q=1&seed=7&select=${USERS_COUNT}&sort=7`)
            .then((response) => response.json())
            .then((response) => {
                // let users = this.state.users;
                let nextUsers = response.map(item => {
                    item.key = item.id;
                    return item;
                });

                console.log(response.map(item => {
                    return item.id;
                }).join(','));

                this.setState({
                    isLoading: false,
                    users: [...users, ...nextUsers]
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    renderItem = ({item}) => {
        const { id } = item;
        // console.log(id);

        return <Item key={id} {...item} />
    }

    showMore = () => {
        this.setState({
            isLoading: true
        });

        this.getUsers();
    }

    render() {
        const { isLoading, users } = this.state;

        console.log(users.length);


        return (
            <ScrollView>
                {isLoading && <ActivityIndicator/>}

                <FlatList data={users} renderItem={this.renderItem}/>

                <TouchableOpacity style={styles.button} onPress={this.showMore}>
                    <Text style={styles.buttonText}> Show More </Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}
