import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack, Select } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/5.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Signup3({ navigation }) {



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

  const [city, setCity] = useState('ariana');
  
  async function goBack(){
    try {
        const value = await AsyncStorage.getItem('job')
        if(value !== null) {
            navigation.navigate("Signup2");
        }
        else{
            navigation.navigate("Signup2");
        }
      } catch(e) {
        // error reading value
      }
     
   }

  async function goNext(){
   await storeData(city);
    navigation.navigate("Signup4");
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('city', value)
    } catch (e) {
      // saving error
    }
  }
  


  if (!isLoaded('nexa')) {
    return <Text>LOADING</Text>;
  }
  else {

    return (
      <NativeBaseProvider theme={theme}>

        <View style={styles.container}>

          <VStack space={10} alignItems="center" style={{ width: '90%' }}>
            <Text fontSize={30} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -60, alignSelf: 'flex-start', left: '5%' }}>where do you currently live?</Text>
            <Media height={300} width={300}/>
            <HStack space={5} w={'100%'}>
              <Text fontSize={30} color={'#fff'} top={-2}>I'm currently in</Text>
              <Select defaultValue={city} w={100} fontSize={15} color={'#fff'} onValueChange={e => {setCity(e)}}>
                <Select.Item  label="Ariana" value="ariana"/>
                <Select.Item  label="Béja" value="beja"/>
                <Select.Item  label="Ben Arous" value="Ben Arous"/>
                <Select.Item  label="Bizerte" value="Bizerte"/>
                <Select.Item  label="Gabès" value="Gabès"/>
                <Select.Item  label="Gafsa" value="Gafsa"/>
                <Select.Item  label="Jendouba" value="Jendouba"/>
                <Select.Item  label="Kairouan" value="Kairouan"/>
                <Select.Item  label="Kasserine" value="Kasserine"/>
                <Select.Item  label="Kébili" value="Kébili"/>
                <Select.Item  label="Kef" value="Kef"/>
                <Select.Item  label="Mahdia" value="Mahdia"/>
                <Select.Item  label="Manouba" value="Manouba"/>
                <Select.Item  label="Médenine" value="Médenine"/>
                <Select.Item  label="Monastir" value="Monastir"/>
                <Select.Item  label="Nabeul" value="Nabeul"/>
                <Select.Item  label="Sfax" value="Sfax"/>
                <Select.Item  label="Sidi Bouzid" value="Sidi Bouzid"/>
                <Select.Item  label="Siliana" value="Siliana"/>
                <Select.Item  label="Sousse" value="Sousse"/>
                <Select.Item  label="Tataouine" value="Tataouine"/>
                <Select.Item  label="Tozeur" value="Tozeur"/>
                <Select.Item  label="Tunis" value="Tunis"/>
                <Select.Item  label="Zaghouan" value="Zaghouan"/>
                
              </Select>
            </HStack>
            
            </VStack>
            <HStack space={5} style={{position: 'absolute', bottom: 20, left:10,alignItems:'center'}} w={'100%'}>
            <Button variant='ghost' style={{ height: 55, width: '45%', borderRadius: 30 }} _text={{ fontFamily: 'nexa', fontSize: '20px', color:'#fff' }}  onPress={() => goBack()}>Back</Button>
            
            <Button  style={{height: 55, width: '45%', backgroundColor: '#000', borderRadius: 30 }} _text={{ fontFamily: 'nexa', fontSize: '20px' }}  onPress={() => goNext()}>Next</Button>
            </HStack>
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
