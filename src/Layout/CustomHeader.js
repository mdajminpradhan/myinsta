import React from 'react'
import { Text, View } from 'react-native'
import { Header, Body, Right, Button, Icon, Title, Text } from 'native-base'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import {SignOut} from '../action/auth'

const CustomHeader = ({SignOut, authState, navigation}) => {
    return (
        <Header
        androidStatusBarColor="#0f4c75"
        style={{backgroundColor: '#0f4c75'}}
        >
            <Body>myInsta</Body>
            <Right>
                {authState.isAuthenticated && (
                    <Fragment>
                        <Button
                        transparent
                        iconLeft
                        onPress={() => navigation.navigate('AddPost')}
                        >
                            <Text style={{color: '#fdcb9c'}}>Add Post</Text>
                        </Button>
                        <Button
                        transparent
                        onPress={() => SignOut()}
                        >
                            <Icon name="log-out-outline" style={{color: 'red'}} />
                        </Button>
                    </Fragment>
                )}
            </Right>
        </Header>
    )
}

const mapStateToProps = state => ({
    authState: state.auth
})


const mapDispatchToProps = {
    SignOut
  }

CustomHeader.propTypes = {
    SignOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)