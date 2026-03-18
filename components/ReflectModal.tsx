import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { X, Save, Sparkles, Heart, BookOpen, MessageCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp, JournalMood } from '@/contexts/AppContext';

interface ReflectModalProps {
  devotionalId: string;
  verseReference: string;
  onClose: () => void;
}

const MOODS: { key: JournalMood; emoji: string; label: string }[] = [
  { key: 'grateful', emoji: '🙏', label: 'Grateful' },
  { key: 'peaceful', emoji: '🕊️', label: 'Peaceful' },
  { key: 'hopeful', emoji: '🌅', label: 'Hopeful' },
  { key: 'joyful', emoji: '✨', label: 'Joyful' },
  { key: 'seeking', emoji: '🔍', label: 'Seeking' },
  { key: 'struggling', emoji: '🌧️', label: 'Struggling' },
];

const GUIDED_PROMPTS = [
  'What stood out to you most in today\'s reading?',
  'How does this passage apply to something you\'re facing right now?',
  'What is God saying to you through this verse?',
  'Is there a promise here you need to hold onto today?',
  'What area of your life does this challenge you to change?',
  'Who in your life needs to hear this message?',
];

export default function ReflectModal({ devotionalId, verseReference, onClose }: ReflectModalProps) {
  const { colors, isDark, isPremium, saveNote, getNote, saveJournalEntry, getJournalEntry } = useApp();
  const [text, setText] = useState('');
  const [mood, setMood] = useState<JournalMood | undefined>(undefined);
  const [prayerRequest, setPrayerRequest] = useState('');
  const [gratitudeNote, setGratitudeNote] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const promptAnim = useRef(new Animated.Value(0)).current;

  const existingNote = getNote(devotionalId);
  const existingJournal = isPremium ? getJournalEntry(devotionalId) : undefined;

  useEffect(() => {
    if (isPremium && existingJournal) {
      setText(existingJournal.text);
      setMood(existingJournal.mood);
      setPrayerRequest(existingJournal.prayerRequest || '');
      setGratitudeNote(existingJournal.gratitudeNote || '');
      setActivePrompt(existingJournal.promptUsed || null);
    } else if (existingNote) {
      setText(existingNote.text);
    }
  }, [existingNote, existingJournal, isPremium]);

  const togglePrompts = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const toValue = showPrompts ? 0 : 1;
    setShowPrompts(!showPrompts);
    Animated.spring(promptAnim, {
      toValue,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const selectPrompt = (prompt: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActivePrompt(prompt);
    setShowPrompts(false);
    Animated.timing(promptAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const selectMood = (m: JournalMood) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMood(mood === m ? undefined : m);
  };

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    saveNote(devotionalId, text);

    if (isPremium) {
      saveJournalEntry({
        devotionalId,
        text,
        mood,
        promptUsed: activePrompt || undefined,
        prayerRequest: prayerRequest || undefined,
        gratitudeNote: gratitudeNote || undefined,
      });
    }

    onClose();
  };

  const promptsHeight = promptAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
          <X size={24} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {isPremium ? 'Journal' : 'Personal Reflection'}
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.8}
        >
          <Save size={18} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={[styles.verseLabel, { color: colors.accent }]}>
          Reflecting on {verseReference}
        </Text>

        {isPremium && (
          <>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              How are you feeling?
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.moodRow}
              contentContainerStyle={styles.moodRowContent}
            >
              {MOODS.map((m) => (
                <TouchableOpacity
                  key={m.key}
                  style={[
                    styles.moodChip,
                    {
                      backgroundColor: mood === m.key
                        ? (isDark ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.15)')
                        : colors.card,
                      borderColor: mood === m.key ? colors.accent : colors.border,
                    },
                  ]}
                  onPress={() => selectMood(m.key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{m.emoji}</Text>
                  <Text
                    style={[
                      styles.moodLabel,
                      { color: mood === m.key ? colors.accent : colors.textSecondary },
                    ]}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.promptToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={togglePrompts}
              activeOpacity={0.7}
            >
              <Sparkles size={16} color={colors.accent} strokeWidth={2} />
              <Text style={[styles.promptToggleText, { color: colors.accent }]}>
                {activePrompt ? 'Change guided prompt' : 'Use a guided prompt'}
              </Text>
            </TouchableOpacity>

            <Animated.View style={[styles.promptsContainer, { maxHeight: promptsHeight }]}>
              <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                {GUIDED_PROMPTS.map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.promptItem,
                      {
                        backgroundColor: activePrompt === prompt
                          ? (isDark ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.1)')
                          : colors.card,
                        borderColor: activePrompt === prompt ? colors.accent : colors.border,
                      },
                    ]}
                    onPress={() => selectPrompt(prompt)}
                    activeOpacity={0.7}
                  >
                    <BookOpen size={14} color={colors.accent} strokeWidth={2} />
                    <Text style={[styles.promptText, { color: colors.text }]}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>

            {activePrompt && (
              <View style={[styles.activePromptBanner, { backgroundColor: isDark ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.06)' }]}>
                <Text style={[styles.activePromptText, { color: colors.accent }]}>
                  {activePrompt}
                </Text>
              </View>
            )}
          </>
        )}

        {!isPremium && (
          <Text style={[styles.prompt, { color: colors.textSecondary }]}>
            What speaks to your heart today? How might you apply this wisdom in your life?
          </Text>
        )}

        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Write your thoughts here..."
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
          value={text}
          onChangeText={setText}
          autoFocus
        />

        {isPremium && (
          <>
            <View style={[styles.extraSection, { borderTopColor: colors.border }]}>
              <View style={styles.extraHeader}>
                <Heart size={16} color="#E85D75" strokeWidth={2} />
                <Text style={[styles.extraLabel, { color: colors.text }]}>Gratitude</Text>
              </View>
              <TextInput
                style={[
                  styles.extraInput,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="What are you thankful for today?"
                placeholderTextColor={colors.textMuted}
                multiline
                textAlignVertical="top"
                value={gratitudeNote}
                onChangeText={setGratitudeNote}
              />
            </View>

            <View style={[styles.extraSection, { borderTopColor: colors.border }]}>
              <View style={styles.extraHeader}>
                <MessageCircle size={16} color={colors.accentSage} strokeWidth={2} />
                <Text style={[styles.extraLabel, { color: colors.text }]}>Prayer Request</Text>
              </View>
              <TextInput
                style={[
                  styles.extraInput,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="What would you like to pray about?"
                placeholderTextColor={colors.textMuted}
                multiline
                textAlignVertical="top"
                value={prayerRequest}
                onChangeText={setPrayerRequest}
              />
            </View>
          </>
        )}

        {existingNote && !isPremium && (
          <Text style={[styles.lastSaved, { color: colors.textMuted }]}>
            Last saved: {new Date(existingNote.updatedAt).toLocaleDateString()}
          </Text>
        )}
        {existingJournal && isPremium && (
          <Text style={[styles.lastSaved, { color: colors.textMuted }]}>
            Last saved: {new Date(existingJournal.updatedAt).toLocaleDateString()}
          </Text>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontWeight: '600',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  verseLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  moodRow: {
    marginBottom: 16,
  },
  moodRowContent: {
    gap: 8,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  promptToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  promptToggleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  promptsContainer: {
    overflow: 'hidden',
    marginBottom: 8,
  },
  promptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 6,
  },
  promptText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  activePromptBanner: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  activePromptText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  prompt: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  textInput: {
    minHeight: 160,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 26,
  },
  extraSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  extraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  extraLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  extraInput: {
    minHeight: 80,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  lastSaved: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'right',
  },
  bottomSpacer: {
    height: 40,
  },
});
