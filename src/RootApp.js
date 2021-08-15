import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import store from './store'
import { Provider } from 'react-redux'
import App from './App'

const RootApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default RootApp

const styles = StyleSheet.create({})
