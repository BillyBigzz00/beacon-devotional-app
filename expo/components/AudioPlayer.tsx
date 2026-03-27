import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Play, Pause, RotateCcw, Headphones, SkipBack, Loader, AlertCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useApp } from '@/contexts/AppContext';

interface AudioPlayerProps {
  verses: { reference: string; text: string }[];
  reflection: string;
  devotionalId?: string;
}

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
type AudioSource = 'elevenlabs' | 'speech';

const NUM_BARS = 12;

function getApiBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  if (!url) {
    throw new Error('EXPO_PUBLIC_RORK_API_BASE_URL is not set');
  }
  return url;
}

export default function AudioPlayer({ verses, reflection, devotionalId }: AudioPlayerProps) {
  const { colors, isDark } = useApp();
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [audioSource, setAudioSource] = useState<AudioSource>('speech');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const soundRef = useRef<Audio.Sound | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const barAnims = useRef(
    Array.from({ length: NUM_BARS }, () => new Animated.Value(0.3))
  ).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  const buildFullText = useCallback((): string => {
    let fullText = '';
    verses.forEach((verse, index) => {
      fullText += `${verse.reference}. ${verse.text}`;
      if (index < verses.length - 1) {
        fullText += ' ... ';
      }
    });
    fullText += ' ... Today\'s Reflection. ... ' + reflection;
    return fullText;
  }, [verses, reflection]);

  const fullText = buildFullText();

  const getAudioUrl = useCallback((): string => {
    const baseUrl = getApiBaseUrl();
    const encodedText = encodeURIComponent(fullText);
    return `${baseUrl}/api/tts/${devotionalId}?text=${encodedText}`;
  }, [devotionalId, fullText]);

  useEffect(() => {
    if (playbackState === 'playing') {
      startWaveAnimation();
      startGlowAnimation();
    } else if (playbackState === 'loading') {
      startSpinAnimation();
    } else {
      stopWaveAnimation();
      glowAnim.setValue(0);
    }
  }, [playbackState]);

  useEffect(() => {
    const findCalmVoice = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        console.log('[AudioPlayer] Available voices:', voices.length);

        const maleNames = ['daniel', 'aaron', 'james', 'tom', 'oliver', 'arthur', 'gordon', 'lee', 'malcolm', 'fred', 'rishi'];
        const preferredIds = [
          'com.apple.voice.premium.en-GB.Malcolm',
          'com.apple.voice.enhanced.en-GB.Daniel',
          'com.apple.voice.premium.en-US.Aaron',
          'com.apple.voice.enhanced.en-US.Aaron',
          'com.apple.voice.compact.en-GB.Daniel',
          'com.apple.ttsbundle.Daniel-compact',
          'com.apple.speech.synthesis.voice.Daniel',
          'com.apple.voice.compact.en-US.Aaron',
        ];

        const englishVoices = voices.filter(v => v.language?.startsWith('en'));
        const enhancedEnglish = englishVoices.filter(v => v.quality === 'Enhanced');

        let chosen = voices.find(v => preferredIds.some(id => v.identifier === id));
        if (!chosen) {
          chosen = voices.find(v => preferredIds.some(id => v.identifier?.includes(id)));
        }
        if (!chosen) {
          const maleEnhanced = enhancedEnglish.find(v =>
            maleNames.some(name => v.name?.toLowerCase().includes(name))
          );
          if (maleEnhanced) chosen = maleEnhanced;
        }
        if (!chosen) {
          const maleAny = englishVoices.find(v =>
            maleNames.some(name => v.name?.toLowerCase().includes(name))
          );
          if (maleAny) chosen = maleAny;
        }
        if (!chosen && enhancedEnglish.length > 0) {
          chosen = enhancedEnglish[0];
        }

        if (chosen) {
          console.log('[AudioPlayer] Selected fallback voice:', chosen.name, chosen.identifier);
          setSelectedVoice(chosen.identifier);
        }
      } catch (e) {
        console.log('[AudioPlayer] Could not load voices:', e);
      }
    };
    findCalmVoice();

    return () => {
      cleanupSound();
      Speech.stop();
    };
  }, []);

  const cleanupSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch (e) {
        console.log('[AudioPlayer] Cleanup error:', e);
      }
      soundRef.current = null;
    }
  };

  const startWaveAnimation = () => {
    const animations = barAnims.map((anim, index) => {
      const randomDuration = 300 + Math.random() * 400;
      const randomDelay = index * 50;
      return Animated.loop(
        Animated.sequence([
          Animated.delay(randomDelay),
          Animated.timing(anim, {
            toValue: 0.3 + Math.random() * 0.7,
            duration: randomDuration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2 + Math.random() * 0.3,
            duration: randomDuration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    });
    Animated.parallel(animations).start();
  };

  const stopWaveAnimation = () => {
    barAnims.forEach(anim => {
      anim.stopAnimation();
      Animated.timing(anim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const startGlowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startSpinAnimation = () => {
    spinAnim.setValue(0);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      if (status.durationMillis) {
        setTotalDuration(status.durationMillis);
        const progress = status.positionMillis / status.durationMillis;
        progressAnim.setValue(progress);
        setCurrentPosition(status.positionMillis);
      }
      if (status.didJustFinish) {
        console.log('[AudioPlayer] Playback finished');
        setPlaybackState('idle');
        progressAnim.setValue(0);
        setCurrentPosition(0);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
    if (status.error) {
      console.log('[AudioPlayer] Playback error:', status.error);
      setPlaybackState('error');
      setErrorMessage('Audio playback failed');
    }
  }, [progressAnim]);

  const playElevenLabsAudio = async () => {
    try {
      await cleanupSound();
      setPlaybackState('loading');
      setErrorMessage(null);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const audioUrl = getAudioUrl();
      console.log('[AudioPlayer] Loading audio from URL:', audioUrl.substring(0, 100) + '...');

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        {
          shouldPlay: true,
          rate: playbackSpeed,
          shouldCorrectPitch: true,
          progressUpdateIntervalMillis: 500,
        },
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;
      setAudioSource('elevenlabs');
      setPlaybackState('playing');
      console.log('[AudioPlayer] ElevenLabs audio playing from URL');
    } catch (error: any) {
      console.log('[AudioPlayer] ElevenLabs URL playback error:', error?.message || error);
      console.log('[AudioPlayer] Falling back to device speech...');
      playSpeechFallback();
    }
  };

  const playSpeechFallback = () => {
    setAudioSource('speech');
    setPlaybackState('playing');
    setErrorMessage(null);

    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 60000,
      useNativeDriver: false,
    }).start();

    Speech.speak(fullText, {
      language: 'en-GB',
      voice: selectedVoice,
      pitch: 0.75,
      rate: playbackSpeed * 0.7,
      onDone: () => {
        console.log('[AudioPlayer] Speech completed');
        setPlaybackState('idle');
        progressAnim.setValue(0);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      },
      onStopped: () => {
        console.log('[AudioPlayer] Speech stopped');
        setPlaybackState('idle');
      },
      onError: (error) => {
        console.log('[AudioPlayer] Speech error:', error);
        setPlaybackState('error');
        setErrorMessage('Unable to play audio');
      },
    });
  };

  const handlePlay = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    animateButtonPress();

    if (playbackState === 'error') {
      setErrorMessage(null);
    }

    if (playbackState === 'playing') {
      if (audioSource === 'elevenlabs' && soundRef.current) {
        await soundRef.current.pauseAsync();
        setPlaybackState('paused');
      } else {
        await Speech.stop();
        setPlaybackState('paused');
      }
      return;
    }

    if (playbackState === 'paused' && audioSource === 'elevenlabs' && soundRef.current) {
      await soundRef.current.playAsync();
      setPlaybackState('playing');
      return;
    }

    if (devotionalId) {
      await playElevenLabsAudio();
    } else {
      playSpeechFallback();
    }
  };

  const handleRestart = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (audioSource === 'elevenlabs' && soundRef.current) {
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.playAsync();
      setPlaybackState('playing');
    } else {
      await Speech.stop();
      setPlaybackState('idle');
      progressAnim.setValue(0);
      setTimeout(() => handlePlay(), 100);
    }
  };

  const cycleSpeed = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackSpeed(newSpeed);

    if (audioSource === 'elevenlabs' && soundRef.current) {
      try {
        await soundRef.current.setRateAsync(newSpeed, true);
      } catch (e) {
        console.log('[AudioPlayer] Error setting rate:', e);
      }
    }
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const isActive = playbackState !== 'idle' && playbackState !== 'error';
  const isPlaying = playbackState === 'playing' || playbackState === 'paused';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.08)', borderColor: colors.accent }]}>
      <Animated.View
        style={[
          styles.glowOverlay,
          {
            backgroundColor: colors.accent,
            opacity: glowOpacity,
          }
        ]}
      />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Headphones size={18} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.title, { color: colors.accent }]}>Audio Narration</Text>
          {audioSource === 'elevenlabs' && isPlaying && (
            <View style={[styles.premiumVoiceBadge, { backgroundColor: isDark ? 'rgba(107,142,94,0.2)' : 'rgba(107,142,94,0.12)' }]}>
              <Text style={[styles.premiumVoiceText, { color: colors.accentSage }]}>HD</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.speedBadge, { backgroundColor: colors.accent }]}
          onPress={cycleSpeed}
          activeOpacity={0.7}
        >
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </TouchableOpacity>
      </View>

      {isActive && playbackState !== 'loading' && (
        <View style={styles.waveformContainer}>
          {barAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.waveBar,
                {
                  backgroundColor: colors.accent,
                  transform: [{ scaleY: anim }],
                },
              ]}
            />
          ))}
        </View>
      )}

      {playbackState === 'error' && errorMessage && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color="#E85D75" strokeWidth={2} />
          <Text style={[styles.errorText, { color: '#E85D75' }]}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.controls}>
        {isActive && playbackState !== 'loading' && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.accent }]}
            onPress={handleRestart}
            activeOpacity={0.7}
          >
            <SkipBack size={18} color={colors.accent} strokeWidth={2} />
          </TouchableOpacity>
        )}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: colors.accent }]}
            onPress={handlePlay}
            activeOpacity={0.8}
            disabled={playbackState === 'loading'}
          >
            {playbackState === 'loading' ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Loader size={32} color="#FFFFFF" strokeWidth={2.5} />
              </Animated.View>
            ) : playbackState === 'playing' ? (
              <Pause size={32} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" style={{ marginLeft: 4 }} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {isActive && playbackState !== 'loading' && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: colors.accent }]}
            onPress={handleRestart}
            activeOpacity={0.7}
          >
            <RotateCcw size={18} color={colors.accent} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>

      {isActive && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressTrack, { backgroundColor: isDark ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.3)' }]}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.accent,
                  width: progressWidth,
                }
              ]}
            />
          </View>
          {audioSource === 'elevenlabs' && totalDuration > 0 && (
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, { color: colors.textMuted }]}>{formatTime(currentPosition)}</Text>
              <Text style={[styles.timeText, { color: colors.textMuted }]}>{formatTime(totalDuration)}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.statusContainer}>
        {playbackState === 'loading' ? (
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            Loading premium audio...
          </Text>
        ) : playbackState === 'playing' ? (
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            {audioSource === 'elevenlabs' ? '🎧 Premium narration' : '🎧 Reading Scripture...'}
          </Text>
        ) : playbackState === 'paused' ? (
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            Paused {'\u00B7'} Tap to continue
          </Text>
        ) : playbackState === 'error' ? (
          <Text style={[styles.hint, { color: colors.textMuted }]}>
            Tap play to try again
          </Text>
        ) : (
          <Text style={[styles.hint, { color: colors.textMuted }]}>
            Listen to today{'\u0027'}s verses and reflection
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    marginBottom: 24,
    overflow: 'hidden',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  premiumVoiceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  premiumVoiceText: {
    fontSize: 10,
    fontWeight: '800' as const,
    letterSpacing: 0.5,
  },
  speedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  speedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700' as const,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 4,
    marginBottom: 16,
  },
  waveBar: {
    width: 6,
    height: 40,
    borderRadius: 3,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(232,93,117,0.1)',
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  hint: {
    fontSize: 13,
    textAlign: 'center' as const,
  },
});
