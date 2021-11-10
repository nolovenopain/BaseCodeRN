import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { translate } from '../Language';
import { changeLanguage, sleep, toggleLoading } from '../Utils/extends';

class _Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false
        };
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad = async() => {
        toggleLoading(true)
        await sleep(1000)
        toggleLoading(false)
    }

    toggleSwitch = () => {
        if(this.state.isEnabled) {
            changeLanguage('vi', true)
            this.setState({ isEnabled: false })
        }
        else {
            changeLanguage('en', true)
            this.setState({ isEnabled: true })
        }
    }

    render() { 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text> {translate('name', this.props.settings.language)} </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleSwitch}
                    value={this.state.isEnabled}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings
})

const Home = connect(mapStateToProps, { changeLanguage })(_Home)

export default Home
