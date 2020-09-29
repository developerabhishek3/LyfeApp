import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';

import {Logout } from '../../../Api/afterAuth';                     

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {

    // this.LogoutFunction();

    setTimeout(() => {
      this.props.navigation.replace('welcome2');
    }, 3000);
  }
  LogoutFunction = async () => {
    const LogoutResponse = await Logout();
    if(LogoutResponse.result === true) {
        console.log("getting logout response---------------",LogoutResponse.response)
        if(LogoutResponse.response.status  === true){
          setTimeout(() => {
            this.props.navigation.replace('welcome');
          }, 1000);
        }
        else{
          this.props.navigation.navigate("login")
        }        
        // Alert.alert("Message","Logout Sucessfully !")
    }
    else{
        console.log("getting error on logout -------------",LogoutResponse.error)
    }        
    // console.log("getting country response----------------",countryData.country_list)
  };


  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../../assets/newsplash.png')}
          // source={require('../../assets/splash.png')}
        >
          <Image resizeMode="contain" style={{justifyContent:'center',alignSelf:'center',height:SCREEN_HEIGHT/5,width:'65%'}}
            source={require('../../../assets/logo3.png')}

          />
          <Text
           style= {{
              color:'#A9A9A9',
              textAlign:'center',
                fontSize:18,
                fontWeight:'700',
                marginTop:-20,
                marginBottom:40,
                fontFamily:'Montserrat-Regular'
            }}
          >
            Live your best healthy life 
          </Text>

        </ImageBackground>
      </View>
    );
  }
}
