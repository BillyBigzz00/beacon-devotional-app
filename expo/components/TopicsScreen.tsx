import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { X, Lock, ChevronRight, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { DEVOTIONAL_TOPICS, DevotionalTopic } from '@/mocks/topics';

interface TopicsScreenProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export default function TopicsScreen({ onClose, onUpgrade }: TopicsScreenProps) {
  const { colors, isDark, isPremium, setActiveTopic, activeTopicId } = useApp();
  const scaleAnims = useRef(DEVOTIONAL_TOPICS.map(() => new Animated.Value(1))).current;

  const handleTopicPress = (topic: DevotionalTopic, index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.sequence([
      Animated.timing(scaleAnims[index], { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnims[index], { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    if (topic.isPremium && !isPremium) {
      onUpgrade();
      return;
    }

    setActiveTopic(activeTopicId === topic.id ? null : topic.id);
  };

  const activeTopic = DEVOTIONAL_TOPICS.find(t => t.id === activeTopicId);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
          <X size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Devotional Topics</Text>
        <View style={styles.closeButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={[styles.introTitle, { color: colors.text }]}>
            Go deeper with focused tracks
          </Text>
          <Text style={[styles.introSubtitle, { color: colors.textSecondary }]}>
            Curated devotional series for every season of life. Each track pairs daily scripture with reflections tailored to your journey.
          </Text>
        </View>

        {activeTopic && (
          <View style={[styles.activeTopicBanner, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.08)', borderColor: colors.accent }]}>
            <Sparkles size={16} color={colors.accent} strokeWidth={2} />
            <View style={styles.activeTopicInfo}>
              <Text style={[styles.activeTopicLabel, { color: colors.textMuted }]}>ACTIVE TRACK</Text>
              <Text style={[styles.activeTopicName, { color: colors.accent }]}>
                {activeTopic.emoji} {activeTopic.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setActiveTopic(null)}
              style={[styles.clearButton, { backgroundColor: colors.card }]}
              activeOpacity={0.7}
            >
              <X size={14} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.topicsList}>
          {DEVOTIONAL_TOPICS.map((topic, index) => {
            const isActive = activeTopicId === topic.id;
            const isLocked = topic.isPremium && !isPremium;

            return (
              <Animated.View key={topic.id} style={{ transform: [{ scale: scaleAnims[index] }] }}>
                <TouchableOpacity
                  style={[
                    styles.topicCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isActive ? topic.color : colors.border,
                      borderWidth: isActive ? 2 : 1,
                    },
                  ]}
                  onPress={() => handleTopicPress(topic, index)}
                  activeOpacity={0.8}
                >
                  <View style={styles.topicTop}>
                    <View style={[styles.topicEmojiBg, { backgroundColor: topic.color + '18' }]}>
                      <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                    </View>
                    <View style={styles.topicMeta}>
                      <View style={styles.topicTitleRow}>
                        <Text style={[styles.topicTitle, { color: colors.text }]}>
                          {topic.title}
                        </Text>
                        {isLocked && (
                          <Lock size={14} color={colors.textMuted} strokeWidth={2} />
                        )}
                        {isActive && (
                          <View style={[styles.activeDot, { backgroundColor: topic.color }]} />
                        )}
                      </View>
                      <Text style={[styles.topicSubtitle, { color: colors.textSecondary }]}>
                        {topic.subtitle}
                      </Text>
                    </View>
                    <ChevronRight size={18} color={colors.textMuted} strokeWidth={2} />
                  </View>

                  <Text style={[styles.topicDescription, { color: colors.textSecondary }]}>
                    {topic.description}
                  </Text>

                  <View style={styles.topicFooter}>
                    <View style={[styles.countBadge, { backgroundColor: topic.color + '15' }]}>
                      <Text style={[styles.countText, { color: topic.color }]}>
                        {topic.devotionalCount} days
                      </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.versePills}>
                      {topic.sampleVerses.slice(0, 3).map((verse, i) => (
                        <View key={i} style={[styles.versePill, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                          <Text style={[styles.versePillText, { color: colors.textMuted }]}>
                            {verse}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>

                  {isLocked && (
                    <View style={[styles.lockedOverlay, { backgroundColor: isDark ? 'rgba(15,23,34,0.6)' : 'rgba(248,246,242,0.6)' }]}>
                      <View style={[styles.premiumBadge, { backgroundColor: colors.accent }]}>
                        <Lock size={12} color="#FFFFFF" strokeWidth={2.5} />
                        <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {!isPremium && (
          <TouchableOpacity
            style={[styles.upgradeCard, { backgroundColor: colors.accentNavy }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onUpgrade();
            }}
            activeOpacity={0.9}
          >
            <Sparkles size={20} color="#D4AF37" strokeWidth={2} />
            <View style={styles.upgradeText}>
              <Text style={styles.upgradeTitle}>Unlock All Topics</Text>
              <Text style={styles.upgradeSubtitle}>
                Get access to all devotional tracks with Premium
              </Text>
            </View>
            <ChevronRight size={18} color="#D4AF37" strokeWidth={2} />
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Georgia',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
  },
  intro: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  activeTopicBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  activeTopicInfo: {
    flex: 1,
  },
  activeTopicLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  activeTopicName: {
    fontSize: 15,
    fontWeight: '700',
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicsList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  topicCard: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  topicTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  topicEmojiBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicEmoji: {
    fontSize: 22,
  },
  topicMeta: {
    flex: 1,
  },
  topicTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  topicSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  topicDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  topicFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
  versePills: {
    flex: 1,
  },
  versePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  versePillText: {
    fontSize: 11,
    fontWeight: '500',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  upgradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    gap: 14,
  },
  upgradeText: {
    flex: 1,
  },
  upgradeTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
});
