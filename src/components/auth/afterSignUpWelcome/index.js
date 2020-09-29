import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './indexCss';
import bgimg from '../../../assets/welcome.png';

import logo from '../../../assets/logo3.png';
import insta from '../../../assets/icon/4.png';

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
          <View style={styles.contentView}>
            <Image resizeMode="contain" source={logo} style={styles.imgView} />
            <Text style={styles.headertxtView}>
              Live your best healthy life
            </Text>

            <Text style={styles.imgTextView}>Thanks!</Text>

            <View style={styles.textContent}>
              <Text style={styles.textContentnormal}>
                We have registered your subscription
              </Text>
              <Text style={styles.textContentnormal}>
                We are going to analyze your profile
              </Text>
              <Text style={styles.textContentnormal}>
                and get back to you asap at
              </Text>
              <Text style={styles.emailTxtStyle}>
                John@gmail.com
              </Text>
            </View>

            <Text style={styles.seeYouSoonStyle}>See you soon on?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('continueaftersignup');
              }}>
              <Text style={styles.influeanceStyle}>The Lyfe influence</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
