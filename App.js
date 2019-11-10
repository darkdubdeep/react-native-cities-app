/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    AsyncStorage
} from 'react-native';

import Tabs from './src';

const key = 'state';

class App extends Component {
    state = {
        cities: []
    };

    async componentDidMount() {
        try {
            let cities = await AsyncStorage.getItem(key);
            cities = JSON.parse(cities);
            if (cities) {
                this.setState({ cities });
            }
        } catch (e) {
            console.log('error from Assunc Storafe', e);
        }
        console.log('cities on load', this.state.cities);
    }

    addCity = city => {
        const cities = this.state.cities;
        cities.push(city);
        this.setState({ cities });
        AsyncStorage.setItem(key, JSON.stringify(cities))
            .then(() => console.log('storage updated'))
            .catch(e => console.log(e));
    };

    addLocation = (location, city) => {
        const index = this.state.cities.findIndex(item => {
            return item.id === city.id;
        });
        const chosenCity = this.state.cities[index];
        chosenCity.locations.push(location);
        const cities = [
            ...this.state.cities.slice(0, index),
            chosenCity,
            ...this.state.cities.slice(index + 1)
        ];
        this.setState(
            {
                cities
            },
            () => {
                AsyncStorage.setItem(key, JSON.stringify(cities))
                    .then(() => console.log('storage updated'))
                    .catch(e => console.log('e: ', e));
            }
        );
    };

    render() {
        return (
            <Tabs
                screenProps={{
                    cities: this.state.cities,
                    addCity: this.addCity,
                    addLocation: this.addLocation
                }}
            />
        );
    }
}

const styles = StyleSheet.create({});

export default App;
