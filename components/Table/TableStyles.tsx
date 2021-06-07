import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
      
        width: '50%',
        height: '100%',
        backgroundColor:'#0F1726'
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-evenly'


    },
    headerText:{
      color:'#616876'
    },
    orders:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        textAlignVertical:'center',
        
    },
    column:{
        // marginBottom:10
    }
 
})

export default styles;