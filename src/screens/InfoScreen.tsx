import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePlayer } from '../hooks/usePlayer';
import { colors, fonts, radius, spacing } from '../theme';

export function InfoScreen() {
  const { station } = usePlayer();
  const location = station.city ? `${station.city}, ${station.country}` : station.country;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Station Info</Text>
      <View style={styles.card}>
        <View style={[styles.swatch, { backgroundColor: station.accent }]} />
        <View style={styles.textBlock}>
          <Text style={styles.name}>{station.name}</Text>
          <Text style={styles.meta}>{location} - {station.genre}</Text>
        </View>
      </View>
      <Text style={styles.body}>{station.description}</Text>
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Stream Type</Text>
          <Text style={styles.statValue}>Live</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Quality</Text>
          <Text style={styles.statValue}>{station.bitrate} kbps</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Stability</Text>
          <Text style={styles.statValue}>{station.format.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Tip for listeners</Text>
        <Text style={styles.noteBody}>
          If you notice buffering, switch to another station and return in a few minutes.
        </Text>
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
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.text,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    marginRight: spacing.md,
  },
  textBlock: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.lg,
    lineHeight: 20,
  },
  stats: {
    marginTop: spacing.lg,
  },
  statCard: {
    backgroundColor: colors.cardAlt,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.text,
    marginTop: 6,
  },
  note: {
    marginTop: spacing.lg,
    backgroundColor: '#1E283D',
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  noteTitle: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.text,
  },
  noteBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    lineHeight: 18,
  },
});
