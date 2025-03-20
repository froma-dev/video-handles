import { useEffect, useState } from "react";
import shaka from "shaka-player";

interface VideoPlayerHookProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  src?: string;
  onPlaybackError?: (error: shaka.util.Error) => void;
}

const useShakaPlayer = ({
  videoRef,
  src,
  onPlaybackError
}: VideoPlayerHookProps) => {
  const [player, setPlayer] = useState<shaka.Player | null>(null);
  const [error, setError] = useState<shaka.util.Error | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isBrowserSupported = shaka.Player.isBrowserSupported();
    const shakaPlayer: shaka.Player = isBrowserSupported
      ? new shaka.Player()
      : null;
    shaka.polyfill.installAll();
    console.log('useShakaPlayer', shakaPlayer);

    const addListeners = () => {
      shakaPlayer?.addEventListener("error", onPlaybackError);
    }
    const removeListeners = () => {
      shakaPlayer?.removeEventListener("error", onPlaybackError);
    }

    if (isBrowserSupported) {
      addListeners();
      setPlayer(shakaPlayer);
    } else {
      setError(new shaka.util.Error(
        shaka.Player.ErrorCode.BROWSER_NOT_SUPPORTED, "Browser not supported!"
      ));
    }

    return () => {
      shakaPlayer?.destroy();
      setReady(false);
      setPlayer(null);
      removeListeners();
    }
  }, []);

  useEffect(() => {
    const $video = videoRef?.current;
    console.log("useEffect hay video  vref--> ", $video);
    console.log("useEffect hay player vref--> ", player);
    if (!$video) return;

    player?.attach($video)
      .then(() => {
        setReady(true);
      })
      .catch((err: shaka.util.Error) => {
        setError(err);
        setReady(false);
        console.log(`Could not load src ${src}`, err);
      });

    return () => {
      player?.detach();
    }
  }, [videoRef, player]);

  useEffect(() => {
    if (src && player) {
      player
        .load(src)
        .catch((err: shaka.util.Error) => {
          setError(err);
          console.log(`Could not load src ${src}`, err);
        });

      return () => {
        player.unload();
      };
    }
  }, [src]);

  return {
    player,
    error,
    ready,
  }
};

export default useShakaPlayer;
export type { VideoPlayerHookProps };