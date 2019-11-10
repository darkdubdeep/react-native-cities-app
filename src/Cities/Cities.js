import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import CenteredMessage from '../components/CenterMessage';

import { colors } from '../theme';
import DrawerNav from '../DrawerPages/DrawerNav';

class Cities extends Component {
    static navigationOptions = {
        title: 'Cities',
        headerTitleStyle: {
            color: 'white',
            marginLeft: 0,
            marginRight: 0,
            height: '100%',
            textAlign: 'center',
            flex: 1,
            fontSize: 20,
            fontWeight: '400',
            backgroundColor: colors.primary
        }
    };

    navigate = item => {
        this.props.navigation.navigate('City', { city: item });
    };
    render() {
        const {
            screenProps: { cities }
        } = this.props;
        console.log('cities', cities);
        return (
            <SafeAreaView>
                <ScrollView>
                    {/* <DrawerNav /> */}
                    <View
                        style={[
                            !cities.length && {
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        {!cities.length && (
                            <CenteredMessage message='No saved cities' />
                        )}
                        {cities.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => this.navigate(item)}
                                    key={index}
                                >
                                    <View style={styles.cityContainer}>
                                        <Text style={styles.city}>
                                            {item.city}
                                        </Text>
                                        <Text style={styles.country}>
                                            {item.country}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

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
    country: {
        color: 'rgba(0,0,0,0.5)'
    }
});

export default Cities;
