import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/reducers'
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { AuthContext } from './src/authContext'

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getAsync = async () => {
      let isLoggedIn;

      try {
        isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if(isLoggedIn){
          setLoggedIn(isLoggedIn);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log('failed');
      }
    };

    getAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: () => {
       AsyncStorage.setItem('isLoggedIn','true');
       setLoggedIn(true)
      },
      signOut: () => {
        AsyncStorage.removeItem('isLoggedIn');
        setLoggedIn(false)
       },
    }),
    []
  );

  if(loading){
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={createStore(rootReducer)}>
        <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn == false ? (
              <Stack.Screen name="SignIn"  component={SignInScreen} />
            ) : (
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </AuthContext.Provider>
  );
}