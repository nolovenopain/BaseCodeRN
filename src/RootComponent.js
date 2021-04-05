/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AppNavigation from './Navigators/AppNavigation';
import store from './Redux/Store/store';
import { checkInternetConnection } from './Redux/Action/globalAction';
 
export default class RootComponent extends Component {
 
     _isMounted = false;
     NetInfoSubcribtion = null;
     
     constructor(props) {
         super(props);
         this.state = {

         };
     }
 
     componentDidMount() {
         this._isMounted = true;
         if(this._isMounted) { 
             this.NetInfoSubcribtion = NetInfo.addEventListener(
                 this.handleConnectivity
             )
         }
     }
 
    componentWillUnmount() {
         this._isMounted = false
         this.NetInfoSubcribtion && this.NetInfoSubcribtion()
    }
 
    handleConnectivity = state => {
        store.dispatch(checkInternetConnection(state.isInternetReachable))
    }
 
    shouldComponentUpdate(nextState, nextProps) {
         if(this.state.modalInternetConnectionVisible != nextState.modalInternetConnectionVisible ) {
             return true
         }
         return false
    }
     
 
     render() { console.log(console.log(!store.getState().global.isLoading))
         return (
             <>
                <AppNavigation/>
             </>
         );
     }  
 }
