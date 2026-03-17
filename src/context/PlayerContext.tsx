import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TrackPlayer, {
  Capability,
  Event,
  IOSCategory,
  IOSCategoryMode,
  IOSCategoryOptions,
  State,
} from 'react-native-track-player';
import { stations, Station } from '../data/stations';

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export type PlayerState = {
  station: Station;
  status: PlayerStatus;
  setStation: (station: Station) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  error?: string;
};

export const PlayerContext = createContext<PlayerState | undefined>(undefined);

function mapState(state: State): PlayerStatus {
  switch (state) {
    case State.Playing:
      return 'playing';
    case State.Paused:
    case State.Stopped:
      return 'paused';
    case State.Buffering:
    case State.Connecting:
      return 'loading';
    case State.Error:
      return 'error';
    default:
      return 'idle';
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [station, setStation] = useState<Station>(stations[0]);
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const [error, setError] = useState<string | undefined>(undefined);
  const isReadyRef = useRef(false);
  const isLoadingRef = useRef(false);
  const requestIdRef = useRef(0);

  const ensurePlayer = useCallback(async () => {
    if (isReadyRef.current) return;
    await TrackPlayer.setupPlayer({
      iosCategory: IOSCategory.Playback,
      iosCategoryMode: IOSCategoryMode.Default,
      iosCategoryOptions: [IOSCategoryOptions.AllowAirPlay, IOSCategoryOptions.AllowBluetooth],
    });
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    isReadyRef.current = true;
  }, []);

  const loadAndPlay = useCallback(
    async (next: Station) => {
      const requestId = ++requestIdRef.current;
      try {
        isLoadingRef.current = true;
        setError(undefined);
        setStatus('loading');
        await ensurePlayer();
        if (requestId !== requestIdRef.current) return;
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        if (requestId !== requestIdRef.current) return;
        await TrackPlayer.add({
          id: next.id,
          url: next.streamUrl,
          title: next.name,
          artist: next.country,
        });
        if (requestId !== requestIdRef.current) return;
        await TrackPlayer.play();
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setStatus('error');
      } finally {
        isLoadingRef.current = false;
      }
    },
    [ensurePlayer],
  );

  useEffect(() => {
    let mounted = true;

    ensurePlayer().catch(() => {
      setStatus('error');
    });

    const subscription = TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
      if (!mounted) return;
      setStatus(mapState(state));
    });

    const errorSub = TrackPlayer.addEventListener(Event.PlaybackError, (payload) => {
      if (!mounted) return;
      setError(payload?.error || 'Playback error');
      setStatus('error');
    });

    return () => {
      mounted = false;
      subscription.remove();
      errorSub.remove();
      TrackPlayer.destroy();
      isReadyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ensurePlayer]);

  const handleSetStation = useCallback(
    (next: Station) => {
      setStation(next);
      loadAndPlay(next);
    },
    [loadAndPlay],
  );

  const play = useCallback(async () => {
    try {
      setError(undefined);
      setStatus('loading');
      await ensurePlayer();
      const activeTrack = await TrackPlayer.getActiveTrack();
      if (!activeTrack) {
        await loadAndPlay(station);
        return;
      }
      const state = await TrackPlayer.getState();
      if (state === State.Playing) return;
      await TrackPlayer.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, [ensurePlayer, loadAndPlay, station]);

  const pause = useCallback(async () => {
    try {
      await TrackPlayer.pause();
      setStatus('paused');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (status === 'loading') return;
    if (status === 'playing' || status === 'loading') {
      await pause();
      return;
    }
    await play();
  }, [pause, play, status]);

  const contextValue = useMemo<PlayerState>(
    () => ({
      station,
      status,
      setStation: handleSetStation,
      togglePlay,
      play,
      pause,
      error,
    }),
    [station, status, handleSetStation, togglePlay, play, pause, error],
  );

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
}
