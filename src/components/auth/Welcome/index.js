import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import styles from './indexCss';
import bgimg from '../../../assets/welcome.png';

import logo from '../../../assets/logo3.png';
import AsyncStorage from '@react-native-community/async-storage';
import { loginToken } from '../../../Api/afterAuth'
export default class index extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true
    }
  }
  async componentDidMount(){
    try{
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';
      if(userLoggedIn == 'true'){
        this.fetchTokenData() 
        setTimeout(() => {          
          this.props.navigation.navigate('Home');           
        }, 500);                      
      }
      setTimeout(()=>{
        this.setState({ isLoading: false });
      },700);
    }catch(error){

    }
}





fetchTokenData = async () => {
  const LoginTokenResponse = await loginToken();
  if (LoginTokenResponse.result == true) {    
    if(LoginTokenResponse.response.my_token != ""){    
      let keys = ['token'];
      AsyncStorage.multiRemove(keys)   
      await AsyncStorage.setItem("token",JSON.stringify(LoginTokenResponse.response.my_token));
      console.log("getting inside the follow condition------------")
    }
    else{     
      this.setState({isLoading:false})
      setTimeout(() => {
        this.props.navigation.navigate("login")   
      }, 300);
     
      console.log("getting inside the else constion condition------------")
    }
    console.log("gettin response here-----------",LoginTokenResponse.response)
    // await AsyncStorage.setItem("token",JSON.stringify(LoginTokenResponse.response));
  }
  else{
    console.log("---------------------------------------------",LoginTokenResponse.error)
  }
};



  render() {
    const { 
      isLoading
    } = this.state;
    return (
     <Fragment>
       {
         !isLoading &&  <View style={styles.container}>         
          <StatusBar backgroundColor="#B87548" />        
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
          <View style={styles.contentView}>
            <View style={styles.header}>
              <Image
                resizeMode="contain"
                source={logo}
                style={styles.imgView}
              />
              <Text style={styles.imgTextView}>
                Live your best healthy life
              </Text>
            </View>

            <View style={styles.headerTextView}>
              <Text style={styles.textView}>
                The plateform that conects you with your
              </Text>
              <Text style={styles.textView}>
                favorite wellness addresses and service{' '}
              </Text>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  this.props.navigation.navigate('login');
                }}>
                <Text style={styles.BtnTxt}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  this.props.navigation.navigate('welcome2');
                }}>
                <Text style={styles.BtnTxt}> Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
       }
     </Fragment>
    );
  }
}
