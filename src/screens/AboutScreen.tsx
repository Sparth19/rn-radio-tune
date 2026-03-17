import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';

export function AboutScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>About RadioTune</Text>
      <Text style={styles.subtitle}>A simple way to listen to inspiring radio stations.</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>What you get</Text>
        <Text style={styles.body}>- Curated live stations with stable streams.</Text>
        <Text style={styles.body}>- A calm interface focused on listening.</Text>
        <Text style={styles.body}>- Fast access to your favorite broadcasts.</Text>
      </View>
      <View style={styles.cardAlt}>
        <Text style={styles.sectionTitle}>Listener Support</Text>
        <Text style={styles.body}>
          If a stream drops, refresh by switching stations or tapping play again.
        </Text>
      </View>
      <View style={styles.cardAlt}>
        <Text style={styles.sectionTitle}>Community Ready</Text>
        <Text style={styles.body}>
          This build is designed for faith-based and community-focused stations to grow their reach.
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
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  cardAlt: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    lineHeight: 20,
  },
});
