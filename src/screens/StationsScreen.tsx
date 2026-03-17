import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { stations } from '../data/stations';
import { usePlayer } from '../hooks/usePlayer';
import { StationCard } from '../components/StationCard';
import { colors, fonts, spacing } from '../theme';

export function StationsScreen({ onOpenStation }: { onOpenStation: () => void }) {
  const { station, setStation } = usePlayer();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Stations</Text>
      <Text style={styles.subtitle}>Choose a station and start streaming instantly.</Text>
      <View style={styles.list}>
        {stations.map((item) => (
          <StationCard
            key={item.id}
            station={item}
            isActive={station.id === item.id}
            onPress={() => {
              setStation(item);
              onOpenStation();
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: spacing.lg,
  },
  list: {
  },
});
