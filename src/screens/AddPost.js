import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {StyleSheet, ScrollView, Image} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  H3,
  Textarea,
  Icon,
} from 'native-base';

import Snacbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';

import propTypes from 'prop-types';
import {AddPost} from '../action/post';
import {connect} from 'react-redux';

const AddPost = ({navigation, userState}) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response image ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        console.log(response);

        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageUploading(true);

    const reference = storage().ref(response.filename);

    const task = reference.putFile(response.path);

    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;

      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const AddPost = async () => {
      //
  }

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {image && (
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="center"
            />
          )}
          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="location"
                value={location}
                style={{color: '#eee'}}
                onChangeText={text => setLocation(text)}
              />
            </Item>

            {imageUploading ? (
              <ProgressBar progress={uploadStatus} style={styles.progress} />
            ) : (
              <Button
                regular
                bordered
                block
                iconLeft
                info
                style={styles.formItem}
                onPress={chooseImage}>
                <Icon
                  name="md-image-outline"
                  type="Ionicons"
                  style={styles.icon}
                />
                <Text
                  style={{
                    color: '#fdcb9e',
                  }}>
                  Choose Image
                </Text>
              </Button>
            )}

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={{color: '#eee'}}
                onChangeText={text => setDescription(text)}
              />
            </Item>

            <Button regular block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
    userState: state.auth.user
})

const mapDispatchToProps = {

}

AddPost.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: {
    marginBottom: 20,
  },
  icon: {fontSize: 20, color: '#fdcb9e'},
  image: {width: null, height: 150, marginVertical: 15},
  progress: {width: null, marginBottom: 20},
});
