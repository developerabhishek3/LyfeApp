import {StyleSheet, Dimensions} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImgStyle: {
    height: '100%',
    width: '100%',
  },
  contentView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  header: {
    borderColor: 'red',
    borderWidth: 0,
    justifyContent: 'center',
  },
  imgView: {
    height: 100,
    width: 200,
  },
  imgTextView: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '700',
    
  },
  headertxtView:{
    color:'#A9A9A9',
    textAlign:'center',
      fontSize:17,
      fontWeight:'700',
      marginTop:-20,
      marginBottom:10
  },
  textView: {
    color: '#000000',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '700',
  },
  forgotpassword: {
    alignSelf: 'flex-end',
    marginEnd: 40,

    fontWeight: '700',
    fontSize: 14,
    // color:'#B87548',
    // color:'#BD8A61',
    // color:'#F6F2EF'
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems:'center'
  },
  textContent2: {
    flexDirection: 'row',
    padding: 2,
    textAlign:'center'
  },
  textContentnormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    padding: 4,
  },
  emailTxtStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B87548',
    padding: 2,
  },
 
  seeYouSoonStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop:30,
  
  },
  influeanceStyle: {
    color: '#B87548',
    fontSize: 30,
    fontWeight: '700',
    margin:5

  },
});
