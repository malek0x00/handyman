import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider,Button,VStack ,HStack, Heading} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import Welcomepic from '../media/1.svg';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function Home({ navigation }) {
    const [loaded] = useFonts({
        'nexa': require('../assets/fonts/NexaBold.otf'),
        'nexaLight': require('../assets/fonts/NexaLight.otf'),
        'nexaThin': require('../assets/fonts/NexaThin.otf'),
        'nexaRegular': require('../assets/fonts/NexaRegular.otf'),
        'nexaHeavy': require('../assets/fonts/NexaHeavy.otf'),
        'nexaBook': require('../assets/fonts/NexaBook.otf'),
        'nexaBlack': require('../assets/fonts/NexaBlack.otf'),
      });
      
      

      if (!isLoaded('nexa')) {
        return <Text>LOADING</Text>;
      }
      else{ 
  
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
    <Text style={{fontFamily: 'nexa', fontSize:30, color:'#fff', bottom:30}}>Welcome to Handyman</Text>
    <VStack space={4} alignItems="center">
    
    <Welcomepic height={300} width={300}/>
     <HStack space={4} mt={50} style={{bottom:-20}}>
        <Button onPress={() => navigation.navigate('Login')} style={{height:50, width:'45%',backgroundColor:'#000', borderRadius:25}} _text={{fontFamily: 'nexa', fontSize:'20px'}}>Login</Button>
        <Button onPress={() => navigation.navigate('Signup1')} variant="outline"  style={{height:50, width:'45%', borderColor:'#000', borderRadius:25}} _text={{fontFamily: 'nexa', color:'#000000',fontSize:'20px'}}>Signup</Button>
      </HStack>
    </VStack>
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
