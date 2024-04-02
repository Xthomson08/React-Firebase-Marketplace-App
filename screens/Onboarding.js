import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ProgressBar } from 'react-native-paper';
import LogoImage from '../assets/monochrome-icon.png';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
// import Auth from '../services/auth';
// Progress Bar - Consider not using
const MyProgressBar = () => (
    <ProgressBar progress={0.3} styleAttr="Horizontal" indeterminate={true} color='rgba(100,10,10,1)'/>
)

const slides = [
  {
    key: 1,
    title: 'Exclusive Augustana Community',
    text: 'Join Pelican, the exclusive marketplace app for Augustana College students. \n Buy, sell, and connect within your Augustana community for a safer and more transparent marketplace experience.',
    image: require('../assets/onboarding-1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 2,
    title: 'Secure Messaging System',
    text: 'Chat directly with sellers to negotiate prices and ask questions about products or services. \n Pelican\'s secure messaging system ensures safe and transparent communication between buyers and sellers.',
    image: require('../assets/onboarding-2.png'),
    backgroundColor: '#fff',
  },
  {
    key: 3,
    title: 'Rate Your Experience',
    text: 'Rate your buying or selling experience to help maintain a positive and trustworthy community.\n Your ratings contribute to building a reliable network within the Augie Marketplace App.',
    image: require('../assets/onboarding-3.png'),
    backgroundColor: '#fff',
  }
];
 
export default function Onboarding() {
  const [showRealApp, setShowRealApp] = useState(false);
  // const navigation = useNavigation();
  const router = useRouter();
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image}/>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });
    setShowRealApp(true);
  };
//   render() {
    // if (showRealApp) {
    //     return (
    //       <View style={styles.container}>
    //         <Text style={styles.title}>WELCOME TO{'\n'}PELICAN MARKETPLACE</Text>
    //         <Image style={styles.image} source={LogoImage}/>
    //         <TouchableOpacity
    //           style={styles.button}
    //           // onPress={() => navigation.navigate('Auth')}
    //           // onPress={() => router.replace(Auth)}
    //           // onPress={nextPage}
              
    //         >
    //           <Text style={styles.buttonText}>Get Started</Text>
    //         </TouchableOpacity>
    //       </View>
    //     );
    // } else {
    //   return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
      return <AppIntroSlider renderItem={this._renderItem} data={slides}/>;
    // }
//   }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff2',
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9DD6EB',
      paddingHorizontal: 20
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginVertical: 32,
      marginBottom: 30,
    },
    text: {
      marginBottom: 70,
      textAlign: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#000092',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
  });