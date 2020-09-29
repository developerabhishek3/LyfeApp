import React, {Component,Fragment} from 'react';
import {View, Text, Image, TouchableOpacity,Alert, TextInput,Modal,Dimensions,BackHandler} from 'react-native';
import styles from './indexCss';
import back from '../../../../../assets/icon/back.png';
import Spinner from 'react-native-loading-spinner-overlay';
// import rightIcon from '../../  ../../../../assets/icon/33.png';
import rightIcon from '../../../../../assets/icon/33.png'
import unCheckIcon from '../../../../../assets/icon/43.png'
import FloatingLabel from 'react-native-floating-labels';
import {ScrollView} from 'react-native-gesture-handler';

import { CheckBox, Overlay, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import {UserProfile, ad_reservation} from '../../../../../Api/afterAuth'

import calenderIcon from '../../../../../assets/icon/26.png'
import downArrow from '../../../../../assets/icon/downArrow.png'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image';
export default class index extends Component {

      constructor(props){
        super(props)
        this.state = {
            UserDetails:[],
            date: new Date(),
            isBodyLoaded: false,
            isSpinner: true,
            Model_Visibility: false,
            Alert_Visibility: false, 
            dateArray: [],
            pickupTime: 'Pickup Time' ,
            ad_id:0,    
            reserve_date:'',        
            reserve_time:"",
            message:"",
             full_name:"",
            shipping_address:"",
            postcode:"",
            phone_no:"",
            city:"",
            country:"",

            checked1: false,

        }
    }


    userProfileFunction = async () => {
        const UserProfileResponse = await UserProfile();        
        if(UserProfileResponse.result === true) {
            // console.log("getting logout response---------------",UserProfileResponse.response) 
            var UserDetails = UserProfileResponse.response.my_profile
            this.setState({ isBodyLoaded: true,isSpinner: false,UserDetails})
        }  
        else{
            this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
              Alert.alert("Message","Something Went Wrong Try Again!",[ { text: "Okay",onPress:()=>{
                  this.props.navigation.goBack();
              }}]);
          })
          }         
        // console.log("getting country response----------------",countryData.country_list)
      };

      componentDidMount = async() => {       
          const ad_id =  this.props.navigation.getParam('ad_id')
          console.log("getting ad id on the did mount-------",ad_id)       

          this.userProfileFunction();
          this.showTimeSlot() 

          setTimeout(() => {                                
            this.setState({
              ad_id,
            });                      
          }, 400);
          console.log("getting on the state------------",this.state.ad_id)
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

      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }    
      Hide_Custom_Alert() {
        this.props.navigation.navigate('Search');
        this.setState({Alert_Visibility: false});
        
      }


      Show_Custom_AlertForTime(visible) {
        this.setState({Model_Visibility: visible});
      }
    
      Hide_Custom_AlertForTime() {
        this.setState({Model_Visibility: false});
      }
      

      


      showTimeSlot = () => {
        let currentDate = new Date();
        let currentMinute = currentDate.getMinutes();
        if(currentMinute >= 30){ 
          currentDate.setMinutes(0);
          currentDate.setHours(currentDate.getHours() + 1);
        }
        else{
          currentDate.setMinutes(30);
        }

        i=1;
        let dateArray = [];
        while(i<=48){
            let pushDate = new Date(currentDate);
          dateArray.push(pushDate);
          currentDate.setMinutes(currentDate.getMinutes()+30);
          i++;
        }
        this.setState({dateArray});
        console.log(dateArray);
      }


      // showTimeSlot = () => {
      //   let date = new Date();
      //   let dateArray = [];
        
      //   let i = 1;
      //   dateArray.push(new Date());
      //   while (i <  48) {          
         
      //     date.setMinutes(date.getMinutes() +  (60 - date.getMinutes())  );
      //     dateArray.push(new Date(date));
      //     i++;
      //   }
      //   this.setState({dateArray});
      // }


      
    ad_reservationFunction = async () => {       
      console.log("getting indie the post function ")
      console.log("getting ad_id inside the function-------------",this.state.ad_id)  
      const {
        ad_id,       
        reserve_date,     
        reserve_time,
        message,
         full_name,
        shipping_address,
        postcode,
        phone_no,
        city,
        country,
      } = this.state;
      const ad_reservationResponse = await ad_reservation({
        ad_id,       
        reserve_date,     
        reserve_time,        
        full_name,
        shipping_address,
        postcode,
        phone_no,
        message,
        city,
        country,
      });
      if (ad_reservationResponse.result === true) {
        console.log('getting result here --------', ad_reservationResponse.response);
        console.log(
          'getting result here --------',
          ad_reservationResponse.response.message,
        );        
        // Alert.alert('Message', ad_reservationResponse.response.message);
        this.Show_Custom_Alert()
      } else {
        this.myAlert('Error', ad_reservationResponse.error);
        console.log('getting error here-------------');
      }
      return;
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  
    validateUser = () => {
      const {     
        reserve_date,     
        reserve_time,
        checked1
  
      } = this.state;
      if (reserve_date.length === 0) {
        this.myAlert('Message', 'Please Select your reserve_date!');
      } else if (reserve_time.length === 0) {
        this.myAlert('Message', 'Please Select your reserve_time!');
      } else if (!checked1) {
        this.myAlert('Message', 'Please do agree the condition!');
      }
      
      else {      
      //   const mobileformat = /^(?:[0-9] ?){6,14}[0-9]$/;
      //   if (!telephone_no.match(mobileformat)) {
      //     this.myAlert('Message', 'Invalid telephone_no');
      //     return false;
      //   }
        this.ad_reservationFunction();
      }
    };  







  render() {
    const headerTxt = this.props.navigation.getParam('headerTxt')
    const advertisementDetailsConditionData = this.props.navigation.getParam("advertisementDetailsConditionData")

    const {dateArray} = this.state;
    const { UserDetails }  = this.state;
    const userMap = Object.assign(UserDetails)
    return (
      <View style={styles.container}>
         <Spinner visible={this.state.isSpinner}/>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={styles.backStyle} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>{headerTxt}</Text>
          <Text style={styles.headerTxt}> </Text>
        </View>
        <ScrollView>
          <View style={styles.contentContainerView}>
            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}> Full Name</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Full Name"

              value={`${UserDetails.first_name} ${UserDetails.last_name}`}
              editable={false}
              style={styles.floatingInputStyle}
            />
            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}> Shopping Address</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Shopping Address"
              style={styles.floatingInputStyle}
              value={UserDetails.address}
              editable={false}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderColor: 'red',
                borderWidth: 0,
                flexWrap: 'wrap',
                justifyContent:'center'
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}>Post Code</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Post Code"
                  value={UserDetails.postcode}
                  editable={false}
                  style={styles.floatingInputStyle1}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}> Telephone</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Telephone"
                  value={UserDetails.phone_no}
                  editable={false}
                  style={styles.floatingInputStyle1}
                /> 
              </View>
            </View>
            <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}>Choose Date</Text>
            <View style={styles.txtInput}>
            
                  <DatePicker
                    style={{width: SCREEN_WIDTH*0.70,}}
                    date={this.state.date}
                    placeholder="Date of Birth                           "
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate={this.state.date}
                    maxDate="2030-06-01"
                    // confirmBtnText="Confirm"
                    // cancelBtnText="Cancel"
                    iconSource={calenderIcon}
                    customStyles={{
                      dateIcon: {
                        left: 20,
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
                    onDateChange={(reserve_date) => {
                      this.setState({reserve_date});
                    }}
                  />
                </View>

                <Text style={{margin: 1, marginStart: 15,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}>Choose Time</Text>
                    <View
                      style={{
                        borderRadius: 50,
                        marginTop: 13,
                        margin:10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                        width: SCREEN_WIDTH*0.86,
                        alignSelf:'center',
                        height: 35,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          paddingStart: 10,
                          fontSize: 16,
                          fontFamily: 'OpenSans-Bold',
                          fontWeight: '800',
                        }}>
                        {this.state.reserve_time}
                      </Text>
                      <TouchableOpacity
                    onPress={() => this.Show_Custom_AlertForTime()}>
                      <Image
                        source={downArrow}
                        style={{
                          width: 22,
                          height: 22,
                          margin: 3,
                          marginEnd:30,
                          borderColor:'red',
                          borderWidth:0,
                          
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      />
                       </TouchableOpacity>
                    </View>                 
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderColor: 'red',
                borderWidth: 0,
                flexWrap: 'wrap',
                justifyContent:'center'
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.twotitleStyle}>City </Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="City"
                  value={UserDetails.city}
                  editable={false}
                  style={styles.floatingInputStyle1}
                />
              </View>
              <View style={{flexDirection: 'column',alignSelf:'center'}}>
              <Text style={styles.twotitleStyle}>Country</Text>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Country"
                  value={UserDetails.country}
                  editable={false}
                  style={styles.floatingInputStyle1}
                />
              </View>
            </View>

            {/* <Text style={styles.twotitleStyle}>Size Choice</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Shopping Address"
              style={styles.floatingInputStyle}
            /> */}

            <Text style={styles.twotitleStyle}> Message Optional</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Type here...."
              style={styles.MessageInputStyle}
              onChangeText={(message) => this.setState({message})}
            />

            <Text style={{margin: 1, marginStart: 20,fontSize:14,fontWeight:'700',fontFamily:'Montserrat-Regular'}}>I agree to respect the following conditions</Text>
            {/* <View style={{flexDirection:'row',borderColor:'red',borderWidth:1,flexWrap:'wrap',width:'100%',alignContent:'center'}}>
                <CheckBox
                    checked={this.state.checked1}
                    
                    onPress={() =>
                      this.setState({ checked1: !this.state.checked1 })
                    }
                    checkedIcon={
                      <Image source={rightIcon} style={{ width: 20, height: 20,marginStart:-10 }} />
                    }
                    uncheckedIcon={
                      <Image source={unCheckIcon} style={{ width: 20, height: 20,marginStart:-10 }} />
                    }
                  />
                <Text style={{textAlign:'left',fontSize:10}}>
                  Post 3 stories (Minimum) with the tag 
                  @(insta of the brand ) and
                  @thelyfe.influencer
                </Text>
            </View> */}

            {/* <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <CheckBox
                    checked={this.state.checked1}
                    
                    onPress={() =>
                      this.setState({ checked1: !this.state.checked1 })
                    }
                    checkedIcon={
                      <FastImage source={rightIcon} style={{ width: 24, height: 24, }} />
                    }
                    uncheckedIcon={
                      <FastImage source={unCheckIcon} style={{ width: 24, height: 24, }} />
                    }
                  />
                  <View style={{justifyContent:'center',margin:3,alignItems:'flex-start',borderWidth:0,marginStart:-20}}>
                  <Text style={{fontSize:12,fontWeight:'700',}}> Post 3 stories (Minimum) with the tag </Text>
                  <Text style={{fontSize:12,fontWeight:'700',}}> @(insta of the brand ) and@thelyfe.influencer</Text>
                  </View>

            </View> */}


        <Fragment>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start',borderWidth:0,width:'90%'}}>
              {/* <Text style={styles.textInputHeading}>I agree to</Text>   */}
                    <View style={{flexDirection:'row',margin:0}}>
                    <CheckBox
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                  checkedIcon={
                    <FastImage
                      source={require('../../../../../assets/icon/33.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                       
                      }}
                    />
                  }
                  uncheckedIcon={
                    <FastImage
                      source={require('../../../../../assets/icon/43.png')}
                      style={{
                        width: 24,
                        height: 24,
                        borderWidth: 0,                     
                      }}
                    />
                  }
                />
                <Fragment>
                  <View style={{flexDirection:'column',marginTop:12,marginStart:-7}}>
                {
                   advertisementDetailsConditionData.map((singleCondition)=>{
                     return(
                        <View style={{flexDirection:'column'}}>                   
                                <Text    style={{
                              fontSize: 12,
                              fontWeight: '600',                              
                              fontFamily: 'Montserrat-bold',
                            }}>{singleCondition.condition}</Text>
                        </View>
                     )
                   })
                 }
                 </View>
                </Fragment>
                    </View>
              </View>
                                         
            </Fragment>


            <TouchableOpacity
              style={styles.actionBtn}
              // onPress={() => this.Show_Custom_Alert()}
                onPress={()=>{this.validateUser()}}
              >
              <Text style={styles.actionBtnTxt}>Oh yes i want it!</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>


        <Modal
          visible={this.state.Alert_Visibility}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}>
          <View
            style={{
              // backgroundColor:'#FFF',
              backgroundColor: 'rgba(0,0,0,0.700)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: SCREEN_HEIGHT/2,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    borderWidth: 0,
                    marginTop: -50,
                  }}>
                  <Image
                    source={rightIcon}
                    style={{height: 90, width: 90, margin: 5}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin: 10,
                    color: '#B87548',
                    textAlign: 'center',
                  }}>
                  Request Confirmed
                </Text>
                {/* <View >
                  <Text
                    style={{
                      fontSize: 13,
                      margin: 5,
                      textAlign: 'center',
                      fontWeight: '700',
                    }}>
                    {' '}
                   Luz - Active Wear Collection
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      margin: 5,
                      textAlign: 'center',
                      fontWeight: '700',
                    }}>
                   Brassieree + Legging
                  </Text>
                </View> */}
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  Thanks for your request, we will get
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  back to you asap with your
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    margin: 5,
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  {' '}
                  confirmation!
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin: 10,
                    color: '#B87548',
                    textAlign: 'center',
                  }}>
                  With love from the Lyfe team
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  margin: 5,
                  marginStart: 30,
                  marginEnd: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}
                  // onPress={()=>{this.props.navigation.navigate("Search")}}
                  // onPress={()=>{this.props.navigation.navigate("Search"),this.Hide_Custom_Alert}}
                  style={{
                    borderColor: '#B87548',
                    borderRadius: 50,
                    backgroundColor: '#B87548',                    
                    justifyContent: 'center',
                    margin:4,
                    height:40
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart:40,
                      marginEnd:40,
                      fontWeight: '700',
                      textAlign: 'center',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>






        {/* model for selecting current time to time slot */}
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
                  right: 10,
                  left: 10,
                  // left: Dimensions.get('window').width*1.60,
                  top: 350,
                  bottom: 20,
                }}>
                <View
                  style={{
                    width: '90%',
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
                       {dateArray.map((singleDate, index) => {
                  return (
                    <ScrollView horizontal={true}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              reserve_time: `${singleDate.getHours()} : ${singleDate.getMinutes()}`,
                            },   () => this.Hide_Custom_AlertForTime(),
                            );
                          }}>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#B87548',
                              borderWidth: 1,
                              
                              alignItems:'center',
                              justifyContent: 'center',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 0.5,
                              shadowRadius: 1,
                              elevation: 1,
                              margin: 3,
                              width:SCREEN_WIDTH/3.5,
                              borderRadius:7,
                            }}>
                            <Text
                              style={{
                                padding: 4,
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: 12,
                                fontFamily: 'OpenSans-Bold',
                                textAlign: 'center',
                              }}>{`${singleDate.getHours()} : ${singleDate.getMinutes()}`}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  );
                })}
                  </ScrollView>
                </View>
              </View>
            </Modal>

      </View>
    );
  }
}
