import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePlayer } from '../hooks/usePlayer';
import { colors, fonts, radius, spacing } from '../theme';

export function MiniPlayer({ onOpen }: { onOpen: () => void }) {
  const { station, status, togglePlay } = usePlayer();
  const isPlaying = status === 'playing' || status === 'loading';

  return (
    <View style={styles.container}>
      <Pressable style={styles.info} onPress={onOpen}>
        <View style={[styles.swatch, { backgroundColor: station.accent }]} />
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {station.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {status === 'loading' ? 'Buffering live stream...' : station.genre}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.control, status === 'loading' && styles.controlDisabled]}
        onPress={togglePlay}
        disabled={status === 'loading'}
      >
        <Text style={styles.controlText}>
          {status === 'loading' ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardAlt,
    borderTopWidth: 1,
    borderTopColor: colors.stroke,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    marginRight: spacing.md,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  control: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.accent,
  },
  controlDisabled: {
    opacity: 0.7,
  },
  controlText: {
    fontFamily: fonts.display,
    fontSize: 12,
    color: colors.bg,
  },
});
