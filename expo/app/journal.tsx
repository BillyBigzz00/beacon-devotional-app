import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import JournalScreen from '@/components/JournalScreen';

export default function JournalPage() {
  const { colors } = useApp();
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleOpenDevotional = (devotionalId: string) => {
    router.push({
      pathname: '/devotional',
      params: { devotionalId },
    } as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <JournalScreen onClose={handleClose} onOpenDevotional={handleOpenDevotional} />
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
