import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Station } from '../data/stations';
import { colors, fonts, radius, spacing } from '../theme';

export function StationCard({
  station,
  isActive,
  onPress,
}: {
  station: Station;
  isActive?: boolean;
  onPress?: () => void;
}) {
  const location = station.city ? `${station.city}, ${station.country}` : station.country;
  return (
    <Pressable
      style={[styles.card, isActive && styles.cardActive, { borderColor: station.accent }]}
      onPress={onPress}
    >
      <View style={[styles.swatch, { backgroundColor: station.accent }]} />
      <View style={styles.content}>
        <Text style={styles.name}>{station.name}</Text>
        <Text style={styles.tagline}>{station.genre}</Text>
        <Text style={styles.meta}>{location} - {station.format.toUpperCase()}</Text>
      </View>
      {isActive ? (
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.stroke,
    marginBottom: spacing.md,
  },
  cardActive: {
    backgroundColor: colors.cardAlt,
  },
  swatch: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.text,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E283D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  liveText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.text,
  },
});
