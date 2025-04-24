import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import EnglishTranslation from '../screens/englishtranslation.jsx';

export default function EnglishTranslationRoute() {
  const params = useLocalSearchParams(); // Keep params if needed by EnglishTranslation component
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'English Translation',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />
      <EnglishTranslation />
    </>
  );
} 