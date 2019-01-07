import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text } from 'react-native';

import Presense from './presense-indicator';

const styles = StyleSheet.create({
    nameWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        paddingRight: 10
    }
});

export default class SearchItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    onPress = () => {
        this.props.onPress('Profile', {...this.props.user});
    }

    render() {
        const { id, name, thumbnail, status } = this.props.user;

        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <Image
                        source={{uri: `https://api.dating.com/users/${id}/photos/${thumbnail}.500x500.thumb-fd`}}
                        resizeMode='cover'
                        style={{width: '100%', height: 400}}
                    />
                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>{name.trim()}</Text>
                        <Presense style={styles.presence} status={status} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
