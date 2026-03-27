import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,

  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Newspaper, PenLine, Share2, Crown, Sparkles, Flame, Clock, BookOpen, Heart, NotebookPen, Compass } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { DailyDevotional } from '@/mocks/devotional';
import AudioPlayer from './AudioPlayer';
import CrossIcon, { CrossBackground } from './CrossIcon';

interface DailySpotlightProps {
  devotional: DailyDevotional;
  onReflect: () => void;
  onShare: () => void;
  onUpgrade: () => void;
  onJournal?: () => void;
  onTopics?: () => void;
}

export default function DailySpotlight({ devotional, onReflect, onShare, onUpgrade, onJournal, onTopics }: DailySpotlightProps) {
  const { colors, isDark, selectedTranslation, isPremium, streak, recordVisit, addToHistory, toggleFavorite, isFavorite } = useApp();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const streakScaleAnim = useRef(new Animated.Value(0)).current;
  const streakGlowAnim = useRef(new Animated.Value(0)).current;
  const verseAnims = useRef(devotional.verses.map(() => new Animated.Value(0))).current;
  const buttonScaleAnims = useRef([new Animated.Value(1), new Animated.Value(1)]).current;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showSourceTooltip, setShowSourceTooltip] = useState(false);
  

  const favorite = isFavorite(devotional.id);

  useEffect(() => {
    recordVisit();
    addToHistory(devotional.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devotional.id]);

  useEffect(() => {
    streakScaleAnim.setValue(1);
    verseAnims.forEach(anim => anim.setValue(1));
    
    if (streak >= 3) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(streakGlowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(streakGlowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [streak, streakGlowAnim, streakScaleAnim, verseAnims]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
    if (hour < 21) return { text: 'Good Evening', emoji: '🌅' };
    return { text: 'Good Night', emoji: '🌙' };
  };

  const getReadingTime = () => {
    const reflection = isPremium && devotional.premiumReflection 
      ? devotional.premiumReflection 
      : devotional.reflection;
    const verseText = devotional.verses.map(v => v.text[selectedTranslation] || v.text['niv']).join(' ');
    const totalWords = (reflection.split(' ').length + verseText.split(' ').length);
    return Math.max(2, Math.ceil(totalWords / 200));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1000);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  };

  const handleButtonPressIn = (index: number) => {
    Animated.spring(buttonScaleAnims[index], {
      toValue: 0.95,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = (index: number) => {
    Animated.spring(buttonScaleAnims[index], {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleReflectPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onReflect();
  };

  const handleSharePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onShare();
  };

  const handleUpgradePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onUpgrade();
  };

  const handleFavoritePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(devotional.id);
  };

  const reflection = isPremium && devotional.premiumReflection 
    ? devotional.premiumReflection 
    : devotional.reflection;

  const versesForAudio = devotional.verses.map(v => ({
    reference: v.reference,
    text: v.text[selectedTranslation] || v.text['niv'],
  }));

  const greeting = getGreeting();
  const readingTime = getReadingTime();

  const streakGlow = streakGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.progressBar, { backgroundColor: isDark ? 'rgba(212,175,55,0.2)' : 'rgba(26,37,51,0.1)' }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              backgroundColor: colors.accent,
              width: `${scrollProgress * 100}%`,
            }
          ]} 
        />
      </View>

      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        
      >
        <LinearGradient
          colors={isDark 
            ? ['rgba(212,175,55,0.08)', 'transparent'] 
            : ['rgba(26,37,51,0.06)', 'transparent']}
          style={styles.headerGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <CrossBackground 
          size={300} 
          color={isDark ? 'rgba(212,175,55,0.04)' : 'rgba(26,37,51,0.03)'} 
          style={styles.backgroundCross}
        />

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.greetingContainer}>
            <Text style={[styles.greetingEmoji]}>{greeting.emoji}</Text>
            <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
              {greeting.text}
            </Text>
          </View>

          <View style={styles.statsRow}>
            {streak > 0 && (
              <Animated.View 
                style={[
                  styles.streakBadge, 
                  { 
                    backgroundColor: isDark ? 'rgba(255,100,50,0.15)' : 'rgba(255,100,50,0.1)',
                    transform: [{ scale: streakScaleAnim }, { scale: streak >= 3 ? streakGlow : 1 }],
                  }
                ]}
              >
                <Flame size={16} color="#FF6432" strokeWidth={2.5} fill="rgba(255,100,50,0.3)" />
                <Text style={[styles.streakText, { color: '#FF6432' }]}>
                  {streak} day{streak !== 1 ? 's' : ''}
                </Text>
              </Animated.View>
            )}
            
            <View style={[styles.readTimeBadge, { backgroundColor: isDark ? 'rgba(107,142,94,0.15)' : 'rgba(107,142,94,0.1)' }]}>
              <Clock size={14} color={colors.accentSage} strokeWidth={2} />
              <Text style={[styles.readTimeText, { color: colors.accentSage }]}>
                {readingTime} min read
              </Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <CrossIcon size={16} color={colors.accent} strokeWidth={2} />
            <Text style={[styles.date, { color: colors.textMuted }]}>
              {formatDate(devotional.date)}
            </Text>
            <CrossIcon size={16} color={colors.accent} strokeWidth={2} />
          </View>

          <View style={[styles.headlineCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.headlineHeader}>
              <View style={styles.headlineTitleRow}>
                <BookOpen size={18} color={colors.accent} strokeWidth={2} />
                <Text style={[styles.headlineLabel, { color: colors.accent }]}>{"TODAY'S STORY"}</Text>
              </View>
              <TouchableOpacity
                onPress={handleFavoritePress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={[styles.favoriteButton, { backgroundColor: favorite ? (isDark ? 'rgba(232,93,117,0.15)' : 'rgba(232,93,117,0.1)') : 'transparent' }]}
              >
                <Heart 
                  size={20} 
                  color={favorite ? '#E85D75' : colors.textMuted} 
                  fill={favorite ? '#E85D75' : 'transparent'}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.headline, { color: colors.text }]}>
              {devotional.headline}
            </Text>
            <View style={styles.sourceAttribution}>
              <View style={styles.sourceRow}>
                <Newspaper size={13} color={colors.textMuted} strokeWidth={2} />
                <Text style={[styles.sourceOutlet, { color: colors.textMuted }]}>
                  {devotional.source}
                </Text>
              </View>
              {devotional.articleTitle ? (
                <Text style={[styles.sourceTitle, { color: colors.textSecondary }]}>
                  {devotional.articleTitle}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.versesContainer}>
            {devotional.verses.map((verse, index) => (
              <Animated.View 
                key={index} 
                style={[
                  styles.verseBlock,
                  {
                    opacity: verseAnims[index],
                    transform: [{
                      translateX: verseAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0],
                      })
                    }],
                  }
                ]}
              >
                <View style={styles.verseReferenceContainer}>
                  <View style={[styles.referenceAccent, { backgroundColor: colors.accent }]} />
                  <Text style={[styles.verseReference, { color: colors.accent }]}>
                    {verse.reference}
                  </Text>
                </View>
                <Text style={[styles.verseText, { color: colors.text }]}>
                  {`"${verse.text[selectedTranslation] || verse.text['niv']}"`}
                </Text>
              </Animated.View>
            ))}
          </View>

          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <CrossIcon size={20} color={colors.accent} strokeWidth={2} />
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.reflectionContainer}>
            <View style={styles.reflectionHeader}>
              <Text style={[styles.reflectionLabel, { color: colors.accent }]}>
                {"Today's Reflection"}
              </Text>
              {isPremium && (
                <View style={[styles.deeperBadge, { backgroundColor: isDark ? 'rgba(107,142,94,0.2)' : 'rgba(107,142,94,0.15)' }]}>
                  <Sparkles size={12} color={colors.accentSage} strokeWidth={2} />
                  <Text style={[styles.deeperText, { color: colors.accentSage }]}>Deeper</Text>
                </View>
              )}
            </View>
            <Text style={[styles.reflectionText, { color: colors.text }]}>
              {reflection}
            </Text>
          </View>

          {isPremium && (
            <AudioPlayer verses={versesForAudio} reflection={reflection} devotionalId={devotional.id} />
          )}

          {isPremium && (
            <View style={styles.premiumQuickActions}>
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: isDark ? 'rgba(107,142,94,0.12)' : 'rgba(107,142,94,0.08)', borderColor: isDark ? 'rgba(107,142,94,0.25)' : 'rgba(107,142,94,0.15)' }]}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onJournal?.(); }}
                activeOpacity={0.7}
              >
                <NotebookPen size={20} color={colors.accentSage} strokeWidth={2} />
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>My Journal</Text>
                <Text style={[styles.quickActionSub, { color: colors.textSecondary }]}>View all entries</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.08)', borderColor: isDark ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.15)' }]}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onTopics?.(); }}
                activeOpacity={0.7}
              >
                <Compass size={20} color={colors.accent} strokeWidth={2} />
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>Topics</Text>
                <Text style={[styles.quickActionSub, { color: colors.textSecondary }]}>Explore tracks</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isPremium && (
            <TouchableOpacity
              style={[styles.premiumBanner, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)', borderColor: colors.accent }]}
              onPress={handleUpgradePress}
              activeOpacity={0.8}
            >
              <View style={styles.premiumContent}>
                <Crown size={20} color={colors.accent} strokeWidth={2} />
                <View style={styles.premiumTextContainer}>
                  <Text style={[styles.premiumTitle, { color: colors.accent }]}>
                    Go Premium
                  </Text>
                  <Text style={[styles.premiumSubtitle, { color: colors.textSecondary }]}>
                    Unlock deeper reflections, audio narration & offline access
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.actionButtons}>
            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScaleAnims[0] }] }]}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(212,175,55,0.1)' : 'transparent', borderColor: colors.accent }]}
                onPress={handleReflectPress}
                onPressIn={() => handleButtonPressIn(0)}
                onPressOut={() => handleButtonPressOut(0)}
                activeOpacity={1}
              >
                <PenLine size={18} color={colors.accent} strokeWidth={2} />
                <Text style={[styles.actionButtonText, { color: colors.accent }]}>
                  Reflect
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScaleAnims[1] }] }]}>
              <TouchableOpacity
                style={[styles.actionButton, styles.shareButton, { backgroundColor: colors.accent }]}
                onPress={handleSharePress}
                onPressIn={() => handleButtonPressIn(1)}
                onPressOut={() => handleButtonPressOut(1)}
                activeOpacity={1}
              >
                <Share2 size={18} color="#FFFFFF" strokeWidth={2} />
                <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>
                  Share
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              ✝ Light the way home
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  progressBar: {
    height: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  progressFill: {
    height: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  backgroundCross: {
    position: 'absolute',
    top: 50,
    right: -100,
    opacity: 0.6,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  greetingEmoji: {
    fontSize: 24,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '700',
  },
  readTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  readTimeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  headlineCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  headlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headlineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
  },
  headlineLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  headline: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 16,
  },
  sourceAttribution: {
    gap: 4,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sourceOutlet: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '400' as const,
    fontStyle: 'italic' as const,
    lineHeight: 18,
  },
  versesContainer: {
    marginBottom: 32,
  },
  verseBlock: {
    marginBottom: 24,
  },
  verseReferenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  referenceAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },
  verseReference: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 34,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  reflectionContainer: {
    marginBottom: 24,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deeperBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  deeperText: {
    fontSize: 11,
    fontWeight: '600',
  },
  reflectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  reflectionText: {
    fontSize: 17,
    lineHeight: 30,
  },
  premiumBanner: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  premiumQuickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  quickActionSub: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 28,
    borderWidth: 1.5,
  },
  shareButton: {
    borderWidth: 0,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});
