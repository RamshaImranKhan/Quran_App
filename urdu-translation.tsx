import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import UrduTranslation from '../screens/urdutranslation.jsx';

export default function UrduTranslationRoute() {
  const params = useLocalSearchParams(); // Keep params if needed by UrduTranslation component
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Urdu Translation',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <UrduTranslation />
    </>
  );
} 