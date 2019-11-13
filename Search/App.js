import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SearchScreen from './source/screens/search-screen';
import ProfileScreen from './source/screens/profile-screen';

const AppNavigator = createStackNavigator({
    Search: { screen: SearchScreen },
    Profile: { screen: ProfileScreen }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    // test commit
    // test commit23

    render() {
        return (
            <AppContainer />
        )
    }
}