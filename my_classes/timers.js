import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props){
      super(props);
      this.state = {
        callback: props.callback,
        angst: 20,
        pain: 50,
        rage: 80,
        speed: props.speed,
        dead: false,
      }
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(), this.state.speed
      );
    }

    componentWillUnmount(){
      return () => clearInterval(this.timerID)
    }

    //For making string for percentage
    stateString(input){
      let temp = input + '%';
      return(temp)
    }

    //timers changing over time
    tick() {

      //set temps
      let tempAngst = this.state.angst;
      let tempPain = this.state.pain;
      let tempRage = this.state.rage;

      //find total and set image state
      let total = tempAngst + tempPain + tempRage;
      let tempState = 0;
      if (total < 278 && this.state.dead == false){
        if (tempAngst > 0){
          tempAngst--;
        }
        if (tempPain > 0){
          tempPain--;
        }
        if (tempRage > 0){
          tempRage--;
        }
      }
      
      //set bar percentages
      this.setState({
        angst: tempAngst,
        pain: tempPain,
        rage: tempRage,
      })
      
      //set image state
      if (total < 5)
        tempState = 0;
      else if (total < 39)
        tempState = 1;
      else if (total < 73)
        tempState = 2;
      else if (total < 107)
        tempState = 3;
      else if (total < 141)
        tempState = 4;
      else if (total < 175)
        tempState = 5;
      else if (total < 209)
        tempState = 6;
      else if (total < 243)
        tempState = 7;
      else if (total < 278)
        tempState = 8;
      else
        tempState = 9;

      if (tempState == 0 || tempState == 9){
        this.setState({
          dead: true,
        })
      }

      if(this.state.callback(tempState))
        this.state.dead = true;
    }
    
    //functions for buttons
    addAngst = () =>{
      let tempAngst = this.state.angst;

      //adds only if the emoji is dead
      if (this.state.dead == false)
        tempAngst = tempAngst + 25;

      //make sure it doesnt go over 100
      if (tempAngst > 100){
        tempAngst = 100;
      }
      
      this.setState({
        angst: tempAngst,
      })
    }
    
    addPain = () =>{
      let tempPain = this.state.pain;

      if (this.state.dead == false)
        tempPain = tempPain + 25;

      //make sure it doesnt go over 100
      if (tempPain > 100){
        tempPain = 100;
      }
      
      this.setState({
        pain: tempPain,
      })
    }
    
    addRage = () => {
      let tempRage = this.state.rage;

      if (this.state.dead == false)
        tempRage = tempRage + 25;

      //make sure it doesnt go over 100
      if (tempRage > 100){
        tempRage = 100;
      }
      
      this.setState({
        rage: tempRage,
      })
    }

    render(){
        return (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Angst:</Text>
              <View style={styles.outerStatus}>
                <View style={[styles.innerStatus,{width: this.stateString(this.state.angst)}]}></View>
              </View>
              <Text style={styles.statusText}>Pain:</Text>
              <View style={styles.outerStatus}>
                <View style={[styles.innerStatus,{width: this.stateString(this.state.pain)}]}></View>
              </View>
              <Text style={styles.statusText}>Rage:</Text>
              <View style={styles.outerStatus}>
                <View style={[styles.innerStatus,{width: this.stateString(this.state.rage)}]}></View>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button}
                  onPress={this.addAngst}>
                  <Text style={styles.statusText}>Emo Rock</Text>
                </Pressable>
                <Pressable style={styles.button}
                  onPress={this.addPain}>
                  <Text style={styles.statusText}>Beat</Text>
                </Pressable>
                <Pressable style={styles.button}
                  onPress={this.addRage}>
                  <Text style={styles.statusText}>Berate</Text>
                </Pressable>
              </View>
            </View>

        );
      }
}

const styles = StyleSheet.create({    
    statusContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      width: '100%',
      marginTop: 20
    },
    statusText:{
      fontSize: 20,
      color: 'white',
      padding: 5,
    },
    outerStatus:{
        backgroundColor: 'white',
        padding: 3,
        width : '100%',
        height: 26,
        borderRadius: 5,
    },
    innerStatus:{
        backgroundColor: 'maroon',
        padding: 3,
        height: 20,
        width: '20%',
        borderRadius: 5,
    },  
    buttonContainer: {
      borderWidth: 1,
      flexDirection: 'row',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'maroon',
      borderWidth: 3,
      borderColor: 'white',
      height: 75,
      width: 100,
      borderRadius: 10,
      margin: 10,
      marginTop: 30
    },
    
});