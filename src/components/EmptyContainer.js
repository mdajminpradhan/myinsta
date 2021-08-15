import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Spinner } from 'native-base'

const EmptyContainer = () => {
    return (
        <Container>
            <Spinner />
        </Container>
    )
}

export default EmptyContainer

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        backgroundColor: '#1b262c',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
