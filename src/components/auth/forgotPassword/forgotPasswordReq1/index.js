import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
BackHandler 
} from 'react-native';
import styles from './indexCss';
//import bgimg from '../../../assets/login.png';
import Spinner from 'react-native-loading-spinner-overlay';
import bgimg from '../../../../assets/login.png';


var uuid = require('react-native-uuid');
import {  ForgotPassword1 } from '../../../../Api/auth'
// import uuid from 'reacr-native-uuid'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      spinner: false,
    };    
  }

componentDidMount() {   
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));   
}

componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
}
    
handleBackButton=(nav)=> {
      if(!nav.isFocused()) {
        BackHandler.removeEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
        return false;
      }else{
        nav.goBack();
        return true;
      }
}

  forgotPasswordReq1 = async () => {
    // console.log("getting inside the function uuid --------",this.state.device_token)
    const {   
    email,     
   } = this.state;
    const forgotPasswordResponse = await ForgotPassword1({    
      email,  
    });
    if (forgotPasswordResponse.result === true) {
      console.log("getting result here --------",forgotPasswordResponse.response) 
      console.log("getting result here --------",forgotPasswordResponse.response.message)       
      if(forgotPasswordResponse.response.status === true){
        this.props.navigation.navigate("forgotpassword2",)
      }
      else{
        Alert.alert("Message",forgotPasswordResponse.response.message)
      }      
    } else {
      this.myAlert('Error', forgotPasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };
  validateUser = () => {
    const {email, password} = this.state;

    if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid Email-Id');
        return false;
      }
      this.forgotPasswordReq1();
    }
  };

  render() {

    return (
      <View style={styles.container} > 
         <Spinner visible={this.state.spinner} />   
        <StatusBar
          barStyle="#FFFFFF"
          hidden={false}
          backgroundColor="#B87548"
          translucent={true}
        /> 
        <ImageBackground
          resizeMode="stretch"
          source={bgimg}
          style={styles.bgImgStyle}
         >
          <Text style={styles.headerTxt}>FORGOT PASSWORD!</Text>
        
          <View style={styles.txtInputView}>
          
            <TextInput style={styles.txtInput} placeholder="Email"
               autoCapitalize="none"
               onChangeText={(email) => this.setState({ email })}
            />
           
            <TouchableOpacity style={styles.loginBtn}
              onPress={()=>{this.validateUser()}}
            >
              <Text style={styles.loginBtnTxt}>Forgot Password</Text>
            </TouchableOpacity>

          </View>         
        </ImageBackground>
      </View>
    );
  }
}
