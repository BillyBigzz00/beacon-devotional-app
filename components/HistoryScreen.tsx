import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, Crown, BookOpen, Heart, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { MOCK_DEVOTIONALS, DailyDevotional } from '@/mocks/devotional';
import CrossIcon from './CrossIcon';

interface HistoryScreenProps {
  onSelectDevotional: (devotional: DailyDevotional) => void;
  onUpgrade: () => void;
}

export default function HistoryScreen({ onSelectDevotional, onUpgrade }: HistoryScreenProps) {
  const { colors, isDark, getHistory, isPremium, historyDaysLimit, isFavorite, toggleFavorite } = useApp();

  const historyItems = useMemo(() => {
    const history = getHistory();
    return history.map(h => {
      const devotional = MOCK_DEVOTIONALS.find(d => d.id === h.devotionalId);
      return { ...h, devotional };
    }).filter(h => h.devotional !== undefined);
  }, [getHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleItemPress = (devotional: DailyDevotional) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectDevotional(devotional);
  };

  const handleFavoritePress = (devotionalId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(devotionalId);
  };

  const renderItem = ({ item, index }: { item: typeof historyItems[0]; index: number }) => {
    if (!item.devotional) return null;
    
    const favorite = isFavorite(item.devotionalId);
    
    return (
      <Animated.View>
        <TouchableOpacity
          style={[styles.historyItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => handleItemPress(item.devotional!)}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <View style={[styles.dateBadge, { backgroundColor: isDark ? 'rgba(212,175,55,0.15)' : 'rgba(26,37,51,0.08)' }]}>
                <Text style={[styles.dateText, { color: colors.accent }]}>
                  {formatDate(item.viewedAt)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleFavoritePress(item.devotionalId)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Heart 
                  size={20} 
                  color={favorite ? '#E85D75' : colors.textMuted} 
                  fill={favorite ? '#E85D75' : 'transparent'}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.headline, { color: colors.text }]} numberOfLines={2}>
              {item.devotional.headline}
            </Text>
            
            <View style={styles.itemFooter}>
              <View style={styles.verseInfo}>
                <BookOpen size={14} color={colors.textMuted} strokeWidth={2} />
                <Text style={[styles.verseText, { color: colors.textMuted }]}>
                  {item.devotional.verses[0]?.reference}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} strokeWidth={2} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? 'rgba(212,175,55,0.1)' : 'rgba(26,37,51,0.05)' }]}>
        <History size={48} color={colors.textMuted} strokeWidth={1.5} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No History Yet</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
        Your reading history will appear here as you explore daily readings.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.titleRow}>
        <CrossIcon size={24} color={colors.accent} strokeWidth={2} />
        <Text style={[styles.title, { color: colors.text }]}>History</Text>
      </View>
      
      <View style={[styles.limitBadge, { backgroundColor: isDark ? 'rgba(107,142,94,0.15)' : 'rgba(107,142,94,0.1)' }]}>
        <Text style={[styles.limitText, { color: colors.accentSage }]}>
          {historyDaysLimit} day{historyDaysLimit !== 1 ? 's' : ''} of history
        </Text>
      </View>
      
      {!isPremium && (
        <TouchableOpacity
          style={[styles.upgradeBanner, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)', borderColor: colors.accent }]}
          onPress={onUpgrade}
          activeOpacity={0.8}
        >
          <Crown size={20} color={colors.accent} strokeWidth={2} />
          <View style={styles.upgradeTextContainer}>
            <Text style={[styles.upgradeTitle, { color: colors.accent }]}>
              Unlock 90 Days of History
            </Text>
            <Text style={[styles.upgradeSubtitle, { color: colors.textSecondary }]}>
              Go Premium to access your full reading journey
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <FlatList
        data={historyItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.devotionalId}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  limitBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  limitText: {
    fontSize: 13,
    fontWeight: '600',
  },
  upgradeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 13,
  },
  historyItem: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
  },
  headline: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verseText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
