import { Stack } from 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homescreen';
import { View } from 'react-native';

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#4CAF50',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '700',
  },
};

export default function TabIndexLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen 
          name="index"
          options={{ 
            title: 'Quran App',
          }}
        />
        <Stack.Screen 
          name="options"
          options={{ 
            title: 'Choose Translation',
          }}
        />
        <Stack.Screen 
          name="urdu-translation"
          options={{ 
            title: 'Urdu Translation',
          }}
        />
        <Stack.Screen 
          name="english-translation"
          options={{ 
            title: 'English Translation',
          }}
        />
        <Stack.Screen 
          name="arabic-translation"
          options={{ 
            title: 'Arabic Text',
          }}
        />
      </Stack>
      <HomeScreen />
    </View>
  );
}
