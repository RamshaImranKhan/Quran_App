import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ArabicTranslation from '../screens/arabictranslation';

export default function ArabicTranslationRoute() {
  const params = useLocalSearchParams(); // Keep params if needed by ArabicTranslation component
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Arabic Text',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <ArabicTranslation />
    </>
  );
} 