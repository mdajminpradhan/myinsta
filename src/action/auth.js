import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const SignUp = data => async dispatch => {
  console.log(data);

  const {name, instaUsername, bio, email, password, country, image} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);

      database()
        .ref('/users/', data.user.uid)
        .set({name, instaUsername, country, image, bio, uid: data.user.uid})
        .then(() => {
          console.log('Account created successfully...');
        });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'Account creation failed...',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const SignIn = data => async dispatch => {
  console.log(data);

  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Account login successfully');
      Snackbar.show({
        text: 'Account login failed...',
        textColor: 'white',
        backgroundColor: '#00ee9f',
      });
    })
    .catch(error => {
      console.log('Error');
      Snackbar.show({
        text: 'Account login failed...',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const SignOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'Account login failed...',
        textColor: 'white',
        backgroundColor: 'red',
      });
    })
    .catch(error => {
      console.log('Signout failed...');
      Snackbar.show({
        text: 'Signout failed...',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
