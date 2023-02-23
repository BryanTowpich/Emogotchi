import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//custom Components
//import Critter from './my_classes/critters';
import Timer from './my_classes/timers';

//create Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{title: 'Assignment 2'}}
        />
        <Stack.Screen name="Emo"
          component={EmoScreen}
        />
        <Stack.Screen name="Score"
          component={ScoreScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export class HomeScreen extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const {navigation} = this.props;
    return(
      <View style={styles.mainContainer}>
        <Text style={[styles.text,{marginBottom:15, fontSize:50}]}>Welcome to EmoGotchi!!!</Text>
        <Text style={styles.text}>Basic Rules:</Text>
        <Text style={styles.text2}>You need to keep your EmoGotchi 'Emo' enough to stay, but not 'Emo' enough that he dies. 
        Do this by playing Emo Rock for his Angst, giving him Beatings for his Pain, and Berating him for his Rage.
        The more 'Emo' your VICTIM the more points you recieve.</Text> 
        <Text style={styles.text}>GO FOR THE HIGH SCORE!!!</Text>
        <Pressable style={styles.button2}onPress={()=>{navigation.navigate('Emo',{dificulty: 1, speed: 200});}}> 
          <Text style={styles.text2}>Emosy</Text> 
        </Pressable>
        <Pressable style={styles.button2}onPress={()=>{navigation.navigate('Emo',{dificulty: 2, speed: 100});}}> 
          <Text style={styles.text2}>Medmo</Text> 
        </Pressable>
        <Pressable style={styles.button2}onPress={()=>{navigation.navigate('Emo',{dificulty: 4, speed: 50});}}> 
          <Text style={styles.text2}>Hemo</Text> 
        </Pressable>
      </View>
    );
  }
}

export class ScoreScreen extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const {navigation} = this.props;
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Your Score Is:</Text>
        <Text style={[styles.text, {fontSize: 100}]}>{this.props.route.params.score}</Text>
        <Pressable style={styles.button} onPress={()=>{navigation.navigate('Home');}}>
          <Text style={styles.text}>Try Again!</Text>
        </Pressable>
      </View>
      
    );
  }
}

export class EmoScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      imageState: require('./assets/Stage2.png'),
      dead: false,
      point: 0,
      pointsPS: 0,
      time: 30,
      dificulty: this.props.route.params.dificulty,
      speed: this.props.route.params.speed, 
      endType: 1,
    }
  }

  //timer for the points
  componentDidMount() {
    this.timerID = setInterval(
      () => this.addScore(), 1000
    );
  }

  //point add
  addScore() {
    let tempTime = this.state.time;

    //score gain valid
    if (tempTime > 0 && this.state.dead == false){
      let tempScore = (this.state.pointsPS * this.state.dificulty)+ this.state.point;
      tempTime--;
      this.setState({
        point: tempScore,
        time: tempTime,
      })
    }
    //score gain Invalid
    else{
      this.state.dead = true;
      this.setState({
        time: 0,
      })
    }
  }

  //setting the correct emoji stage and point total from timers
  getImageState = (imgState) => {

    //switch caser
    switch(imgState){
      case 0:
        this.setState({
          imageState: require('./assets/Stage0.png'),
          pointsPS: imgState,
          dead: true,
          endType: 2,
        });
        break;
      case 1:
        this.setState({
          imageState: require('./assets/Stage1.png'),
          pointsPS: imgState,
        });
        break;
      case 2:
        this.setState({
          imageState: require('./assets/Stage2.png'),
          pointsPS: imgState,
        });
        break;
      case 3:
        this.setState({
          imageState: require('./assets/Stage3.png'),
          pointsPS: imgState,
        });
        break;
      case 4:
        this.setState({
          imageState: require('./assets/Stage4.png'),
          pointsPS: imgState,
        });
        break;
      case 5:
        this.setState({
          imageState: require('./assets/Stage5.png'),
          pointsPS: imgState,
        });
        break;
      case 6:
        this.setState({
          imageState: require('./assets/Stage6.png'),
          pointsPS: imgState,
        });
        break;
      case 7:
        this.setState({
          imageState: require('./assets/Stage7.png'),
          pointsPS: imgState,
        });
        break;
      case 8:
        this.setState({
          imageState: require('./assets/Stage8.png'),
          pointsPS: imgState,
        });
        break;
      case 9:
        this.setState({
          imageState: require('./assets/Stage9.png'),
          pointsPS: 0,
          dead: true,
          endType:3
        });
        break;
    }
    return(this.state.death)
  }

  render(){
    const {navigation} = this.props;
    let myStats = (<Timer callback={this.getImageState} speed={this.state.speed}/>)
    if (this.state.dead){
      myStats = (
        <View style={styles.scoreOuter}>
          <Pressable style={styles.button3} onPress={()=>{navigation.navigate('Score',{ score: this.state.point });}}>
            <Text style={styles.text2}>Score</Text>
          </Pressable>
        </View>)
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headContainer}>
            <Text style={styles.text}>EmoGotchi!</Text> 
        </View>
        <View style={styles.emoContainer}>
          <Image source={(this.state.imageState)} style={styles.emoji}/>
        <View style={styles.scoreOuter}>
          <View style={styles.scoreInner}>
            <Text style={styles.scoreText}>Points/Sec:</Text>
            <Text style={styles.scoreText2}>{this.state.pointsPS}</Text>
          </View>            
          <View style={styles.scoreInner}>
            <Text style={styles.scoreText}>Points:</Text>
            <Text style={styles.scoreText2}>{this.state.point}</Text>
          </View>
          <View style={styles.scoreInner}>
            <Text style={styles.scoreText}>Time Left:</Text>
            <Text style={styles.scoreText2}>{this.state.time}</Text>
          </View>
        </View>
        </View>
        <View style={styles.statusContainer}>
          {myStats}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'column',
  },
  headContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '100%',
    height: 100,
  },
  text: {
    padding: 10,
    fontSize: 30,
    color: 'white',
    textAlign: 'center', 
  },
  emoContainer:{
    padding: 10,
    width: '100%',
    height: '40%',

  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width : '100%',
  },
  emoji:
  {    
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  scoreOuter:
  {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreInner:
  {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText:
  {
    color: 'white',
    fontSize: 15,
  },
  scoreText2:
  {
    color: 'white',
    fontSize: 25,
  },    
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'maroon',
    borderWidth: 3,
    borderColor: 'white',
    height: 75,
    width: 200,
    borderRadius: 10,
    margin: 10,
  },
  button2:{ 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'maroon',
    borderWidth: 3,
    borderColor: 'white',
    width: '100%',    
    borderRadius: 10,
    marginTop:10,
  },
  button3:{ 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'maroon',
    borderWidth: 3,
    borderColor: 'white',
    height: 250, 
    width: '100%',    
    borderRadius: 10,
  },  
  text2: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center', 
  },
});
