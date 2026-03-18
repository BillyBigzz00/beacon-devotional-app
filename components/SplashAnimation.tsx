import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import CrossIcon, { CrossBackground } from './CrossIcon';

const { width, height } = Dimensions.get('window');
const NUM_PARTICLES = 12;

interface SplashAnimationProps {
  onComplete: () => void;
}

export default function SplashAnimation({ onComplete }: SplashAnimationProps) {
  const hasCompleted = useRef(false);

  const safeComplete = useCallback(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [onComplete]);
  const iconScale = useRef(new Animated.Value(0.3)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslate = useRef(new Animated.Value(15)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;
  const ringsOpacity = useRef(new Animated.Value(0)).current;
  const ring1Scale = useRef(new Animated.Value(0.5)).current;
  const ring2Scale = useRef(new Animated.Value(0.5)).current;
  const ring3Scale = useRef(new Animated.Value(0.5)).current;
  const particleAnims = useRef(
    Array.from({ length: NUM_PARTICLES }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const timeout = setTimeout(() => {
      safeComplete();
    }, 4500);

    const particleAnimations = particleAnims.map((anim, index) => {
      const angle = (index / NUM_PARTICLES) * Math.PI * 2;
      const distance = 80 + Math.random() * 40;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      const delay = 400 + index * 50;

      return Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: targetX,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: targetY,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.sequence([
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(iconRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(glowScale, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(ringsOpacity, {
          toValue: 1,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.spring(ring1Scale, {
          toValue: 1,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(ring2Scale, {
          toValue: 1.3,
          tension: 25,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(ring3Scale, {
          toValue: 1.6,
          tension: 20,
          friction: 8,
          useNativeDriver: true,
        }),
        ...particleAnimations,
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslate, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(600),
      Animated.parallel([
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      clearTimeout(timeout);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      safeComplete();
    });

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rotation = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-30deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <LinearGradient
        colors={['#1A2533', '#0F1722', '#0A0E14']}
        style={styles.gradient}
        locations={[0, 0.5, 1]}
      />
      
      <CrossBackground 
        size={500} 
        color="rgba(212,175,55,0.03)" 
        style={styles.backgroundCross}
      />
      
      <CrossBackground 
        size={300} 
        color="rgba(212,175,55,0.02)" 
        style={styles.backgroundCross2}
      />
      
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: iconOpacity,
              transform: [{ scale: iconScale }, { rotate: rotation }],
            },
          ]}
        >
          <Animated.View 
            style={[
              styles.ring, 
              styles.ring3,
              { 
                opacity: Animated.multiply(ringsOpacity, 0.15),
                transform: [{ scale: ring3Scale }],
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.ring, 
              styles.ring2,
              { 
                opacity: Animated.multiply(ringsOpacity, 0.25),
                transform: [{ scale: ring2Scale }],
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.ring, 
              styles.ring1,
              { 
                opacity: Animated.multiply(ringsOpacity, 0.4),
                transform: [{ scale: ring1Scale }],
              }
            ]} 
          />
          
          <Animated.View 
            style={[
              styles.glowCircle, 
              { 
                opacity: glowOpacity,
                transform: [{ scale: glowScale }],
              }
            ]} 
          />
          
          {particleAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  opacity: anim.opacity,
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: anim.translateY },
                    { scale: anim.scale },
                  ],
                },
              ]}
            />
          ))}
          
          <View style={styles.iconCircle}>
            <CrossIcon size={60} color="#D4AF37" strokeWidth={4} />
          </View>
        </Animated.View>

        <Animated.Text 
          style={[
            styles.title, 
            { 
              opacity: textOpacity,
              transform: [{ translateY: textTranslate }],
            }
          ]}
        >
          Beacon
        </Animated.Text>

        <Animated.Text 
          style={[
            styles.tagline, 
            { 
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslate }],
            }
          ]}
        >
          Light the Way Home
        </Animated.Text>
      </View>

      <View style={styles.lightRays} />
      <View style={styles.lightRays2} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundCross: {
    position: 'absolute',
    top: height * 0.1,
    right: -width * 0.3,
    opacity: 0.5,
  },
  backgroundCross2: {
    position: 'absolute',
    bottom: height * 0.1,
    left: -width * 0.2,
    opacity: 0.3,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 100,
  },
  ring1: {
    width: 140,
    height: 140,
  },
  ring2: {
    width: 140,
    height: 140,
  },
  ring3: {
    width: 140,
    height: 140,
  },
  glowCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(212,175,55,0.12)',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
  },
  iconCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(212,175,55,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212,175,55,0.3)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#F5F3EE',
    fontFamily: 'Georgia',
    marginBottom: 16,
    textShadowColor: 'rgba(212,175,55,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 17,
    color: '#D4AF37',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  lightRays: {
    position: 'absolute',
    top: -height * 0.3,
    width: width * 2,
    height: height * 0.6,
    backgroundColor: 'rgba(212,175,55,0.02)',
    borderRadius: width,
    transform: [{ scaleX: 1.5 }, { rotate: '-20deg' }],
  },
  lightRays2: {
    position: 'absolute',
    bottom: -height * 0.4,
    width: width * 2,
    height: height * 0.5,
    backgroundColor: 'rgba(212,175,55,0.015)',
    borderRadius: width,
    transform: [{ scaleX: 1.3 }, { rotate: '15deg' }],
  },
});
