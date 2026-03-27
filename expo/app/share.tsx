import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import ShareCard from '@/components/ShareCard';
import { MOCK_DEVOTIONALS } from '@/mocks/devotional';

export default function ShareScreen() {
  const { colors } = useApp();
  const router = useRouter();
  const { devotionalId } = useLocalSearchParams<{ devotionalId: string }>();

  const devotional = MOCK_DEVOTIONALS.find(d => d.id === devotionalId) || MOCK_DEVOTIONALS[0];

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ShareCard devotional={devotional} onClose={handleClose} />
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
