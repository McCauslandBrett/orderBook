import React, { Component } from 'react'
import { Text, View,  Touchable, TouchableOpacity } from 'react-native'
import styles from './OrderTableStyles';
import Button  from '../Button/Button';
import Table from '../Table/Table';
import AskData from '../../data/AskData'
import BidData from '../../data/BidData';
import OrderWebsocket from '../../data/OrderWebsocket';
import ASSETS from '../../constants/Assets'
export default class OrderTableView extends Component<{}, { bidLeft: boolean,asks:any,bids:any,asset:string,kill:boolean }> {
   
    askData: AskData;
    bidData: BidData;
    interval!: NodeJS.Timeout;
    ws: OrderWebsocket;

    constructor(props: {}){
        super(props)
        this.toggleFeed = this.toggleFeed.bind(this);
        this.killFeed = this.killFeed.bind(this);
        this.askData = AskData.getInstance();
        this.bidData = BidData.getInstance();
        this.ws = OrderWebsocket.getInstance();
        this.state = {
           bidLeft:true,
           asks:[],
           bids:[],
           asset:ASSETS.XBT_USD,
           kill:true,
        }
    }
    killFeed(){
       if (this.state.kill == false){
            this.ws.reconnect()
            .then(()=> {
                this.ws.subscribe(this.state.asset);
            })
            .catch(()=>{
                // failed to reconnect
            })
            this.setState({
                kill:true
            })

       }
       else {
           this.ws.disconnect()
           this.setState({
               kill:false
           })
       }
    }
    toggleFeed(){
        this.ws.unsubscribe(this.state.asset);
        let newAsset = this.state.asset == ASSETS.XBT_USD ? ASSETS.ETH_USD:ASSETS.XBT_USD
        this.ws.subscribe(newAsset).then(()=>{
            this.setState({
                asset: newAsset
              });
           
        })
        .catch(()=>{

        })
      
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            console.log('ran again', Date.now())
            let a = this.askData.getAsk();
            let b = this.bidData.getBids();
            console.log(`#OrderTableView:a, ${JSON.stringify(a)}`)
            console.log(`#OrderTableView:b, ${JSON.stringify(b)}`)
            this.setState({ 
                bids:b,
                asks:a,
            })
        }, 2000);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render() {
        return (
            <View style = {styles.container}>
                 <View style={styles.header}>
                    <Text style = {{color:'white',fontWeight:"bold",marginLeft:'5%'}}>Order Book</Text>
                 </View>
                <View style = {styles.table}>
                 <Table left = {false} orderType={this.state.bidLeft ? "BIDS": "ASKS"} data={this.state.bidLeft ? this.state.bids: this.state.asks}/>
                 <Table left = {true} orderType={this.state.bidLeft ?  "ASKS": "BIDS"} data={this.state.bidLeft ?  this.state.asks : this.state.bids} />
                </View>

                <View style={styles.footer}>
                    <Button title = {'Toggle Feed'} color = {'#5741D9'} onPress={this.toggleFeed} />
                    <Button title = {'Kill Feed'} color = {'#B41B1C'} onPress ={this.killFeed} />
                </View>

            </View>
        )
    }
}
