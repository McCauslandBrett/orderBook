import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        height: 500,
        backgroundColor:'#1F2938'
    },
    table:{
        height: '70%',
        width: '95%',
        flexDirection:'row',
        alignSelf:'center',
        backgroundColor:'blue',
        marginBottom:15,
        
    },
    header:{
         height: '8%',
         width: '95%',
         justifyContent:'center',
         alignSelf:'center',
         backgroundColor:'#0F1726',
         marginBottom:5,
         marginTop:10,
         
     },
    footer:{  
        flexDirection:'row',
        justifyContent:'space-evenly',    
    }
 
})

export default styles;