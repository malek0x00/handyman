import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/2.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Signup1({ navigation }) {



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

  const [name, setName] = useState();
  
  async function goNext(){
   await storeData(name);
    navigation.navigate("Signup2");
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('name', value)
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

          <VStack space={10} alignItems="center" style={{ width: '100%' }}>
            <Text fontSize={30} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -60, alignSelf: 'flex-start', left: '10%' }}>Tell us a little about yourself</Text>
            <Media height={300} width={300}/>
            <HStack space={5} w={'80%'}>
              <Text fontSize={30} color={'#fff'} top={1.5}>my name is</Text>
              <Input value={name} onChangeText={e => setName(e)} variant="underlined" placeholder="name..." fontSize={30} color={'#fff'} placeholderTextColor={'#eeeeee'} w={'45%'}></Input>
            </HStack>
            
            </VStack>
            <HStack space={5} style={{position: 'absolute', bottom: 20, left:10,alignItems:'center'}} w={'100%'}>
            <Button variant='ghost' style={{ height: 55, width: '45%', borderRadius: 30 }} _text={{ fontFamily: 'nexa', fontSize: '20px', color:'#fff' }}  onPress={() => navigation.navigate('Home')}>Back</Button>
            
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
