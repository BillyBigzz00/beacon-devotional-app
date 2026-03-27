import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import TopicsScreen from '@/components/TopicsScreen';

export default function TopicsPage() {
  const { colors } = useApp();
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleUpgrade = () => {
    router.push('/premium' as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <TopicsScreen onClose={handleClose} onUpgrade={handleUpgrade} />
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
