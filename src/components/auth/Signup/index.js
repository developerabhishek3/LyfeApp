import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  BackHandler,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './indexCss';
import bgimg from '../../../assets/singup.png';
import downArrow from '../../../assets/icon/downArrow.png';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';
import {createUser} from '../../../Api/auth';
import {GetCountryList} from '../../../Api/afterAuth';
import calenderIcon from '../../../assets/icon/26.png'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      instagram_username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      telephone_no: '',
      birth_date:  new Date(),
      address: '',
      postcode: '',
      city: '',
      country: '',
      device_token:'',
      countryData: [],
      Model_Visibility: false,
      Alert_Visibility: false,  
    };
  }

  // Show_Custom_Alert(visible) {
  //   if (this.state.country != 'Country') {
  //     this.setState({ Alert_Visibility: visible });
  //   } else {
  //     Alert.alert('Message', "Please select your Country")
  //   }

  // }
  
  // Hide_Custom_Alert() {
  //   this.setState({ Alert_Visibility: false });
  // }

  Show_Custom_AlertForTime(visible) {
    this.setState({Model_Visibility: visible});
  }

  Hide_Custom_AlertForTime() {
    this.setState({Model_Visibility: false});
  }

  Show_Custom_Alert(visible) {
    if (this.state.country != 'Country') {
      this.setState({Alert_Visibility: visible});
    } else {
      Alert.alert('Warning', 'Please select your your country');
    }
  }

  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
  }
  UserRegistrationFunction = async () => {
    this.setState({spinner: true});
    const {
      instagram_username,
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
      device_token
    } = this.state;
    const createUserResponse = await createUser({
      instagram_username,
      first_name,
      last_name,
      email,
      password,
      telephone_no,
      birth_date,
      address,
      postcode,
      city,
      country,
      device_token
    });
    if (createUserResponse.result == true) {
      console.log('getting resu333333333lt here --------', createUserResponse.response);
      console.log(
        'getting result222222 here --------',
        createUserResponse.response.message,
      );    
      if(createUserResponse.response.status == true){
        console.log("getting inide5555555 response ---",createUserResponse.response.message)
        Alert.alert("Message",createUserResponse.response.message)
        this.props.navigation.navigate('login')
      }
      else{
        Alert.alert("Message",createUserResponse.response.message)
      }
    } else {
      this.myAlert('Error', createUserResponse.error);
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
      email,
      password,
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
    } else if (email.length === 0) {
      this.myAlert('Message', 'Please enter your email');
    } else if (password.length === 0) {
      this.myAlert('Message', 'Please enter your password');
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
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        this.myAlert('Message', 'Invalid email');
        return false;
      }
      const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      if (!telephone_no.match(mobileformat)) {
        this.myAlert('Message', 'Invalid telephone_no');
        return false;
      }
      this.UserRegistrationFunction();
    }
  };

  componentDidMount = async () => {
    // setInterval(() => {
    //   this.fetchCountryData();
    // },100);


    const FCMtoken = await AsyncStorage.getItem('fcmToken');
    console.log("getting token --------",FCMtoken)
    this.setState({device_token:FCMtoken})


    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    this.fetchCountryData();
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

  fetchCountryData = async () => {
    const GetCountryListResponse = await GetCountryList();
    if (GetCountryListResponse.result === true) {
      var countryData = GetCountryListResponse.response.country_list;
      // console.log("getting country data----------",countryData)
    }
    this.setState({countryData});
    // console.log("getting country response----------------",countryData.country_list)
  };
  render() {
    const {date, countryData} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgimg}
          style={styles.bgImgStyle}
          resizeMode="stretch">
          <View style={styles.contentView}>
            <View style={styles.headerView}>
              <Text style={styles.headerTxt}>APPLY</Text>
              {/* <Text style={styles.subHeaderTxt}>
                Hey john@gmail.com, this is not your account ?
              </Text> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.txtInputView}>
                <TextInput
                  style={styles.txtInput}
                  placeholder="Instagram Username"
                  autoCapitalize="none"
                  onChangeText={(instagram_username) =>
                    this.setState({instagram_username})
                  }
                />
                <View style={styles.nameSurNameViewStyle}>
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="Name"
                    autoCapitalize="none"
                    onChangeText={(first_name) => this.setState({first_name})}
                  />
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="Surname"
                    autoCapitalize="none"
                    onChangeText={(last_name) => this.setState({last_name})}
                  />
                </View>

                <View style={styles.txtInput}>
                  <DatePicker
                    style={{width: SCREEN_WIDTH*0.70,}}
                    date={this.state.birth_date}
                    placeholder="Date of Birth                           "
                    mode="date"
                    format="DD-MM-YYYY"                   
                    maxDate="01-06-2060"
                    // confirmBtnText="Confirm"
                    // cancelBtnText="Cancel"
                    iconSource={calenderIcon}
                    customStyles={{
                      dateIcon: {
                        left: -25,
                        height:24,width:24
                      },
                      dateInput: {
                        marginLeft: -60,
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
                  style={styles.txtInput}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Telephone"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  onChangeText={(telephone_no) => this.setState({telephone_no})}
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Address"
                  autoCapitalize="none"
                  onChangeText={(address) => this.setState({address})}
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Password"
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({password})}
                />
                <TextInput
                  style={styles.txtInput}
                  placeholder="Postcode"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  onChangeText={(postcode) => this.setState({postcode})}
                />
                <View style={styles.nameSurNameViewStyle}>
                  <TextInput
                    style={styles.nameSurNameContentStyle}
                    placeholder="City"
                    autoCapitalize="none"
                    onChangeText={(city) => this.setState({city})}
                  />

                  {/* <TextInput style={styles.nameSurNameContentStyle} placeholder="Country"
                  autoCapitalize="none"
                  onChangeText={(country) => this.setState({ country })}
              />  */}

                  <TouchableOpacity
                    onPress={() => this.Show_Custom_AlertForTime()}>
                    <View
                      style={{
                        borderRadius: 50,
                        marginTop: 13,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                        width: SCREEN_WIDTH / 2.8,
                        height: 35,
                      }}>
                          {
                            this.state.country == '' ?
                            <Text
                              style={{
                                color: 'gray',
                                paddingStart: 10,
                                padding:5,
                                fontSize: 15,
                                fontFamily: 'OpenSans-Bold',
                                fontWeight: '800',

                              }}>                        
                            Country
                            </Text>
                              :  <Text
                              style={{
                                color: 'gray',
                                paddingStart: 10,
                                fontSize: 16,
                                padding:5,
                                fontFamily: 'OpenSans-Bold',
                                fontWeight: '800',
      
                              }}>                            
                                {this.state.country}
                            </Text>
                          }
                      <Image
                        source={downArrow}
                        style={{
                          width: 18,
                          height: 18,
                          margin: 3,
                          marginEnd:5,
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <Modal
              visible={this.state.Model_Visibility}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => {
                this.Show_Custom_AlertForTime(!this.state.Model_Visibility);
              }}>
              <View
                style={{
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  backfaceVisibility: 'hidden',
                  flex: 1,
                  right: 20,
                  left: 200,

                  // left: Dimensions.get('window').width*1.60,
                  top: 350,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '38%',
                    height: SCREEN_HEIGHT / 3.3,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                  }}>
                  <ScrollView
                    style={{
                      flex: 2,
                      width: '100%',
                      borderColor: 'red',
                      borderWidth: 0,
                    }}
                    showsVerticalScrollIndicator={false}>
                    {this.state.countryData.map((singleCountry, index) => {
                      return (
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState(
                                {country: `${singleCountry.country_name}`},
                                () => this.Hide_Custom_AlertForTime(),
                              );
                            }}>
                            <View
                              style={{
                                height: 30,

                                // borderColor: '#b48484',
                                // borderWidth: 0,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                elevation: 1,
                                margin: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#B87548',
                                  fontSize: 16,
                                  fontFamily: 'OpenSans-Bold',
                                  textAlign: 'center',
                                }}>{`${singleCountry.country_name}`}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  this.validateUser();
                }}>
                <Text style={styles.loginBtnTxt}>Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
