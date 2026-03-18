import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ChevronRight, Check } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { BIBLE_TRANSLATIONS } from '@/constants/translations';
import CrossIcon, { CrossBackground } from './CrossIcon';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { colors, isDark, setTranslation, selectedTranslation, completeOnboarding } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentPage < 2) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.5, duration: 150, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      
      scrollViewRef.current?.scrollTo({ x: width * (currentPage + 1), animated: true });
      setCurrentPage(currentPage + 1);
    } else {
      completeOnboarding();
      onComplete();
    }
  };

  const handleSelectTranslation = (id: string) => {
    setTranslation(id);
  };

  const renderPage1 = () => (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark 
          ? ['rgba(212,175,55,0.1)', 'transparent'] 
          : ['rgba(26,37,51,0.08)', 'transparent']}
        style={styles.pageGradient}
      />
      <CrossBackground 
        size={350} 
        color={isDark ? 'rgba(212,175,55,0.05)' : 'rgba(26,37,51,0.04)'} 
        style={styles.pageCross}
      />
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: isDark ? 'rgba(212,175,55,0.15)' : 'rgba(26,37,51,0.08)' }]}>
          <CrossIcon size={64} color={colors.accent} strokeWidth={4} />
        </View>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Welcome to Beacon</Text>
      <Text style={[styles.subtitle, { color: colors.accent }]}>{"Scripture meeting today's world"}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Every day, discover one curated news story paired with timeless biblical wisdom. 
        No politics, no sensationalism—just meaningful reflection grounded in Scripture.
      </Text>
    </View>
  );

  const renderPage2 = () => (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark 
          ? ['rgba(212,175,55,0.1)', 'transparent'] 
          : ['rgba(26,37,51,0.08)', 'transparent']}
        style={styles.pageGradient}
      />
      <Text style={[styles.pageTitle, { color: colors.text }]}>Choose Your Translation</Text>
      <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
        Select your preferred Bible translation. You can change this anytime in settings.
      </Text>
      <ScrollView 
        style={styles.translationList} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.translationListContent}
      >
        {BIBLE_TRANSLATIONS.map((translation) => (
          <TouchableOpacity
            key={translation.id}
            style={[
              styles.translationItem,
              { 
                backgroundColor: colors.card,
                borderColor: selectedTranslation === translation.id ? colors.accent : colors.border,
                borderWidth: selectedTranslation === translation.id ? 2 : 1,
              }
            ]}
            onPress={() => handleSelectTranslation(translation.id)}
            activeOpacity={0.7}
          >
            <View style={styles.translationInfo}>
              <Text style={[styles.translationAbbr, { color: colors.accent }]}>
                {translation.abbreviation}
              </Text>
              <Text style={[styles.translationName, { color: colors.text }]}>
                {translation.name}
              </Text>
              <Text style={[styles.translationDesc, { color: colors.textMuted }]}>
                {translation.description}
              </Text>
            </View>
            {selectedTranslation === translation.id && (
              <View style={[styles.checkIcon, { backgroundColor: colors.accent }]}>
                <Check size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPage3 = () => (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark 
          ? ['rgba(212,175,55,0.1)', 'transparent'] 
          : ['rgba(26,37,51,0.08)', 'transparent']}
        style={styles.pageGradient}
      />
      <CrossBackground 
        size={350} 
        color={isDark ? 'rgba(212,175,55,0.05)' : 'rgba(26,37,51,0.04)'} 
        style={styles.pageCross}
      />
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, { backgroundColor: isDark ? 'rgba(212,175,55,0.15)' : 'rgba(26,37,51,0.08)' }]}>
          <Bell size={64} color={colors.accent} strokeWidth={1.5} />
        </View>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Daily Reminders</Text>
      <Text style={[styles.subtitle, { color: colors.accent }]}>Start each day with purpose</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Receive a gentle notification each morning with your daily reflection. 
        You can customize the time or disable notifications in settings.
      </Text>
      <View style={[styles.notificationPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.notificationIcon, { backgroundColor: colors.accentNavy }]}>
          <CrossIcon size={20} color="#D4AF37" strokeWidth={2} />
        </View>
        <View style={styles.notificationText}>
          <Text style={[styles.notificationTitle, { color: colors.text }]}>Beacon</Text>
          <Text style={[styles.notificationBody, { color: colors.textSecondary }]}>
            Your daily reflection is ready
          </Text>
        </View>
        <Text style={[styles.notificationTime, { color: colors.textMuted }]}>7:00 AM</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {renderPage1()}
          {renderPage2()}
          {renderPage3()}
        </ScrollView>
      </Animated.View>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <View style={styles.pagination}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: currentPage === index ? colors.accent : colors.border },
                currentPage === index && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.accentNavy }]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === 2 ? 'Get Started' : 'Continue'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width,
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  pageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  pageCross: {
    position: 'absolute',
    top: 60,
    right: -80,
    opacity: 0.6,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Georgia',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 17,
    lineHeight: 28,
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'Georgia',
  },
  pageSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  translationList: {
    flex: 1,
  },
  translationListContent: {
    paddingBottom: 20,
  },
  translationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  translationInfo: {
    flex: 1,
  },
  translationAbbr: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  translationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  translationDesc: {
    fontSize: 13,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 40,
    borderWidth: 1,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationBody: {
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 50,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 28,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8,
  },
});
