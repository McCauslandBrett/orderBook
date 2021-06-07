import React, { Component } from 'react'
import { FlatList, Text, TouchableWithoutFeedbackBase, View } from 'react-native'
import styles from './TableStyles';

interface Props {
    data: any[]; 
    left: boolean;
    orderType:string;
  }
interface TableState {

  }

export default class Table extends Component<Props,TableState> {
   
    
    constructor(props){
        super(props)

    }
    componentDidMount(){
    }
    renderRow = ({item}) => { 
        console.log('renderRow:item',JSON.stringify(item))
        let s = `${item}`.split(',')
        // need groupBy here
        let price = Number(s[0])
        let qty = Number(s[1])
        let priceStyle = this.props.orderType === "BIDS" ? {color:'#2BAA79'}:{color:'#D93D3F'};
        let column1Style = this.props.left ? priceStyle:{color:'white'};
        let column3Style = this.props.left ? {color:'white'}:priceStyle;
        console.log(`renderRow:s,${JSON.stringify(s)}`)
        console.log(`renderRow:price,${price}`)
        return(
            <View style={styles.orders}>
              <View style = {styles.column}>
                 <Text style={[{lineHeight:25},column1Style]}> {this.props.left ? `${price}`:`${qty}`}</Text>
              </View>
              <View>
                 <Text style={{color:'white'}}>SIZE</Text>
              </View>
              <View>
                  <Text style={[column3Style]}> {this.props.left ? `${qty}`:`${price}`}</Text>
              </View>

            </View>
        )
    }
    render() {
        
        return (
            <View style = {styles.container}>
                <FlatList
                  ListHeaderComponent={
                      <View style = {styles.header}>
                         <View>
                            <Text style = {styles.headerText}> {this.props.left ? 'PRICE':'TOTAL'}</Text>
                         </View>
                         <View>
                            <Text style = {styles.headerText}>SIZE</Text>
                         </View>
                         <View>
                            <Text style = {styles.headerText}> {this.props.left ? 'TOTAL':'PRICE'}</Text>
                         </View>

                      </View>
                  }
                  data={this.props.data}
                  renderItem={this.renderRow}
                />
            </View>
        )
    }
}
