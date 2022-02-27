import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack, Select, InputGroup,InputLeftAddon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/6.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupWorker2({ navigation }) {



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

  const [phone, setPhone] = useState();
  
  async function goNext(){
   await storeData(phone);
    navigation.navigate("Signup3");
  }

  async function goBack(){
    await storeData("");
  navigation.navigate('SignupWorker')
   }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('phone', value)
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
            <Text fontSize={30} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -60, alignSelf: 'flex-start', left: '5%' }}>what's your phone number?</Text>
            <Media height={300} width={300}/>
            <HStack space={5} alignItems="center" justifyContent="center" w={'100%'}>
            <InputGroup>
            <InputLeftAddon children={"+216"}  />
             <Input keyboardType="number-pad" w={'80%'} bgColor={'#fff'} color="#000" variant={'filled'} type={'number'} fontSize={15} onChangeText={e => {setPhone(e)}}/>
             </InputGroup>
              
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
