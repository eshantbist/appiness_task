import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { userList } from '../utils/constants'
import { AuthContext } from '../authContext';
import { getUserList } from '../actions';
import { useDispatch, useSelector } from "react-redux";


export default function DashboardScreen(props){
    const [loading,setLoading] = React.useState(true)
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { signOut } = React.useContext(AuthContext);

    React.useEffect(() => {
        const getUsers = async () => {    
          setTimeout(()=>{
            dispatch(getUserList(userList));
            setLoading(false);
          },1000)
        };
        getUsers();
      }, []);

      
    if(loading){
        return(
            <View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
                <ActivityIndicator color={'#fff'} size='large' />    
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList 
                enableEmptySections={true}
                data={users}
                keyExtractor= {(item) => {
                    return item.id.toString();
                  }}
                renderItem={({item}) => {
                return (
                    <View>
                        <View style={styles.box}>
                        <Image style={styles.image} source={{uri: "https://gravatar.com/avatar/c821798ae9ec77b14fa364a020dcaa0c?s=400&d=mp&r=x"}} />
                            <View style={styles.boxContent}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.description}>{item.age} years</Text>
                                <Text style={styles.description}>{item.gender}</Text>
                                <Text style={styles.description}>{item.email}</Text>
                                <Text style={styles.description}>{item.phoneNo}</Text>
                            </View>
                        </View>
                    </View>
                )
                }}/>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={signOut}
                >
                <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height:100,
    },
    icon:{
      width:20,
      height:20,
      alignSelf:'center',
      marginRight:10
    },
    box: {
      padding:20,
      marginTop:5,
      marginBottom:5,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius:5,
      shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation:2
    },
    boxContent: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft:10,
    },
    description:{
      fontSize:15,
      color: "#646464",
    },
    title:{
      fontSize:18,
      color:"#151515",
    },
    container:{
        flex:1,
        padding:15,
        paddingBottom:20,
        backgroundColor:'rgba(78, 100, 181,0.3)',
    },
    floatingButton:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        position: 'absolute',                                          
        bottom: 30,                                                    
        right: 10,
        borderWidth:1,
        borderColor:'rgba(78, 200, 181,1)',
        borderRadius:50,
        zIndex:999,
        elevation:4,
        shadowColor: 'gray',
        backgroundColor:'rgba(78, 161, 181,1)',
        shadowOffset: { width: 8, height: 5 },
        shadowOpacity: 1,
    },
    logoutText:{
        fontWeight:'700',
        color:'#fff'
    }
})