import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/contexts/AppContext';
import OnboardingScreen from '@/components/OnboardingScreen';
import DailySpotlight from '@/components/DailySpotlight';
import SplashAnimation from '@/components/SplashAnimation';
import { getTodayDevotional } from '@/mocks/devotional';

export default function HomeScreen() {
  const { colors, hasCompletedOnboarding, isPremium, isLoading } = useApp();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(!hasCompletedOnboarding);
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);

  const devotional = getTodayDevotional();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

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

  const handleJournal = () => {
    router.push('/journal' as any);
  };

  const handleTopics = () => {
    router.push('/topics' as any);
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (showSplash && !hasCompletedOnboarding) {
    return <SplashAnimation onComplete={handleSplashComplete} />;
  }

  if (showOnboarding && !hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {isPremium && (
          <View style={styles.premiumHeader}>
            <View style={[styles.premiumIndicator, { backgroundColor: colors.accent }]}>
              <Text style={styles.premiumIndicatorText}>PREMIUM</Text>
            </View>
          </View>
        )}
        <DailySpotlight
          devotional={devotional}
          onReflect={handleReflect}
          onShare={handleShare}
          onUpgrade={handleUpgrade}
          onJournal={handleJournal}
          onTopics={handleTopics}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  premiumHeader: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 12,
  },
  premiumIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
  },
  premiumIndicatorText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
