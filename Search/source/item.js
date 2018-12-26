import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const styles = StyleSheet.create({
    name: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        textAlign: 'center'
    }
});

export default class Item extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    render() {
        const {id, name, thumbnail} = this.props;

        return (
            <View>
                <Image source={{uri: `https://api.dating.com/users/${id}/photos/${thumbnail}.300x300.thumb-fd`}} style={{width: '100%', height: 300}} />
                <Text style={styles.name}>{name}</Text>
            </View>
        );
    }
}
