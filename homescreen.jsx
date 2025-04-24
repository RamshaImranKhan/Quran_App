import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      setSurahs(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surahs:', error);
      setLoading(false);
    }
  };

  const handleSurahPress = (surah) => {
    router.push({
      pathname: '/options',
      params: { 
        surahNumber: surah.number,
        surahName: surah.englishName
      }
    });
  };

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={styles.surahItem}
      onPress={() => handleSurahPress(item)}
    >
      <View style={styles.surahNumber}>
        <Text style={styles.numberText}>{item.number}</Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={styles.surahName}>{item.name}</Text>
        <Text style={styles.surahTranslation}>{item.englishName}</Text>
        <Text style={styles.surahDetails}>
          {item.numberOfAyahs} Verses • {item.revelationType}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quran Surahs</Text>
      <FlatList
        data={surahs}
        renderItem={renderSurahItem}
        keyExtractor={(item) => item.number.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E5C6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahItem: {
    flexDirection: 'row',
    backgroundColor:  'white',
   
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#EBE0ED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  surahTranslation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  surahDetails: {
    fontSize: 14,
    color: '#888',
  },
});

export default HomeScreen;
