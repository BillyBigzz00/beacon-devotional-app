import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import ReflectModal from '@/components/ReflectModal';

export default function ReflectScreen() {
  const { colors } = useApp();
  const router = useRouter();
  const { devotionalId, verseReference } = useLocalSearchParams<{
    devotionalId: string;
    verseReference: string;
  }>();

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ReflectModal
          devotionalId={devotionalId || ''}
          verseReference={verseReference || ''}
          onClose={handleClose}
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
