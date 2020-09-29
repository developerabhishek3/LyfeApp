import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  RefreshControl
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Back from '../../../../../assets/icon/back.png';
import edit from '../../../../../assets/icon/edit.png';
import profileImage from '../../../../../assets/icon/profileImage.png';
import calenderIcon from '../../../../../assets/icon/26.png'
import FloatingLabel from 'react-native-floating-labels';
import {updateUserProfile,UserProfile } from '../../../../../Api/afterAuth'
import styles from './indexCss';
import {TextInput} from 'react-native-gesture-handler';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2016-12-31 ,select date',
      instagram_username: '',
      first_name: '',
      last_name: '',
      password: '',
      telephone_no: '',
      birth_date: '1990-05-15',
      address: '',
      postcode: '',
      city: '',
      country: '',
    };
  }






  userProfileFunction = async () => {
    const UserProfileResponse = await UserProfile();
    
    if(UserProfileResponse.result === true) {
        console.log("getting update response---------------",UserProfileResponse.response) 
        console.log("getting response herr------------",UserProfileResponse.response)
        // var UserDetails = UserProfileResponse.response.my_profile
        // this.setState({ isBodyLoaded: true,isSpinner: false,UserDetails})
    }             
    else{
      console.log("getting response here-------------",UserProfileResponse.error)
    }
  };

  updateUserProfileFunction = async () => {
    this.setState({spinner: true});
    const {
      instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    } = this.state;
    const updateUserProfileResponse = await updateUserProfile({
      instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    });
    if (updateUserProfileResponse.result === true) {
      console.log('getting result here --------', updateUserProfileResponse.response);
      if(updateUserProfileResponse.response.status === true){
        console.log(
          'getting result here --------',
          updateUserProfileResponse.response.message,
        );
        Alert.alert('Message', updateUserProfileResponse.response.message);
        setTimeout(() => {
          this.userProfileFunction()
          this.props.navigation.navigate("Home")
        }, 300);
      
      }
      else{
        Alert.alert("Message", updateUserProfileResponse.response.message)
      }
    
    } else {
      this.myAlert('Error', updateUserProfileResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {
      instagram_username,
      first_name,
      last_name,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
    } = this.state;
    if (instagram_username.length === 0) {
      this.myAlert('Message', 'Please enter your instagram_username');
    } else if (first_name.length === 0) {
      this.myAlert('Message', 'Please enter your first_name');
    } else if (last_name.length === 0) {
      this.myAlert('Message', 'Please enter your last_name');
    } else if (telephone_no.length === 0) {
      this.myAlert('Message', 'Please enter your telephone_no');
    } else if (birth_date.length === 0) {
      this.myAlert('Message', 'Please enter your birth_date');
    } else if (address.length === 0) {
      this.myAlert('Message', 'Please enter your address');
    } else if (postcode.length === 0) {
      this.myAlert('Message', 'Please enter your postcode');
    } else if (city.length === 0) {
      this.myAlert('Message', 'Please enter your city');
    } else if (country.length === 0) {
      this.myAlert('Message', 'Please enter your country');
    } else {
      const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      if (!telephone_no.match(mobileformat)) {
        this.myAlert('Message', 'Invalid telephone_no');
        return false;
      }
      this.updateUserProfileFunction();
    }
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Back} style={styles.headerImgView} />
          </TouchableOpacity>
          <Text style={styles.headerTextView}>My Profile</Text>
          <Text style={styles.headerTextView}> </Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.ImageView}>
            <Image source={profileImage} style={styles.imgStyle} />
          </View>

          <ScrollView >
            <View style={styles.contentContainerView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="UserName"
                onChangeText={(instagram_username) =>
                  this.setState({instagram_username})
                }
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Name"
                onChangeText={(first_name) => this.setState({first_name})}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="SurName"
                onChangeText={(last_name) => this.setState({last_name})}
              />
              <View style={styles.textInputStyle}>
                <DatePicker
                  style={{width: 300}}
                  date={this.state.date}
                  placeholder="Date of Birth                           "
                  mode="date"
                  format="YYYY-MM-DD"
                  minDate="1990-05-01"
                  maxDate="2020-06-01"
                  // confirmBtnText="Confirm"
                  // cancelBtnText="Cancel"
                   iconSource={calenderIcon}
                  customStyles={{
                    dateIcon: {
                      left: -20,
                      height:24,width:24
                    },
                    dateInput: {
                      marginLeft: -90,
                      borderColor: 'red',
                      borderWidth: 0,
                      marginRight: 90,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(birth_date) => {
                    this.setState({birth_date});
                  }}
                />
              </View>

              <TextInput
                style={styles.textInputStyle}
                placeholder="Telephone"
                keyboardType="number-pad"
                onChangeText={(telephone_no) => this.setState({telephone_no})}
              />
              <TextInput style={styles.textInputStyle} placeholder="Address" 
                  onChangeText={(address) => this.setState({address})}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Post Code"
                keyboardType="numeric"
                onChangeText={(postcode) => this.setState({postcode})}
              />
               <TextInput
                style={styles.textInputStyle}
                placeholder="City"
                onChangeText={(city) => this.setState({city})}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Country"
                onChangeText={(country) => this.setState({country})}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.buttonActionView}
                onPress={()=>{this.validateUser()}}
              >
                <Text style={styles.buttonActionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
