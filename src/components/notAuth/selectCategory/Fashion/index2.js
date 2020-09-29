import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
  BackHandler
} from 'react-native';
import styles from './indexCss';

import back from '../../../../assets/icon/back.png';
import location from '../../../../assets/icon/28.png';
import insta from '../../../../assets/icon/27.png';
import workout from '../../../../assets/icon/Explorer/workout.jpeg';
import {GetAdvertisementDetails} from '../../../../Api/afterAuth';
import FastImage from 'react-native-fast-image';
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const headerTxt = this.props.navigation.getParam('categoryName');   
    const imgUrl = this.props.navigation.getParam('imgUrl'); 
    BackHandler.addEventListener('hardwareBackPress',  ()=>this.handleBackButton(this.props.navigation));
    // console.log("getting imge and category name ---------",headerTxt, imgUrl)
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



  render() {


    const headerTxt = this.props.navigation.getParam('categoryName');   
    const imgUrl = this.props.navigation.getParam('imgUrl');  
    console.log("getting image url inside render----------",imgUrl)  
    // const advertisementDetailsDataMap = Object.assign(advertisementDetailsData)    
    // console.log("getting indie the render---------------",advertisementDetailsDataMap)

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#B87548" />

            <View style={styles.header2}>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Image source={back} style={styles.backStyle2} />
                </TouchableOpacity>
              <Text style={styles.headerTxt2}>{headerTxt}</Text>
              <Text style={styles.headerTxt}> </Text>
            </View>          
     
        <View style={styles.contentView}>
            <FastImage 
                    resizeMode="contain"
                     source={{
                        uri: `https://www.thelyfe.fr/${imgUrl}`,                            
                      }} 
                      style ={{width:'100%',height:300,borderColor:'red',borderWidth:0}}
            />
        </View>
      </View>
    );
  }
}
