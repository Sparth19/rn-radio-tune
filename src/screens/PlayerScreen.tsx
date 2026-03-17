import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePlayer } from '../hooks/usePlayer';
import { colors, fonts, radius, spacing } from '../theme';

export function PlayerScreen() {
  const { station, status, togglePlay } = usePlayer();
  const isPlaying = status === 'playing' || status === 'loading';
  const location = station.city ? `${station.city}, ${station.country}` : station.country;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={[styles.heroGlow, { backgroundColor: station.accent }]} />
        <Text style={styles.title}>Now Playing</Text>
        <View style={styles.card}>
          <View style={[styles.stationArt, { backgroundColor: station.accent }]} />
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.stationTagline}>{station.genre}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.liveDot, isPlaying && styles.liveDotActive]} />
            <Text style={styles.statusText}>
              {status === 'loading'
                ? 'Connecting to live stream...'
                : status === 'playing'
                ? 'Live audio streaming'
                : status === 'error'
                ? 'Stream unavailable'
                : 'Stream paused'}
            </Text>
          </View>
          <Pressable
            style={[styles.playButton, status === 'loading' && styles.playButtonDisabled]}
            onPress={togglePlay}
            disabled={status === 'loading'}
          >
            <Text style={styles.playButtonText}>
              {status === 'loading' ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Broadcast City</Text>
          <Text style={styles.detailValue}>{location}</Text>
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Language</Text>
          <Text style={styles.detailValue}>{station.format.toUpperCase()} - {station.bitrate} kbps</Text>
        </View>
        <View style={styles.detailCardWide}>
          <Text style={styles.detailTitle}>About This Station</Text>
          <Text style={styles.detailBody}>{station.description}</Text>
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
  hero: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -40,
    right: -20,
    opacity: 0.2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 16,
    letterSpacing: 1,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  card: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  stationArt: {
    width: 120,
    height: 120,
    borderRadius: radius.xl,
  },
  stationName: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
    marginTop: spacing.sm,
  },
  stationTagline: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textMuted,
    marginRight: spacing.sm,
  },
  liveDotActive: {
    backgroundColor: colors.success,
  },
  statusText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  playButton: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  playButtonDisabled: {
    opacity: 0.7,
  },
  playButtonText: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.bg,
  },
  details: {
    marginTop: spacing.lg,
  },
  detailCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailCardWide: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  detailTitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailValue: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  detailBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
    lineHeight: 20,
  },
});
