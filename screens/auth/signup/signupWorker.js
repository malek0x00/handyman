import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack, Select } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/4.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupWorker({ navigation }) {



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

  const [job, setJob] = useState();
  
  async function goNext(){
   await storeData(job);
    navigation.navigate("Signup3");
  }

  async function goBack(){
    await storeData("");
  navigation.navigate('Signup2')
   }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('job', value)
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
            <Text fontSize={30} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -60, alignSelf: 'flex-start', left: '5%' }}>so, what do you do?</Text>
            <Media height={300} width={300}/>
            <HStack space={5} alignItems="center" justifyContent="center" w={'100%'}>
              <Text fontSize={30} color={'#fff'} top={-2}>I'm a</Text>
              <Select defaultValue={job} w={150} fontSize={15} color={'#fff'} onValueChange={e => {setJob(e)}}>
                <Select.Item  label="Electrician" value="electrician"/>
                <Select.Item  label="Carpenter" value="carpenter"/>
                <Select.Item  label="Painter" value="painter"/>
                <Select.Item  label="Plumber" value="plumber"/>
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
