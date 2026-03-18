import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CrossIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: object;
}

export default function CrossIcon({ 
  size = 48, 
  color = '#D4AF37', 
  strokeWidth = 3,
  style 
}: CrossIconProps) {
  const verticalHeight = size;
  const horizontalWidth = size * 0.65;
  const crossbarPosition = size * 0.3;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={[
          styles.vertical,
          {
            width: strokeWidth,
            height: verticalHeight,
            backgroundColor: color,
            left: (size - strokeWidth) / 2,
          },
        ]}
      />
      <View
        style={[
          styles.horizontal,
          {
            width: horizontalWidth,
            height: strokeWidth,
            backgroundColor: color,
            top: crossbarPosition,
            left: (size - horizontalWidth) / 2,
          },
        ]}
      />
    </View>
  );
}

export function CrossBackground({ 
  size = 200, 
  color = 'rgba(212,175,55,0.06)',
  style 
}: { size?: number; color?: string; style?: object }) {
  return (
    <View style={[styles.backgroundContainer, { width: size, height: size }, style]}>
      <View
        style={[
          styles.backgroundVertical,
          {
            width: size * 0.08,
            height: size,
            backgroundColor: color,
          },
        ]}
      />
      <View
        style={[
          styles.backgroundHorizontal,
          {
            width: size * 0.65,
            height: size * 0.08,
            backgroundColor: color,
            top: size * 0.28,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  vertical: {
    position: 'absolute',
    borderRadius: 2,
  },
  horizontal: {
    position: 'absolute',
    borderRadius: 2,
  },
  backgroundContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVertical: {
    position: 'absolute',
    borderRadius: 4,
  },
  backgroundHorizontal: {
    position: 'absolute',
    borderRadius: 4,
  },
});
