import React, {Component, version} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import styles from './indexCss';

import back from '../../../../assets/icon/back.png';

import {GetTermsAndConditions} from '../../../../Api/afterAuth';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TermsData: [],

      isBodyLoaded: false,
      isSpinner: true,
    };
  }

  GetTermsAndConditionsFunction = async () => {
    const GetTermsAndConditionsResponse = await GetTermsAndConditions();

    if (GetTermsAndConditionsResponse.result === true) {
      console.log("getting logout response---------------",GetTermsAndConditionsResponse.response)
      var TermsData = GetTermsAndConditionsResponse.response.terms_condition

      this.setState({isBodyLoaded: true, isSpinner: false, TermsData});
    } else {
      this.setState({isBodyLoaded: false, isSpinner: false}, () => {
        Alert.alert('Message', 'Something Went Wrong Try Again!', [
          {
            text: 'Okay',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      });
    }
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
    this.GetTermsAndConditionsFunction();
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
    const {TermsData} = this.state;
    const userMap = Object.assign(TermsData);

    // console.log("getting indside the reder methid-------",userMap.contents)
    return (
      <View style={styles.container}>
           <Spinner visible={this.state.isSpinner} />
            <StatusBar
            barStyle="#FFFFFF"
            hidden={false}
            backgroundColor="#B87548"
            translucent={true}
            />
            <View style={styles.headerView}>
            <TouchableOpacity
                onPress={() => {
                this.props.navigation.goBack();
                }}>
                <Image source={back} style={styles.backArrowStyle} />
            </TouchableOpacity>
                <Text style={styles.headerText}>Terms and Conditions</Text>
                <Text style={styles.headerText}> </Text>
            </View>
            <View style={styles.contentView}>   
            <ScrollView>   
            <View>   
            {
                this.state.isBodyLoaded === true ?                
                <View style={{borderColor:'red',borderWidth:0,width:'95%',margin:10,alignSelf:'center',marginTop:20,}}>                  
                    <HTML html={userMap.contents} />
                </View>
                : 
                <View style={{justifyContent:'center',alignItems:'center',marginTop:130,marginBottom:130}}>
                    <Text style={{textAlign:'center',alignSelf:'center',fontWeight:'700',fontSize:20,color:'#000000'}}></Text>
                </View>
            }    
            </View>
            </ScrollView>
            </View>
      </View>
    );
  }
}
