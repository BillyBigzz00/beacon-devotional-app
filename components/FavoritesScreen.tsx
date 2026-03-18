import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, BookOpen, ChevronRight, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';
import { MOCK_DEVOTIONALS, DailyDevotional } from '@/mocks/devotional';
import CrossIcon from './CrossIcon';

interface FavoritesScreenProps {
  onSelectDevotional: (devotional: DailyDevotional) => void;
}

export default function FavoritesScreen({ onSelectDevotional }: FavoritesScreenProps) {
  const { colors, isDark, getFavorites, toggleFavorite } = useApp();

  const favoriteItems = useMemo(() => {
    const favorites = getFavorites();
    return favorites.map(f => {
      const devotional = MOCK_DEVOTIONALS.find(d => d.id === f.devotionalId);
      return { ...f, devotional };
    }).filter(f => f.devotional !== undefined);
  }, [getFavorites]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleItemPress = (devotional: DailyDevotional) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelectDevotional(devotional);
  };

  const handleRemoveFavorite = (devotionalId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleFavorite(devotionalId);
  };

  const renderItem = ({ item }: { item: typeof favoriteItems[0] }) => {
    if (!item.devotional) return null;
    
    return (
      <TouchableOpacity
        style={[styles.favoriteItem, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => handleItemPress(item.devotional!)}
        activeOpacity={0.7}
      >
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <View style={[styles.dateBadge, { backgroundColor: isDark ? 'rgba(232,93,117,0.15)' : 'rgba(232,93,117,0.1)' }]}>
              <Heart size={12} color="#E85D75" fill="#E85D75" strokeWidth={2} />
              <Text style={[styles.dateText, { color: '#E85D75' }]}>
                Saved {formatDate(item.savedAt)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(item.devotionalId)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={[styles.removeButton, { backgroundColor: isDark ? 'rgba(255,100,100,0.15)' : 'rgba(255,100,100,0.1)' }]}
            >
              <Trash2 size={16} color="#FF6464" strokeWidth={2} />
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
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? 'rgba(232,93,117,0.1)' : 'rgba(232,93,117,0.08)' }]}>
        <Heart size={48} color="#E85D75" strokeWidth={1.5} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Favorites Yet</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
        Tap the heart icon on any reading to save it here for easy access later.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.titleRow}>
        <CrossIcon size={24} color={colors.accent} strokeWidth={2} />
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
      </View>
      
      {favoriteItems.length > 0 && (
        <View style={[styles.countBadge, { backgroundColor: isDark ? 'rgba(232,93,117,0.15)' : 'rgba(232,93,117,0.1)' }]}>
          <Heart size={14} color="#E85D75" fill="#E85D75" strokeWidth={2} />
          <Text style={[styles.countText, { color: '#E85D75' }]}>
            {favoriteItems.length} saved reading{favoriteItems.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <FlatList
        data={favoriteItems}
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
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
  },
  favoriteItem: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
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
