import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { PlayerProvider } from './src/context/PlayerContext';
import { MiniPlayer } from './src/components/MiniPlayer';
import { TabBar, TabKey } from './src/components/TabBar';
import { AboutScreen } from './src/screens/AboutScreen';
import { InfoScreen } from './src/screens/InfoScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';
import { StationDetailScreen } from './src/screens/StationDetailScreen';
import { StationsScreen } from './src/screens/StationsScreen';
import { colors } from './src/theme';

function AppContent() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('player');
  const [showStationDetail, setShowStationDetail] = useState(false);
  const bottomSpacer = insets.bottom - 30;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.background}>
        <View style={styles.backgroundOrb} />
        <View style={styles.backgroundOrbRight} />
      </View>
      <View style={[styles.content, { paddingBottom: bottomSpacer }]}>
        {showStationDetail ? (
          <StationDetailScreen onClose={() => setShowStationDetail(false)} />
        ) : activeTab === 'player' ? (
          <PlayerScreen />
        ) : activeTab === 'stations' ? (
          <StationsScreen onOpenStation={() => setShowStationDetail(true)} />
        ) : activeTab === 'info' ? (
          <InfoScreen />
        ) : (
          <AboutScreen />
        )}
      </View>
      <MiniPlayer
        onOpen={() => {
          setShowStationDetail(false);
          setActiveTab('player');
        }}
      />
      <View style={{ paddingBottom: insets.bottom }}>
        <TabBar
          active={activeTab}
          onChange={tab => {
            setShowStationDetail(false);
            setActiveTab(tab);
          }}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundOrb: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#121826',
    top: -60,
    left: -40,
    opacity: 0.9,
  },
  backgroundOrbRight: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#1E263B',
    bottom: 80,
    right: -80,
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
});
