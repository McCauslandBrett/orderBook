import React, { Component } from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
import styles from './ButtonStyles';
import PropTypes from 'prop-types';

interface Props {
    title:string,
    color:string,
    onPress:any
}
export default class Button extends Component<Props> {
    
    constructor(props){
        super(props)
    }
    render() {
        return (
            <TouchableOpacity  onPress={this.props.onPress} style={[styles.container,{backgroundColor:`${this.props.color}`}]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}> {this.props.title} </Text>
                </View>
                
            </TouchableOpacity>
        )
    }
}
