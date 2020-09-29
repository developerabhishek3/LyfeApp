import { StyleSheet,Dimensions } from "react-native";
import { color } from "react-native-reanimated";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',   
        alignItems:'center' 
    },
    bgImgStyle:{    
        height:'100%',
        width:'100%'
    },
    contentView:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'red',
        borderWidth:0,        
    },
    header:{
        borderColor:'red',
        borderWidth:0,
        justifyContent:'center'
    },
    imgView:{
      height:120,
      width:220,
    },
    imgTextView:{
      color:'#A9A9A9',
        textAlign:'center',
        fontSize:18,
        fontWeight:'700',
        marginTop:-20,
        marginBottom:40
    },
    headerTextView:{
        marginBottom:90,   
        textAlign:"center",    
        width:'100%',
        color:'#FFFFFF',
        fontSize:27,
        fontWeight:"700"
    },
    textView:{
        margin:10,
        marginTop:30,
  
    },textContent:{
        fontWeight:'600',
        fontSize:17,
        margin:5,
        textAlign:'center'
    },
    forgotpassword:{
        alignSelf:'flex-end',
        marginEnd:40,      
        fontWeight:'700',
        fontSize:14
        // color:'#B87548',
        // color:'#BD8A61',
        // color:'#F6F2EF'
    },
    btnView:{
        marginTop:20,
        marginBottom:80
    },
    Btn:{
        backgroundColor:'#187bcd',
        height:40,
        justifyContent:'center',
        borderRadius:50,
        margin:10,
        marginBottom:50
    },
    BtnTxt:{
        margin:30,
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'700',
        textAlign:'center'
    },


    text: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        padding: 20
      },
    
      imageStyle: {
    
        width: 200,
        height: 300,
        resizeMode: 'contain'
    
      }
    
})