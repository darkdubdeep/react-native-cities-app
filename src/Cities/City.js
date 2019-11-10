import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';

const styles = StyleSheet.create({
    cityContainer: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary
    },
    city: {
        fontSize: 20,
        color: 'black'
    },
    locationName: {
        fontSize: 20,
        color: 'white'
    },
    locationInfo: {
        fontSize: 15,
        color: 'white'
    },
    country: {
        color: 'rgba(0, 0, 0, .5)'
    },
    mainView: {
        backgroundColor: colors.primary
    }
});

class City extends Component {
    static navigationOptions = props => {
        const { city } = props.navigation.state.params;
        return {
            title: city.city,
            headerTitleStyle: {
                color: 'black',
                marginLeft: 0,
                marginRight: 0,
                height: '100%',
                textAlign: 'center',
                flex: 1,
                fontSize: 20,
                fontWeight: '400'
            }
        };
    };

    state = {
        name: '',
        info: ''
    };
    onChangeText = (key, value) => {
        this.setState({ [key]: value });
    };

    addLocation = () => {
        if (this.state.name === '' || this.state.info === '') return;
        const { city } = this.props.navigation.state.params;
        const location = {
            name: this.state.name,
            info: this.state.info
        };
        this.props.screenProps.addLocation(location, city);
        this.setState({ name: '', info: '' });
    };

    render() {
        const { city } = this.props.navigation.state.params;
        console.log(city);
        return (
            <View style={styles.mainView}>
                <ScrollView>
                    <View
                        style={[
                            styles.locationsContainer,
                            !city.locations.length && {
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        {!city.locations.length && (
                            <CenterMessage message='No locations fro this city' />
                        )}
                        {city.locations.map((location, index) => {
                            return (
                                <View
                                    key={index}
                                    style={styles.locationsContainer}
                                >
                                    <Text style={styles.locationName}>
                                        {location.name}
                                    </Text>
                                    <Text style={styles.locationInfo}>
                                        {location.info}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <TextInput
                    onChangeText={val => this.onChangeText('name', val)}
                    placeholder='location name'
                    value={this.state.name}
                    style={styles.input}
                    placeholderTextColor='white'
                />
                <TextInput
                    onChangeText={val => this.onChangeText('info', val)}
                    placeholder='location info'
                    value={this.state.info}
                    style={[styles.input, styles.input2]}
                    placeholderTextColor='white'
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.addLocation}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add Location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default City;
