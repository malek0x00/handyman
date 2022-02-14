import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider,Button,VStack ,HStack} from "native-base";
import { AntDesign } from '@expo/vector-icons';

export default function Login() {
  return (
    <NativeBaseProvider>

    <View style={styles.container}>
    <VStack space={4} alignItems="center">
      <Button _text={{color:'#ffffff'}} variant="outline" borderColor="white" startIcon={<AntDesign name="google" size={24} color="white" style={{}} />} style={{height:50, width:315}}>Sign in with google</Button>
      <HStack space={4} >
        <Button style={{height:50, width:150,backgroundColor:'#3d3d3d'}}>butt 1</Button>
        
      </HStack>
    </VStack>
    </View>

    </NativeBaseProvider>
  );
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
