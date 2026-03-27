import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import SettingsScreen from '@/components/SettingsScreen';

export default function SettingsTab() {
  const { colors } = useApp();
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/premium' as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <SettingsScreen onUpgrade={handleUpgrade} />
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
