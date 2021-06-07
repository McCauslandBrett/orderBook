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
  
        let s = `${item}`.split(',')
        // need groupBy here
        let price = Number(s[0])
        let size = Number(s[1])
        let total = Number(s[2])
        let priceStyle = this.props.orderType === "BIDS" ? {color:'#2BAA79'}:{color:'#D93D3F'};
        let column1Style = this.props.left ? priceStyle:{color:'white'};
        let column3Style = this.props.left ? {color:'white'}:priceStyle;
        return(
            <View style={styles.orders}>
              <View style = {styles.column}>
                 <Text style={[{lineHeight:25},column1Style]}> {this.props.left ? `${price}`:`${total}`}</Text>
              </View>
              <View>
                <Text style={{color:'white'}}>{size}</Text>
              </View>
              <View>
                  <Text style={[column3Style]}> {this.props.left ? `${total}`:`${price}`}</Text>
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
