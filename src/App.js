import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch, connect} from 'react-redux';

import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SingUp from './screens/SingUp';
import Home from './screens/Home';
import CustomHeader from './Layout/CustomHeader';

import {SET_USER, IS_AUTHENTICATED} from './action/action.types';
import EmptyContainer from './components/EmptyContainer';
import {requestPermissions} from './utils/AskPermission';
import {Fragment} from 'react';

const Stack = createStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          console.log('User value from database', snapshot.val());

          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermissions();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.loading) {
    return <EmptyContainer />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: props => <CustomHeader {...props} />,
        }}>
        {authState.isAuthenticated ? (
          <Fragment>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPost" component={AddPost} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);
