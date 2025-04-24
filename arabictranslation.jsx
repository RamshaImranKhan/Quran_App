import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const ArabicTranslation = () => {
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

      // Fetch only Arabic text
      const translationResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani`);
      setSurah(translationResponse.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching surah:', err);
      setError('خطأ في تحميل السورة: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#134E5E', '#71B280']}
        style={styles.backgroundGradient}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>جاري تحميل السورة {surahNumber}...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#134E5E', '#71B280']}
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
        colors={['#134E5E', '#71B280']}
        style={styles.backgroundGradient}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>لا تتوفر معلومات لهذه السورة</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#134E5E', '#71B280']}
      style={styles.backgroundGradient}
    >
      <ScrollView style={styles.container}>
        {/* Surah Header */}
        <View style={styles.surahHeaderContainer}>
          <View style={styles.decorativeLine} />
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <View style={styles.decorativeLine} />
          <Text style={styles.surahTitle}>{surahInfo.name}</Text>
          <View style={styles.surahInfoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>عدد الآيات</Text>
              <Text style={styles.infoValue}>{surahInfo.numberOfAyahs}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>نوع السورة</Text>
              <Text style={styles.infoValue}>
                {surahInfo.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
              </Text>
            </View>
          </View>
        </View>

        {/* Ayahs Section */}
        <View style={styles.ayahsContainer}>
          {surah[0].ayahs.map((ayah) => (
            <View key={ayah.number} style={styles.ayahContainer}>
              <Text style={styles.arabicText}>{ayah.text}</Text>
              <View style={styles.ayahNumberContainer}>
                <Text style={styles.ayahNumber}>{ayah.numberInSurah}</Text>
              </View>
            </View>
          ))}
        </View>
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
  surahHeaderContainer: {
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
    color: '#1A1A1A',
    marginVertical: 16,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  surahTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#134E5E',
    marginVertical: 16,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  surahInfoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 78, 94, 0.1)',
    borderRadius: 15,
    padding: 16,
    width: '90%',
    marginTop: 12,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#FFD700',
    marginHorizontal: 16,
  },
  infoLabel: {
    fontSize: 16,
    color: '#134E5E',
    marginBottom: 4,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
  infoValue: {
    fontSize: 20,
    color: '#134E5E',
    fontWeight: 'bold',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
  ayahsContainer: {
    marginTop: 20,
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
  arabicText: {
    fontSize: 32,
    lineHeight: 60,
    color: '#1A1A1A',
    textAlign: 'right',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
  ayahNumberContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#134E5E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },
  ayahNumber: {
    fontSize: 16,
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
    fontFamily: 'KFGQPC Uthman Taha Naskh',
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
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
});

export default ArabicTranslation; 