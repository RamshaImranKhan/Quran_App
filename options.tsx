import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import OptionsScreen from '../screens/options'; // Corrected path again

export default function OptionsRoute() {
  const params = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen 
        options={{
          // Use a type assertion or check if surahName exists
          title: params.surahName ? `${params.surahName}` : 'Options',
          headerStyle: {
            backgroundColor: '#E2E5C6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <OptionsScreen />
    </>
  );
} 