import React, { Component } from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity,BackHandler} from 'react-native';
import FastImage from 'react-native-fast-image';

import profile from '../../../../assets/icon/profile.png'
import Back from '../../../../assets/icon/back.png'
import edit from '../../../../assets/icon/edit.png'
import profileImage from '../../../../assets/icon/profileImage.png'

import FloatingLabel from 'react-native-floating-labels';

import Spinner from 'react-native-loading-spinner-overlay';

import styles from './indexCss'

import { UserProfile,InstagramInfo } from '../../../../Api/afterAuth';
export default class index extends Component {


    constructor(props){
        super(props)
        this.state = {
            UserDetails:[],
            
            isBodyLoaded: false,
            isSpinner: true,
            instagramImage:'',
            InstagramName:'',
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
          this.userProfileFunction();
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

      fetchInstagramDetails = async() => {
        const GetInstagamInfo = await InstagramInfo()
        if(GetInstagamInfo.result===true){
          console.log("getting details here>>>>>>>>>>>>>>>>>>>>>------------",GetInstagamInfo.response.graphql.user.profile_pic_url)
          var instagramImage =  GetInstagamInfo.response.graphql.user.profile_pic_url
          var InstagramName =  GetInstagamInfo.response.graphql.user.username
         
          this.setState({instagramImage,InstagramName})
        }
        else{
          console.log("getting error on the else part---------",GetInstagamInfo.error)
        }
      }


    render() {
        
        const { UserDetails }  = this.state;
        const userMap = Object.assign(UserDetails)

        return (
            <View style={styles.container}>
                <Spinner visible={this.state.isSpinner}/>
                <View style={styles.headerView}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Image source={Back} style={styles.headerImgView} />
                    </TouchableOpacity>
                        <Text style={styles.headerTextView}>My Profile</Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("editprofile")}}>
                        <Image source={edit} style={styles.headerImgView} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentView}>
              
                        <View style={styles.ImageView}> 
                            {/* <Image source={profileImage} style={styles.imgStyle}  /> */}
                            {
                          this.state.instagramImage != '' ?
                          <FastImage source={{uri: `${this.state.instagramImage}`}} style={styles.imgStyle}  />

                          :
                          <FastImage source={profile} style={styles.imgStyle}   />
                        }
                        </View>

                        <ScrollView>
                            {
                                  this.state.isBodyLoaded === true ?  
                                        <View style={styles.contentContainerView}>
                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.first_name}
                            >
                            Name
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.last_name}
                            >
                            Surname
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.phone_no}
                            >
                                Telephone
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.email}
                            >
                            Email
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.address}
                            >
                            Address
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.postcode}
                            >
                            Post Code
                        </FloatingLabel>

                        <FloatingLabel
                            autoCapitalize="none"
                            labelStyle={styles.floatingLabelStyle}
                            inputStyle={styles.floatingInputStyle}
                            editable={false}
                            value={UserDetails.country}
                            >
                            Country
                        </FloatingLabel>

                        </View>
                                  : null
                            }
                        
                        </ScrollView>

                </View>               
            </View>
        )
    }
}
