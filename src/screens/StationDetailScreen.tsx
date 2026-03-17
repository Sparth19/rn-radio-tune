import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePlayer } from '../hooks/usePlayer';
import { colors, fonts, radius, spacing } from '../theme';

export function StationDetailScreen({ onClose }: { onClose: () => void }) {
  const { station, status, togglePlay } = usePlayer();
  const isPlaying = status === 'playing' || status === 'loading';
  const location = station.city ? `${station.city}, ${station.country}` : station.country;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.back} onPress={onClose}>
        <Text style={styles.backText}>Back to Stations</Text>
      </Pressable>
      <View style={styles.header}>
        <View style={[styles.art, { backgroundColor: station.accent }]} />
        <Text style={styles.name}>{station.name}</Text>
        <Text style={styles.tagline}>{station.genre}</Text>
        <Text style={styles.meta}>{location} - {station.format.toUpperCase()}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Station Summary</Text>
        <Text style={styles.description}>{station.description}</Text>
        <View style={styles.actions}>
          <Pressable
            style={[styles.primary, status === 'loading' && styles.primaryDisabled]}
            onPress={togglePlay}
            disabled={status === 'loading'}
          >
            <Text style={styles.primaryText}>
              {status === 'loading' ? 'Loading...' : isPlaying ? 'Pause Live' : 'Play Live'}
            </Text>
          </Pressable>
          <View style={styles.statusPill}>
            <View style={[styles.dot, isPlaying && styles.dotActive]} />
            <Text style={styles.statusText}>{isPlaying ? 'Live' : 'Paused'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  backText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.accentSoft,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  art: {
    width: 140,
    height: 140,
    borderRadius: radius.xl,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
    marginTop: spacing.md,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  body: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    lineHeight: 20,
  },
  actions: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  primaryDisabled: {
    opacity: 0.7,
  },
  primaryText: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.bg,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: colors.success,
  },
  statusText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.text,
  },
});
