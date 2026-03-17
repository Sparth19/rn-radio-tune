import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';

export type TabKey = 'player' | 'stations' | 'info' | 'about';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'player', label: 'Player' },
  { key: 'stations', label: 'Stations' },
  { key: 'info', label: 'Info' },
  { key: 'about', label: 'About' },
];

export function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.item}
            onPress={() => onChange(tab.key)}
          >
            <View
              style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}
            >
              <TabIcon type={tab.key} active={isActive} />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TabIcon({ type, active }: { type: TabKey; active: boolean }) {
  const tint = active ? colors.bg : colors.accentSoft;
  switch (type) {
    case 'player':
      return (
        <View style={styles.iconPlay}>
          <View style={[styles.iconPlayTriangle, { borderLeftColor: tint }]} />
        </View>
      );
    case 'stations':
      return (
        <View style={styles.iconBars}>
          <View style={[styles.bar, { backgroundColor: tint, height: 6 }]} />
          <View style={[styles.bar, { backgroundColor: tint, height: 10 }]} />
          <View style={[styles.bar, { backgroundColor: tint, height: 14 }]} />
        </View>
      );
    case 'info':
      return (
        <View style={styles.iconInfo}>
          <View style={[styles.infoDot, { backgroundColor: tint }]} />
          <View style={[styles.infoStem, { backgroundColor: tint }]} />
        </View>
      );
    case 'about':
      return (
        <View style={styles.iconAbout}>
          <View style={[styles.aboutCircle, { borderColor: tint }]} />
          <View style={[styles.aboutLine, { backgroundColor: tint }]} />
        </View>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.stroke,
  },
  item: {
    alignItems: 'center',
  },
  iconWrapper: {
    height: 38,
    width: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardAlt,
  },
  iconWrapperActive: {
    backgroundColor: colors.accent,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  labelActive: {
    color: colors.text,
  },
  iconPlay: {
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlayTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  iconBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 4,
    borderRadius: 2,
    marginRight: 3,
  },
  iconInfo: {
    alignItems: 'center',
  },
  infoDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginBottom: 2,
  },
  infoStem: {
    width: 4,
    height: 12,
    borderRadius: 2,
  },
  iconAbout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  aboutLine: {
    width: 12,
    height: 2,
    borderRadius: 1,
    marginTop: 3,
  },
});
