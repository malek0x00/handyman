import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Avatar,Button, Select,Text, Input, ScrollView,extendTheme, Modal, Spinner } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { isLoaded, isLoading, useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import {supabase} from '../lib/supabase'
import Carpenter from '../media/carpenter.svg';
import Painter from '../media/painter.svg';
import Gardener from '../media/gardener.svg';
import Plumber from '../media/plumber.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';

export default function MainScreen({ navigation }) {



  const [loaded] = useFonts({
    'nexa': require('../assets/fonts/NexaBold.otf'),
    'nexaLight': require('../assets/fonts/NexaLight.otf'),
    'nexaThin': require('../assets/fonts/NexaThin.otf'),
    'nexaRegular': require('../assets/fonts/NexaRegular.otf'),
    'nexaHeavy': require('../assets/fonts/NexaHeavy.otf'),
    'nexaBook': require('../assets/fonts/NexaBook.otf'),
    'nexaBlack': require('../assets/fonts/NexaBlack.otf'),
  });

  const theme = extendTheme({

    fonts: {
      heading: 'nexaBlack',
      body: 'nexa',
      mono: 'nexaThin',

    },
  });
  const [usr, setUsr] = useState();
  const [info, setInfo] = useState();
  const [avtr, setAvtr] = useState(" ");
  const [showModal, setShowModal] = useState(false);

  const [ename, setEname] = useState('');
  const [email, setEmail] = useState('');
  const [ephone, setEphone] = useState('');
  const [ejob, setEjob] = useState('');
  const [ecity, setEcity] = useState('');
  const toast = useToast();


  useEffect(()=>{
    const user = supabase.auth.user()
    setUsr(user);
    if (usr){
        setAvtr(usr.email[0]);
        loadData()
    }
  },[usr,avtr])

  async function loadData(){
    const { data, error } = await supabase
      .from('users')
      .select()
      .match({uid: usr.id});
      //alert("data:"+JSON.stringify(data));
      setInfo(data);
      setEname(data[0].name)
      setEmail(data[0].email)
      setEphone(data[0].phone)
      setEcity(data[0].city)
      setEjob(data[0].job)
    }

    async function handleEdit(){
      let newdata = {name:ename, email:email, phone:ephone, city:ecity, job:ejob}
      alert(JSON.stringify(newdata));
      const { data, error } = await supabase
      .from('users')
      .update(newdata)
      .match({ uid: usr.id })
      toast.show({description:'yes'})
    }

    

  let colorstab = ["green.500", "red.500", "violet.500", "pink.500","green.700", "red.700", "violet.700", "pink.700","green.200", "red.200", "violet.200", "pink.200"]
  if (!info){
    return(
      <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
      <Spinner color={"#fff"} />
      </View>
      </NativeBaseProvider>
    );
  }
  else{
  return (
    <NativeBaseProvider theme={theme}>

      <View style={styles.container}>
      <View style={{position: 'absolute', top: '5%', alignSelf: 'flex-start', right: '5%' }}>
      <Avatar bg={colorstab[Math.floor(Math.random() * colorstab.length)]} mr="1" onStartShouldSetResponder={() => (setShowModal(true))}>
        {avtr}
      </Avatar>
      </View>
      <ScrollView w={'100%'} height={'1%'} marginTop={'30%'} >
        <View style={{width:'100%', display:'flex',flexDirection:'row', height:140,left:-50,backgroundColor:'#f9b126', borderRadius:30}}  onStartShouldSetResponder={() => navigation.navigate('GardenerScreen')}>
        <Gardener height={120} style={{ marginLeft:-60, marginTop:10}} />
        <Text style={{display:'flex', alignSelf:'flex-start', top:'11%', left:-110}} color={'#151e34'} fontSize={32}>Gardener</Text>
        </View>
        
        

        <View style={{width:'100%', right:-50, display:'flex',flexDirection:'row',marginTop:30,height:140, backgroundColor:'#cbeddd', borderRadius:30}}  onStartShouldSetResponder={() => navigation.navigate('PainterScreen')}>
        <Text style={{display:'flex', alignSelf:'flex-start', top:'11.5%', left:50}} color={'#363e8d'} fontSize={32}>Painter</Text>
        <Painter height={120} style={{ marginLeft:-30, marginTop:10}}/>  
        </View>

        

        <View style={{width:'100%', display:'flex',flexDirection:'row',height:140, marginTop:30,left:-50,backgroundColor:'#f6836b', borderRadius:30}}  onStartShouldSetResponder={() => navigation.navigate('CarpenterScreen')}>
        <Carpenter height={120} style={{ marginLeft:-60, marginTop:10}}/>
        <Text style={{display:'flex', alignSelf:'flex-start',top:'11%', left:-110}} color={'#30526a'} fontSize={32}>Carpenter</Text>
        </View>
        

        <View style={{width:'100%', right:-50, display:'flex',flexDirection:'row',marginTop:30,height:140, backgroundColor:'#caeefb', borderRadius:30}}  onStartShouldSetResponder={() => navigation.navigate('PlumberScreen')}>
        <Text style={{display:'flex', alignSelf:'flex-start', top:'11.5%', left:50}} color={'#3d3361'} fontSize={32}>Plumber</Text>
        <Plumber height={120} style={{ marginLeft:-50, marginTop:20}}/>
        </View>
        
        </ScrollView>
        
        

      </View>

      <Modal size={'xl'} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500">
          <Modal.CloseButton />
          <Modal.Header>Profile</Modal.Header>
          <Modal.Body>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <Text style={{width:'20%'}}>name:</Text>
            <Input onChangeText={(e)=>{setEname(e)}} value={ename} borderRadius={10} w={"80%"} variant="filled" size="lg" backgroundColor={'gray.200'}/>
            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <Text style={{width:'20%'}}>email:</Text>
            <Input isDisabled value={email} borderRadius={10} w={"80%"} variant="filled" size="lg" backgroundColor={'gray.200'}/>
            </View>
            
            
            {info[0].job? 
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <Text style={{width:'20%'}}>job:</Text>
            <Select fontSize={15} w={"66.5%"} borderRadius={10} size="lg" color={'#000'} backgroundColor={'gray.200'}>
                <Select.Item  label="Carpenter" value="carpenter"/>
                <Select.Item  label="Gardener" value="gardener"/>
                <Select.Item  label="Painter" value="painter"/>
                <Select.Item  label="Plumber" value="plumber"/>
              </Select></View>:<></>}
            
            
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <Text style={{width:'20%'}}>phone:</Text>
            <Input onChangeText={(e)=>{setEphone(e)}} value={ephone} borderRadius={10} w={"80%"} backgroundColor={'gray.200'} variant="filled" size="lg"/>
            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:10}}>
            <Text style={{width:'20%'}}>city:</Text>
            <Select onChangeText={(e)=>{setEcity(e)}} defaultValue={ecity} size="lg" w={"66.5%"} backgroundColor={'gray.200'} borderRadius={10}  color={'#000'}>
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
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              handleEdit();
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        
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
