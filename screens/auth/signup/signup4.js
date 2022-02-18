import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Button, VStack, Text, Input, extendTheme, Heading, HStack, Select } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {supabase} from '../../../lib/supabase'
import Media from '../../../media/5.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Signup4({ navigation }) {



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

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCPass] = useState();
  const handleShow = () => setShow(!show);

  async function goNext(){
   //await storeData(type);
    navigation.navigate("Signup2");
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('city', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const type = await AsyncStorage.getItem('type');
      const job = await AsyncStorage.getItem('job');
      const city = await AsyncStorage.getItem('city');
      if(name !== null) {
        //alert("name: "+name+"\ntype: "+type+"\njob: "+job+"\ncity: "+city)
      }
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(() => {
    getData();
  })
  

  if (!isLoaded('nexa')) {
    return <Text>LOADING</Text>;
  }
  else {

    return (
      <NativeBaseProvider theme={theme}>

        <View style={styles.container}>

          <VStack space={10} alignItems="center" style={{ width: '100%' }}>
            <Text fontSize={18} style={{ fontFamily: 'nexa', color: '#fff', position: 'absolute', top: -60, alignSelf: 'flex-start', left: '5%' }}>alright, one last step, please provide an email and a password to create your account</Text>
            <Input onChangeText={e => setEmail(e)} leftElement={<MaterialIcons name="alternate-email" size={24} color="black" style={{ paddingLeft: 15 }} />} borderRadius={30} bgColor={'#fff'} w={"90%"} h={55} borderColor={'#000'} borderWidth={2} variant="filled" size="lg" placeholder="Your email..." />
            <Input onChangeText={e => setPass(e)} type={show ? "text" : "password"} leftElement={<MaterialIcons name="lock" size={24} color="black" style={{ paddingLeft: 15 }} />} borderRadius={30} bgColor={'#fff'} w={"90%"} h={55} borderColor={'#000'} borderWidth={2} variant="filled" size="lg" placeholder="Your password..." InputRightElement={<MaterialIcons name={show ? 'visibility-off' : 'visibility'} size={24} style={{ paddingRight: 15 }} onPress={handleShow} color="#000" />} />
            <Input onChangeText={e => setCPass(e)} type={show ? "text" : "password"} leftElement={<MaterialIcons name="lock" size={24} color="black" style={{ paddingLeft: 15 }} />} borderRadius={30} bgColor={'#fff'} w={"90%"} h={55} borderColor={'#000'} borderWidth={2} variant="filled" size="lg" placeholder="Repeat your password..." InputRightElement={<MaterialIcons name={show ? 'visibility-off' : 'visibility'} size={24} style={{ paddingRight: 15 }} onPress={handleShow} color="#000" />} />
            
            
            </VStack>
            <HStack space={5} style={{position: 'absolute', bottom: 20, left:10,alignItems:'center'}} w={'100%'}>
            <Button variant='ghost' style={{ height: 55, width: '45%', borderRadius: 30 }} _text={{ fontFamily: 'nexa', fontSize: '20px', color:'#fff' }}  onPress={() => navigation.navigate('Signup3')}>Back</Button>
            
            <Button  style={{height: 55, width: '45%', backgroundColor: '#000', borderRadius: 30 }} _text={{ fontFamily: 'nexa', fontSize: '14px' }}  onPress={() => goNext()}>Create your account</Button>
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
