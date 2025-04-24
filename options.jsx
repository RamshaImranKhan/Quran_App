import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const OptionsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { surahNumber, surahName } = params;

  const handleEnglishTranslation = () => {
    console.log('Navigating to English Translation with surah:', surahNumber);
    router.push({
      pathname: '/english-translation',
      params: { surahNumber }
    });
  };

  const handleUrduTranslation = () => {
    console.log('Navigating to Urdu Translation with surah:', surahNumber);
    router.push({
      pathname: '/urdu-translation',
      params: { surahNumber }
    });
  };

  const handleArabicTranslation = () => {
    console.log('Navigating to Arabic Translation with surah:', surahNumber);
    router.push({
      pathname: '/arabic-translation',
      params: { surahNumber }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Surah {surahName}</Text>
      <Text style={styles.subtitle}>Choose Translation Language</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={handleArabicTranslation}
        >
          <Text style={styles.optionTitle}>Arabic Only</Text>
          <Text style={styles.optionDescription}>
            Read the Quran in Classical Arabic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionButton}
          onPress={handleEnglishTranslation}
        >
          <Text style={styles.optionTitle}>English Translation</Text>
          <Text style={styles.optionDescription}>
            Read the Quran with English translation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionButton}
          onPress={handleUrduTranslation}
        >
          <Text style={styles.optionTitle}>Urdu Translation</Text>
          <Text style={styles.optionDescription}>
            Read the Quran with Urdu translation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E5C6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  optionsContainer: {
    gap: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

export default OptionsScreen;
