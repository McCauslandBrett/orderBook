/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {Component} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

import OrderWebsocket from './data/OrderWebsocket';
import OrderTableView from './components/OrderTableView/OrderTableView';
import ASSETS from './constants/Assets';
import appStyles from './styles'
 const Section: React.FC<{
   title: string;
 }> = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };

export default class App extends Component {
  isDarkMode: boolean;
  backgroundStyle: any;

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {};
    this.isDarkMode = true;
    this.backgroundStyle = this.isDarkMode ? Colors.darker : Colors.lighter

  }
  componentDidMount() {
    // Connect to websocket on open
      OrderWebsocket.getInstance().connect().then(()=>{
        OrderWebsocket.getInstance().subscribe(ASSETS.XBT_USD)
    });
   

    console.log(`app mounted`)
  };
  componentWillUnmount(){
    OrderWebsocket.getInstance().disconnect();
  }

render(){
   return (
     <SafeAreaView style={this.backgroundStyle}>
       <StatusBar barStyle={this.isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={this.backgroundStyle}>
         {/* <Header /> */}
         <View style = {appStyles.container}>

         </View>
         <View
           style={{
             backgroundColor: this.isDarkMode ? Colors.black : Colors.white,
           }}>
           <OrderTableView />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
  }
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });


