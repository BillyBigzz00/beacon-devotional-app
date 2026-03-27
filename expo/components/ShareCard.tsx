import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { X, Share2, Copy, Check } from 'lucide-react-native';
import CrossIcon from './CrossIcon';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { DailyDevotional } from '@/mocks/devotional';

interface ShareCardProps {
  devotional: DailyDevotional;
  onClose: () => void;
}

export default function ShareCard({ devotional, onClose }: ShareCardProps) {
  const { colors, isDark, selectedTranslation } = useApp();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const verses = devotional.verses;

  const getShareText = (verseIndex: number) => {
    const verse = verses[verseIndex];
    const verseText = verse.text[selectedTranslation] || verse.text['niv'];
    return `"${verseText}"\n\n— ${verse.reference}\n\nShared via Beacon • Daily Faith Companion`;
  };

  const handleShare = async (verseIndex: number) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const shareText = getShareText(verseIndex);
      const result = await Share.share(
        Platform.OS === 'ios'
          ? { message: shareText }
          : { message: shareText, title: 'Share Verse' }
      );
      if (result.action === Share.sharedAction) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.log('Error sharing:', error);
      Alert.alert('Share Failed', 'Unable to share at this time. Please try again.');
    }
  };

  const handleCopy = async (verseIndex: number) => {
    try {
      const shareText = getShareText(verseIndex);
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(shareText);
      }
      setCopiedIndex(verseIndex);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      Alert.alert('Copied!', 'Text copied to clipboard');
      setCopiedIndex(verseIndex);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
          <X size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Share Verses</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {verses.map((verse, index) => {
          const verseText = verse.text[selectedTranslation] || verse.text['niv'];
          const isCopied = copiedIndex === index;

          return (
            <View 
              key={`${verse.reference}-${index}`}
              style={[styles.verseCard, { 
                backgroundColor: isDark ? '#1A2533' : '#F8F6F2',
                borderColor: colors.border,
              }]}
            >
              <View style={[styles.crossIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.15)' : 'rgba(26,37,51,0.08)' }]}>
                <CrossIcon size={20} color={colors.accent} strokeWidth={3} />
              </View>
              
              <Text style={[styles.verseText, { color: isDark ? '#F5F3EE' : '#1A2533' }]}>
                {`"${verseText}"`}
              </Text>
              
              <Text style={[styles.verseReference, { color: colors.accent }]}>
                — {verse.reference}
              </Text>
              
              <View style={[styles.cardActions, { borderTopColor: colors.border }]}>
                <TouchableOpacity
                  style={[styles.cardActionButton, { backgroundColor: colors.accent }]}
                  onPress={() => handleShare(index)}
                  activeOpacity={0.8}
                >
                  <Share2 size={16} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.cardActionButtonText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardActionButtonOutline, { borderColor: colors.accent }]}
                  onPress={() => handleCopy(index)}
                  activeOpacity={0.7}
                >
                  {isCopied ? (
                    <Check size={16} color={colors.accent} strokeWidth={2} />
                  ) : (
                    <Copy size={16} color={colors.accent} strokeWidth={2} />
                  )}
                  <Text style={[styles.cardActionButtonOutlineText, { color: colors.accent }]}>
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.watermarkContainer}>
          <Text style={[styles.watermarkText, { color: colors.textMuted }]}>
            BEACON
          </Text>
          <Text style={[styles.watermarkTagline, { color: colors.accent }]}>
            Light the Way Home
          </Text>
        </View>
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
    fontSize: 17,
    fontWeight: '600' as const,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  verseCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  crossIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  verseReference: {
    fontSize: 13,
    fontWeight: '600' as const,
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  cardActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 20,
  },
  cardActionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  cardActionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  cardActionButtonOutlineText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  watermarkContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  watermarkText: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 3,
  },
  watermarkTagline: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
