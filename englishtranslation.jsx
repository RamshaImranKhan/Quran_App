import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const EnglishTranslation = () => {
  const [surah, setSurah] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useLocalSearchParams();
  const surahNumber = params.surahNumber || '1';

  useEffect(() => {
    fetchSurahData();
  }, [surahNumber]);

  const fetchSurahData = async () => {
    try {
      setLoading(true);
      // Fetch surah info
      const infoResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      setSurahInfo(infoResponse.data.data);

      // Fetch translations
      const translationResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih`);
      setSurah(translationResponse.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching surah:', err);
      setError('Failed to fetch Quran data: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#2C3E50', '#3498DB']}
        style={styles.backgroundGradient}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Loading Surah {surahNumber}...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#2C3E50', '#3498DB']}
        style={styles.backgroundGradient}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  if (!surah || !surahInfo) {
    return (
      <LinearGradient
        colors={['#2C3E50', '#3498DB']}
        style={styles.backgroundGradient}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data available for this surah</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#2C3E50', '#3498DB']}
      style={styles.backgroundGradient}
    >
      <ScrollView style={styles.container}>
        {/* Surah Information Section */}
        <View style={styles.surahInfoContainer}>
          <View style={styles.decorativeLine} />
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <View style={styles.decorativeLine} />
          <Text style={styles.surahTitle}>
            {surahInfo.englishName}
          </Text>
          <Text style={styles.surahSubtitle}>
            {surahInfo.name} • {surahInfo.englishNameTranslation}
          </Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Revelation Type</Text>
              <Text style={styles.detailValue}>{surahInfo.revelationType}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Number of Verses</Text>
              <Text style={styles.detailValue}>{surahInfo.numberOfAyahs}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Surah Number</Text>
              <Text style={styles.detailValue}>{surahInfo.number}</Text>
            </View>
          </View>
        </View>

        {/* Ayahs Section */}
        {surah[0].ayahs.map((ayah, index) => (
          <View key={ayah.number} style={styles.ayahContainer}>
            <View style={styles.arabicContainer}>
              <Text style={styles.arabicText}>{ayah.text}</Text>
            </View>
            <View style={styles.translationContainer}>
              <Text style={styles.translationText}>
                {surah[1]?.ayahs[index]?.text || 'Translation not available'}
              </Text>
              <View style={styles.ayahNumberContainer}>
                <Text style={styles.ayahNumber}>{ayah.numberInSurah}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  surahInfoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  decorativeLine: {
    height: 2,
    width: '80%',
    backgroundColor: '#FFD700',
    marginVertical: 12,
    borderRadius: 1,
  },
  bismillah: {
    fontSize: 36,
    color: '#2C3E50',
    marginVertical: 16,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  surahTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  surahSubtitle: {
    fontSize: 20,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: 'rgba(44, 62, 80, 0.1)',
    borderRadius: 15,
    padding: 16,
  },
  detailItem: {
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  ayahContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  arabicContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(44, 62, 80, 0.2)',
    paddingBottom: 16,
  },
  arabicText: {
    fontSize: 28,
    lineHeight: 50,
    color: '#2C3E50',
    textAlign: 'right',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
  translationContainer: {
    paddingTop: 8,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#34495E',
  },
  ayahNumberContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#2C3E50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },
  ayahNumber: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EnglishTranslation; 