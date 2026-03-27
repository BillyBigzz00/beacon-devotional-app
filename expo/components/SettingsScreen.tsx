import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Switch,
} from 'react-native';
import { 
  ChevronRight, 
  BookOpen, 
  Bell, 
  Moon, 
  Sun, 
  Smartphone,
  Crown,
  Shield,
  Mail,
  Info,
  Check,
  RotateCcw,
  Zap,
} from 'lucide-react-native';

import { useApp, ThemeMode } from '@/contexts/AppContext';
import { usePurchases } from '@/contexts/PurchaseContext';
import { BIBLE_TRANSLATIONS } from '@/constants/translations';

interface SettingsScreenProps {
  onUpgrade: () => void;
}

export default function SettingsScreen({ onUpgrade }: SettingsScreenProps) {
  const { 
    colors, 
    isDark, 
    selectedTranslation, 
    setTranslation,
    themeMode,
    setThemeMode,
    notificationTime,
    setNotificationTime,
    resetOnboarding,
  } = useApp();
  const { isPremium, restorePurchases, isRestoring, devPremiumOverride, toggleDevPremium } = usePurchases();

  const [showTranslationPicker, setShowTranslationPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const currentTranslation = BIBLE_TRANSLATIONS.find(t => t.id === selectedTranslation);

  const themeModes: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'system', label: 'System', icon: <Smartphone size={20} color={colors.accent} /> },
    { value: 'light', label: 'Light', icon: <Sun size={20} color={colors.accent} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={20} color={colors.accent} /> },
  ];

  const notificationTimes = [
    '06:00', '07:00', '08:00', '09:00', '12:00', '18:00', '21:00'
  ];

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour > 12) return `${hour - 12}:00 PM`;
    return `${hour}:00 AM`;
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {!isPremium && (
        <TouchableOpacity
          style={[styles.premiumBanner, { backgroundColor: colors.accent }]}
          onPress={onUpgrade}
          activeOpacity={0.9}
        >
          <View style={styles.premiumBannerContent}>
            <Crown size={28} color="#FFFFFF" strokeWidth={2} />
            <View style={styles.premiumBannerText}>
              <Text style={styles.premiumBannerTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumBannerSubtitle}>
                Audio narration, offline access & more
              </Text>
            </View>
          </View>
          <ChevronRight size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>BIBLE</Text>
        
        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowTranslationPicker(!showTranslationPicker)}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            <BookOpen size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Translation</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {currentTranslation?.abbreviation}
            </Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>

        {showTranslationPicker && (
          <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {BIBLE_TRANSLATIONS.map((translation) => (
              <TouchableOpacity
                key={translation.id}
                style={[
                  styles.pickerItem,
                  { borderBottomColor: colors.border },
                  selectedTranslation === translation.id && { backgroundColor: isDark ? 'rgba(212,175,55,0.1)' : 'rgba(26,37,51,0.05)' }
                ]}
                onPress={() => {
                  setTranslation(translation.id);
                  setShowTranslationPicker(false);
                }}
              >
                <View>
                  <Text style={[styles.pickerItemTitle, { color: colors.text }]}>
                    {translation.abbreviation} — {translation.name}
                  </Text>
                  <Text style={[styles.pickerItemSubtitle, { color: colors.textMuted }]}>
                    {translation.description}
                  </Text>
                </View>
                {selectedTranslation === translation.id && (
                  <Check size={20} color={colors.accent} strokeWidth={2.5} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>NOTIFICATIONS</Text>
        
        <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            <Bell size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Daily Reminder</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {formatTime(notificationTime)}
            </Text>
          </View>
        </View>

        <View style={[styles.timePickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timePicker}>
            {notificationTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  { borderColor: notificationTime === time ? colors.accent : colors.border },
                  notificationTime === time && { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }
                ]}
                onPress={() => setNotificationTime(time)}
              >
                <Text style={[
                  styles.timeOptionText,
                  { color: notificationTime === time ? colors.accent : colors.textSecondary }
                ]}>
                  {formatTime(time)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>APPEARANCE</Text>
        
        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowThemePicker(!showThemePicker)}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            {isDark ? <Moon size={20} color={colors.accent} strokeWidth={2} /> : <Sun size={20} color={colors.accent} strokeWidth={2} />}
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Theme</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {themeModes.find(t => t.value === themeMode)?.label}
            </Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>

        {showThemePicker && (
          <View style={[styles.themePickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {themeModes.map((mode) => (
              <TouchableOpacity
                key={mode.value}
                style={[
                  styles.themeOption,
                  { borderColor: themeMode === mode.value ? colors.accent : colors.border },
                  themeMode === mode.value && { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }
                ]}
                onPress={() => {
                  setThemeMode(mode.value);
                  setShowThemePicker(false);
                }}
              >
                {mode.icon}
                <Text style={[
                  styles.themeOptionText,
                  { color: themeMode === mode.value ? colors.accent : colors.text }
                ]}>
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ABOUT</Text>
        
        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => Linking.openURL('https://example.com/privacy')}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(107,142,94,0.15)' : 'rgba(107,142,94,0.1)' }]}>
            <Shield size={20} color={colors.accentSage} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 8 }]}
          onPress={() => Linking.openURL('mailto:support@beacon.app')}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(26,37,51,0.3)' : 'rgba(26,37,51,0.1)' }]}>
            <Mail size={20} color={colors.accentNavy} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Contact Support</Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 8 }]}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            <Info size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Version</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>1.0.0</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SUBSCRIPTION</Text>
        
        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={restorePurchases}
          disabled={isRestoring}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            <RotateCcw size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Restore Purchases</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {isRestoring ? 'Restoring...' : 'Recover previous subscriptions'}
            </Text>
          </View>
          <ChevronRight size={20} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>DEVELOPER</Text>
        
        <View
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={[styles.settingIcon, { backgroundColor: devPremiumOverride ? 'rgba(52,199,89,0.15)' : (isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)') }]}>
            <Zap size={20} color={devPremiumOverride ? '#34C759' : colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dev Premium Override</Text>
            <Text style={[styles.settingValue, { color: devPremiumOverride ? '#34C759' : colors.textSecondary }]}>
              {devPremiumOverride ? 'ON — Bypassing RevenueCat' : 'OFF — Using RevenueCat'}
            </Text>
          </View>
          <Switch
            value={devPremiumOverride}
            onValueChange={toggleDevPremium}
            trackColor={{ false: colors.border, true: '#34C759' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 8 }]}
          onPress={resetOnboarding}
          activeOpacity={0.7}
        >
          <View style={[styles.settingIcon, { backgroundColor: isDark ? 'rgba(212,175,55,0.12)' : 'rgba(26,37,51,0.06)' }]}>
            <RotateCcw size={20} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Reset Splash Screen</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>Show onboarding again</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        Made with faith for daily reflection
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 20,
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  premiumBannerText: {
    flex: 1,
  },
  premiumBannerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  premiumBannerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    marginTop: 2,
  },
  pickerContainer: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  pickerItemTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  pickerItemSubtitle: {
    fontSize: 13,
  },
  timePickerContainer: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  timePicker: {
    gap: 10,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  themePickerContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 40,
  },
});
