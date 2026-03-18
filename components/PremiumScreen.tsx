import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  X, 
  Headphones, 
  Download, 
  Sparkles, 
  CheckCircle,
  Shield,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { usePurchases } from '@/contexts/PurchaseContext';
import CrossIcon, { CrossBackground } from './CrossIcon';

interface PremiumScreenProps {
  onClose: () => void;
}

export default function PremiumScreen({ onClose }: PremiumScreenProps) {
  const { colors, isDark } = useApp();
  const {
    isPremium,
    monthlyPackage,
    annualPackage,
    isLoadingOfferings,
    isPurchasing,
    isRestoring,
    purchasePackage,
    restorePurchases,
  } = usePurchases();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const features = [
    { 
      icon: <Headphones size={24} color={colors.accent} strokeWidth={2} />,
      title: 'Audio Narration',
      description: 'Listen to verses and reflections read aloud'
    },
    { 
      icon: <Download size={24} color={colors.accent} strokeWidth={2} />,
      title: 'Offline Access',
      description: '90 days of content available without internet'
    },
    { 
      icon: <Sparkles size={24} color={colors.accent} strokeWidth={2} />,
      title: 'Deeper Reflections',
      description: 'Extended teaching with more biblical context'
    },
    { 
      icon: <Shield size={24} color={colors.accent} strokeWidth={2} />,
      title: 'Ad-Free Experience',
      description: 'Uninterrupted, focused reflection time'
    },
  ];

  const monthlyPrice = monthlyPackage?.product?.priceString ?? '$9.99';
  const annualPrice = annualPackage?.product?.priceString ?? '$59.99';
  const annualMonthly = annualPackage?.product?.price
    ? `$${(annualPackage.product.price / 12).toFixed(2)}`
    : '$4.99';

  const handlePurchase = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (Platform.OS === 'web') {
      Alert.alert(
        'Not Available on Web',
        'Please open the Beacon app on your iPhone or Android device to subscribe.',
      );
      return;
    }
    
    const pkg = selectedPlan === 'annual' ? annualPackage : monthlyPackage;
    if (!pkg) {
      console.log('[Premium] No package available for:', selectedPlan);
      Alert.alert(
        'Plans Unavailable',
        'Subscription plans are not available right now. Please check your internet connection and try again.',
        [
          { text: 'OK' },
          { text: 'Retry', onPress: () => { /* trigger refetch */ } },
        ],
      );
      return;
    }
    purchasePackage(pkg);
  };

  const handleRestore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    restorePurchases();
  };

  if (isPremium) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: colors.card }]} 
          onPress={onClose}
          activeOpacity={0.7}
        >
          <X size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.alreadyPremium}>
          <CrossIcon size={64} color={colors.accent} strokeWidth={4} />
          <Text style={[styles.alreadyPremiumTitle, { color: colors.text }]}>
            You're Premium
          </Text>
          <Text style={[styles.alreadyPremiumSubtitle, { color: colors.textSecondary }]}>
            Thank you for supporting Beacon. Enjoy your enhanced faith experience.
          </Text>
        </View>
      </View>
    );
  }

  const isProcessing = isPurchasing || isRestoring;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity 
        style={[styles.closeButton, { backgroundColor: colors.card }]} 
        onPress={onClose}
        activeOpacity={0.7}
      >
        <X size={24} color={colors.text} strokeWidth={2} />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={isDark 
            ? ['rgba(212,175,55,0.15)', 'transparent'] 
            : ['rgba(26,37,51,0.1)', 'transparent']}
          style={styles.headerGradient}
        />

        <CrossBackground 
          size={400} 
          color={isDark ? 'rgba(212,175,55,0.04)' : 'rgba(26,37,51,0.03)'} 
          style={styles.backgroundCross}
        />

        <View style={styles.header}>
          <View style={[styles.crownCircle, { backgroundColor: isDark ? 'rgba(212,175,55,0.15)' : 'rgba(26,37,51,0.08)' }]}>
            <CrossIcon size={48} color={colors.accent} strokeWidth={4} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Beacon Premium</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Deepen your daily faith experience
          </Text>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View 
              key={index} 
              style={[styles.featureItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.featureIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
                {feature.icon}
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {isLoadingOfferings ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.accent} />
            <Text style={[styles.loadingText, { color: colors.textMuted }]}>Loading plans...</Text>
          </View>
        ) : (
          <>
            <View style={styles.plans}>
              <TouchableOpacity
                style={[
                  styles.planCard,
                  { 
                    backgroundColor: colors.card, 
                    borderColor: selectedPlan === 'annual' ? colors.accent : colors.border,
                    borderWidth: selectedPlan === 'annual' ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedPlan('annual')}
                activeOpacity={0.8}
              >
                {selectedPlan === 'annual' && (
                  <View style={[styles.bestValueBadge, { backgroundColor: colors.accentNavy }]}>
                    <Text style={styles.bestValueText}>BEST VALUE</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={[styles.planTitle, { color: colors.text }]}>Annual</Text>
                  {selectedPlan === 'annual' && (
                    <CheckCircle size={24} color={colors.accent} strokeWidth={2} />
                  )}
                </View>
                <View style={styles.planPricing}>
                  <Text style={[styles.planPrice, { color: colors.text }]}>{annualPrice}</Text>
                  <Text style={[styles.planPeriod, { color: colors.textMuted }]}>/year</Text>
                </View>
                <Text style={[styles.planSavings, { color: colors.accentSage }]}>
                  Save 50% ({annualMonthly}/month)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.planCard,
                  { 
                    backgroundColor: colors.card, 
                    borderColor: selectedPlan === 'monthly' ? colors.accent : colors.border,
                    borderWidth: selectedPlan === 'monthly' ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedPlan('monthly')}
                activeOpacity={0.8}
              >
                <View style={styles.planHeader}>
                  <Text style={[styles.planTitle, { color: colors.text }]}>Monthly</Text>
                  {selectedPlan === 'monthly' && (
                    <CheckCircle size={24} color={colors.accent} strokeWidth={2} />
                  )}
                </View>
                <View style={styles.planPricing}>
                  <Text style={[styles.planPrice, { color: colors.text }]}>{monthlyPrice}</Text>
                  <Text style={[styles.planPeriod, { color: colors.textMuted }]}>/month</Text>
                </View>
                <Text style={[styles.planSavings, { color: colors.textMuted }]}>
                  Flexible monthly billing
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.subscribeButton, { backgroundColor: colors.accentNavy, opacity: isProcessing ? 0.7 : 1 }]}
              onPress={handlePurchase}
              disabled={isProcessing}
              activeOpacity={0.9}
            >
              {isPurchasing ? (
                <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 10 }} />
              ) : (
                <CrossIcon size={20} color="#D4AF37" strokeWidth={2} style={styles.buttonCross} />
              )}
              <Text style={styles.subscribeButtonText}>
                {isPurchasing ? 'Processing...' : 'Start Premium'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={[styles.terms, { color: colors.textMuted }]}>
          Cancel anytime. Subscription auto-renews unless cancelled at least 24 hours before the end of the current period.
        </Text>

        <TouchableOpacity
          style={styles.restoreButton}
          activeOpacity={0.7}
          onPress={handleRestore}
          disabled={isRestoring}
        >
          {isRestoring ? (
            <ActivityIndicator size="small" color={colors.accent} />
          ) : (
            <Text style={[styles.restoreText, { color: colors.accent }]}>
              Restore Purchase
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  backgroundCross: {
    position: 'absolute',
    top: 40,
    right: -120,
    opacity: 0.5,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  crownCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    fontFamily: 'Georgia',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  plans: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  planCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  bestValueBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  bestValueText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  planPeriod: {
    fontSize: 14,
    marginLeft: 4,
  },
  planSavings: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  subscribeButton: {
    marginHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  buttonCross: {
    marginRight: 10,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 18,
    marginBottom: 16,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  restoreText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  alreadyPremium: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  alreadyPremiumTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    fontFamily: 'Georgia',
  },
  alreadyPremiumSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
