import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/7.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupFinal({ navigation }) {



  const [loaded] = useFonts({
    'nexa': require('../../../assets/fonts/NexaBold.otf'),
    'nexaLight': require('../../../assets/fonts/NexaLight.otf'),
    'nexaThin': require('../../../assets/fonts/NexaThin.otf'),
    'nexaRegular': require('../../../assets/fonts/NexaRegular.otf'),
    'nexaHeavy': require('../../../assets/fonts/NexaHeavy.otf'),
    'nexaBook': require('../../../assets/fonts/NexaBook.otf'),
    'nexaBlack': require('../../../assets/fonts/NexaBlack.otf'),
  });

  const theme = extendTheme({

    fonts: {
      heading: 'nexaBlack',
      body: 'nexa',
      mono: 'nexaThin',

    },
  });

  
  async function goNext(){
    navigation.navigate("Login");
  }
  

  if (!isLoaded('nexa')) {
    return <Text>LOADING</Text>;
  }
  else {

    return (
      <NativeBaseProvider theme={theme}>

        <View style={styles.container}>

          <VStack space={10} alignItems="center" style={{ width: '100%' }}>
            <Text fontSize={30} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -120, alignSelf: 'flex-start', left: 20 }}>Your account has been created.
             please login to continue</Text>
            <Media height={300} width={300}/>
            </VStack>
            <Button style={{height: 55, width: '60%', backgroundColor: '#000', borderRadius: 30, bottom:'10%', position:'absolute' }} _text={{ fontFamily: 'nexa', fontSize: '20px' }}  onPress={() => goNext()}>login</Button>
          
        </View>
          
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
});
