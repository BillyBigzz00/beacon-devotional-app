import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import DailySpotlight from '@/components/DailySpotlight';
import { MOCK_DEVOTIONALS } from '@/mocks/devotional';

export default function DevotionalScreen() {
  const { colors } = useApp();
  const router = useRouter();
  const { devotionalId } = useLocalSearchParams<{ devotionalId: string }>();

  const devotional = MOCK_DEVOTIONALS.find(d => d.id === devotionalId);

  if (!devotional) {
    router.back();
    return null;
  }

  const handleReflect = () => {
    router.push({
      pathname: '/reflect',
      params: { 
        devotionalId: devotional.id,
        verseReference: devotional.verses[0].reference,
      },
    } as any);
  };

  const handleShare = () => {
    router.push({
      pathname: '/share',
      params: { devotionalId: devotional.id },
    } as any);
  };

  const handleUpgrade = () => {
    router.push('/premium' as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <DailySpotlight
          devotional={devotional}
          onReflect={handleReflect}
          onShare={handleShare}
          onUpgrade={handleUpgrade}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
