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
import insta from '../../../assets/icon/4.png';
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
        }, 200);                      
      }
      setTimeout(()=>{
        this.setState({ isLoading: false });
      },300);
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
      <Fragment >
           {
         !isLoading &&  
      <View style={styles.container}>
         <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
          backgroundColor="#B87548"
          translucent={true}
        /> 
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
       
          <View style={styles.contentView}>
            <Fragment>
       
            <Image resizeMode="contain" source={logo} style={styles.imgView} />
            <Text style={styles.imgTextView}>Welcome !</Text>

            <View style={styles.textContent}>
              <Text style={styles.textContentnormal}>                
                To Subscribe you need to have at
              </Text>
              <View style={styles.textContent2}>
                <Text style={styles.textContentnormal}>least</Text>
                <Text style={styles.textContentspecial}>5000 followers</Text>
                <Text style={styles.textContentnormal}>on</Text>
                <Text style={styles.textContentspecial}>instagram.</Text>
              </View>
            </View>
            <View>
                <Image source={insta}   style={styles.instaImgStyle} />
            </View>
            <Text style={styles.areYouReadyStyle}>Are you ready?</Text>  
            <TouchableOpacity
                style={styles.loginBtn}

                onPress={() => {
                  this.props.navigation.navigate('login');
                }}
            >          
            <Text style={styles.loginBtnTxt}>Let's go!</Text>           
            </TouchableOpacity>

            </Fragment>
          </View>
     
        </ImageBackground>
      </View>
      }
      </Fragment>
    );
  }
}
