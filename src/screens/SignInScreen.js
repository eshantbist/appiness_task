import * as React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../authContext';

function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [signInError, setSignInError] = React.useState('')
    const { signIn } = React.useContext(AuthContext);

    const handleClick = () => {
        setLoading(true);
        setTimeout(()=>{
            if(username === 'hruday@gmail.com' && password === 'hruday123'){
                signIn();
            }
            else {
                setSignInError('* Invalid Email or Password')
            }
            setLoading(false);
        },500)
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          placeholderTextColor='rgba(225,225,225,0.8)'
          placeholder="Username"
          value={username}
          onFocus={()=>setSignInError('')}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='rgba(225,225,225,0.8)'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          onFocus={()=>setSignInError('')}
          secureTextEntry
        />
        {signInError!='' && <Text style={styles.errorText}>{signInError}</Text>}
        <TouchableOpacity disabled={loading} onPress={handleClick} style={styles.buttonContainer}>
            {loading ? <ActivityIndicator color={'#fff'}/> : <Text style={styles.buttonText}>SIGN IN</Text>}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

export default SignInScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'rgba(78, 161, 181,1)',
        justifyContent:'center'
    },
    input:{
        height:40,
        backgroundColor:'rgba(225,225,225,0.2)',
        marginBottom:10,
        padding:10,
        color:'#fff',
        borderColor:'rgba(78, 255, 255,0.2)',
        borderWidth:1
    },
    buttonContainer:{
        backgroundColor:'#2980b6',
        paddingVertical:15
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'700'
    },
    errorText:{
        color:'red',
        marginBottom:10
    }
})