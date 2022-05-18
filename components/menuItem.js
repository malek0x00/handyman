import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider,Button,VStack ,Spinner, extendTheme,Text, Avatar, Pressable, Modal} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import {useFonts } from 'expo-font';
import { MaterialIcons,Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import { useEffect, useState } from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { supabase } from '../lib/supabase';

function MenuItem(props) {
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
    let colorstab = ["green.500", "red.500", "violet.500", "pink.500","green.700", "red.700", "violet.700", "pink.700","green.200", "red.200", "violet.200", "pink.200"]
    //onPress={()=>{call({number:props.phone, prompt:true})}}
    const [showModal, setShowModal] = useState(false);
    const [ratev, setRatev] = useState(false);
    const [datar, setDatar] = useState();
    const [err, setErr] = useState();

    async function rate(){
      const user = supabase.auth.user()
      let newrate = null;
        let newcount = null;
      await getdata().then(()=>{
        
        if (datar[0]!==undefined){
          //newrate = ((datar[0].rating*datar[0].nr)+ratev)/datar[0].nr+1
          newrate = (datar[0].rating+ratev)/2
          newcount = datar[0].nr+1
        }
        else{
          newrate = ratev
          newcount = 1
        }
      })
      
      const { data, error } = await supabase
        .from('ratings')
        .upsert([{ id: props.uid,rating:newrate,nr:newcount }])
        
     
      
      
      //alert(JSON.stringify({ uid: props.uid,rating:e,nr:0 }))
        
    }

    async function getdata(){
      const { data, error } = await supabase
          .from('ratings')
          .select()
          .match({id: props.uid});
          //alert("data:"+JSON.stringify(data));
           
           setDatar(data);
           //alert(JSON.stringify(datar[0]))
    }
//    <Rating type='star' startingValue={datar[0].rating} style={{marginTop:10, marginLeft:-95}} readonly={true} ratingCount={5} imageSize={20}/>
          
    useEffect(()=>{
      getdata()
    },[])
      


    if (datar){

    

    return ( 
    <NativeBaseProvider theme={theme}>
    <Pressable style={{width:'100%', marginTop:10,marginBottom:20,height:150, display:'flex',justifyContent:'center',paddingLeft:15,backgroundColor:'#fff', borderRadius:15, shadowColor:'#000', elevation:10}} onPress={()=>{setShowModal(!showModal)}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <Avatar bg={props.avcolor} w={75} h={75}>{props.name[0]}</Avatar>
          <View  style={{marginLeft:20}}>
            <View style={{display:'flex', flexDirection:'row'}}>
            <Text fontSize={24} style={{marginBottom:10}}>{props.name}</Text>
              
            </View>
              <View style={{display:'flex', flexDirection:'row'}}>
                <MaterialIcons name="home" size={20} color="#aaa"/>
                <Text color={'#aaa'} style={{marginLeft:0}}> {props.city}     •    </Text>
                <MaterialIcons name="phone" size={20} color="#aaa"/>
                <Text color={'#aaa'} style={{marginLeft:0}}> {props.phone}</Text>
              </View>
              {datar[0]!==undefined? <Rating type='star' startingValue={datar[0].rating} style={{marginTop:10, marginLeft:-95}} readonly={true} ratingCount={5} imageSize={20}/>:<Rating type='star' startingValue={0} style={{marginTop:10, marginLeft:-95}} readonly={true} ratingCount={5} imageSize={20}/>}
          </View>
      </View>
    </Pressable>

    <Modal size={'xl'} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          
          <Modal.Body style={{backgroundColor:'#fff'}}>
            <View style={{dipslay:'flex', flexDirection:'row', alignItems:'center'}}>
              <Avatar bg={props.avcolor} w={75} h={75}>{props.name[0]}</Avatar>
              <Text fontSize={24} style={{marginLeft:10 }}>{props.name}</Text>
            </View>
            <View style={{marginLeft:30, marginTop:20}}>
            <Text color={"#808080"}>Description:</Text>
            <Text>{props.description?props.description:"no description available"}</Text>
            <View >
            <Rating type='star' startingValue={0} onFinishRating={(e)=>{setRatev(e)}} style={{marginTop:20, marginBottom:20}} readonly={false} ratingCount={5} imageSize={30}/>
            </View>
            <View>
              <Button onPress={()=>{call({number:props.phone, prompt:true})}} variant="ghost" _text={{color:'#7CB342'}} leftIcon={<Ionicons name="ios-call-outline" size={24} color="#7CB342"/>}>Call</Button>
            </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button _text={{color:"#0471A6"}} backgroundColor={"#ffffff00"}  onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button backgroundColor={"#0471A6"} onPress={() => {
              rate()
              setShowModal(false);
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
else {
  return(
    <NativeBaseProvider theme={theme}>
    <View style={{marginVertical:50}}>
    <Spinner color={"#fff"} />
    </View>
    </NativeBaseProvider>
    );
}

}


export default MenuItem;

