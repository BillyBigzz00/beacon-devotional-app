import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { X, Search, BookOpen, Heart, MessageCircle, Calendar, ChevronRight } from 'lucide-react-native';
import { useApp, JournalEntry, JournalMood } from '@/contexts/AppContext';
import { getDevotionalById } from '@/mocks/devotional';

interface JournalScreenProps {
  onClose: () => void;
  onOpenDevotional?: (devotionalId: string) => void;
}

const MOOD_MAP: Record<JournalMood, { emoji: string; label: string }> = {
  grateful: { emoji: '🙏', label: 'Grateful' },
  peaceful: { emoji: '🕊️', label: 'Peaceful' },
  hopeful: { emoji: '🌅', label: 'Hopeful' },
  joyful: { emoji: '✨', label: 'Joyful' },
  seeking: { emoji: '🔍', label: 'Seeking' },
  struggling: { emoji: '🌧️', label: 'Struggling' },
};

export default function JournalScreen({ onClose, onOpenDevotional }: JournalScreenProps) {
  const { colors, isDark, getJournalEntries, streak, totalDaysRead } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<JournalMood | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const entries = getJournalEntries();

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchQuery === '' ||
      entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.gratitudeNote?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.prayerRequest?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMood = !selectedMoodFilter || entry.mood === selectedMoodFilter;
    return matchesSearch && matchesMood;
  });

  const moodCounts = entries.reduce<Partial<Record<JournalMood, number>>>((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

  const topMood = Object.entries(moodCounts).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderEntry = (entry: JournalEntry, index: number) => {
    const devotional = getDevotionalById(entry.devotionalId);
    const verse = devotional?.verses[0]?.reference || 'Unknown';

    return (
      <TouchableOpacity
        key={entry.id}
        style={[styles.entryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => onOpenDevotional?.(entry.devotionalId)}
        activeOpacity={0.7}
      >
        <View style={styles.entryHeader}>
          <View style={styles.entryDateRow}>
            <Calendar size={14} color={colors.textMuted} strokeWidth={2} />
            <Text style={[styles.entryDate, { color: colors.textMuted }]}>
              {formatDate(entry.updatedAt)}
            </Text>
          </View>
          {entry.mood && (
            <View style={[styles.entryMoodBadge, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.08)' }]}>
              <Text style={styles.entryMoodEmoji}>{MOOD_MAP[entry.mood].emoji}</Text>
              <Text style={[styles.entryMoodLabel, { color: colors.accent }]}>
                {MOOD_MAP[entry.mood].label}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.entryVerseRow}>
          <View style={[styles.verseAccent, { backgroundColor: colors.accent }]} />
          <Text style={[styles.entryVerse, { color: colors.accent }]}>{verse}</Text>
        </View>

        <Text style={[styles.entryText, { color: colors.text }]} numberOfLines={3}>
          {entry.text}
        </Text>

        {(entry.gratitudeNote || entry.prayerRequest) && (
          <View style={styles.entryExtras}>
            {entry.gratitudeNote && (
              <View style={styles.extraTag}>
                <Heart size={12} color="#E85D75" strokeWidth={2} />
                <Text style={[styles.extraTagText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {entry.gratitudeNote}
                </Text>
              </View>
            )}
            {entry.prayerRequest && (
              <View style={styles.extraTag}>
                <MessageCircle size={12} color={colors.accentSage} strokeWidth={2} />
                <Text style={[styles.extraTagText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {entry.prayerRequest}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.entryFooter}>
          <Text style={[styles.readMore, { color: colors.accent }]}>View devotional</Text>
          <ChevronRight size={14} color={colors.accent} strokeWidth={2} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
          <X size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Journal</Text>
        <View style={styles.closeButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsSection}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statEmoji}>📝</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{entries.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Entries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.statEmoji}>{topMood ? MOOD_MAP[topMood[0] as JournalMood].emoji : '📖'}</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{totalDaysRead}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Days Read</Text>
          </View>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={18} color={colors.textMuted} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search journal entries..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterRowContent}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              {
                backgroundColor: !selectedMoodFilter ? colors.accent : colors.card,
                borderColor: !selectedMoodFilter ? colors.accent : colors.border,
              },
            ]}
            onPress={() => setSelectedMoodFilter(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, { color: !selectedMoodFilter ? '#FFFFFF' : colors.textSecondary }]}>
              All
            </Text>
          </TouchableOpacity>
          {(Object.keys(MOOD_MAP) as JournalMood[]).map((moodKey) => (
            <TouchableOpacity
              key={moodKey}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedMoodFilter === moodKey
                    ? (isDark ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.15)')
                    : colors.card,
                  borderColor: selectedMoodFilter === moodKey ? colors.accent : colors.border,
                },
              ]}
              onPress={() => setSelectedMoodFilter(selectedMoodFilter === moodKey ? null : moodKey)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterEmoji}>{MOOD_MAP[moodKey].emoji}</Text>
              <Text
                style={[
                  styles.filterText,
                  { color: selectedMoodFilter === moodKey ? colors.accent : colors.textSecondary },
                ]}
              >
                {MOOD_MAP[moodKey].label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={48} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {entries.length === 0 ? 'Start Your Journal' : 'No matching entries'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              {entries.length === 0
                ? 'Tap "Reflect" on any devotional to write your first journal entry.'
                : 'Try adjusting your search or filters.'}
            </Text>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {filteredEntries.map((entry, index) => renderEntry(entry, index))}
          </View>
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
    paddingTop: 20,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  statEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  filterRow: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  filterRowContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  entriesList: {
    paddingHorizontal: 20,
  },
  entryCard: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  entryDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  entryDate: {
    fontSize: 13,
    fontWeight: '500',
  },
  entryMoodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  entryMoodEmoji: {
    fontSize: 12,
  },
  entryMoodLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  entryVerseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  verseAccent: {
    width: 3,
    height: 14,
    borderRadius: 2,
  },
  entryVerse: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  entryText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  entryExtras: {
    gap: 6,
    marginBottom: 10,
  },
  extraTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  extraTagText: {
    fontSize: 13,
    flex: 1,
  },
  entryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: 6,
  },
  readMore: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 40,
  },
});
