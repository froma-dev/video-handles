import { useRef, useEffect, useState } from "react";
import shaka from "shaka-player";

type ShakaPlayer = shaka.Player;

type ShakaPlayerProps = {
  src: string;
  mediaRef: React.RefObject<HTMLMediaElement | null>;
};

const ShakaPlayer = ({ src, mediaRef }: ShakaPlayerProps) => {
  const [shakaPlayer, setShakaPlayer] = useState<ShakaPlayer | null>(null);

  useEffect(() => {
    shaka.polyfill.installAll();
    const player = new shaka.Player();
    setShakaPlayer(player);
    console.log("setting shaka player");

    return () => {
      shakaPlayer?.unload();
      shakaPlayer?.destroy();
      setShakaPlayer(null);
    };
  }, []);

  // Attach $video and load source
  useEffect(() => {
    if (!mediaRef.current || !shakaPlayer) return;

    const attachVideo = async () => {
      try {
        if (mediaRef.current) {
          await shakaPlayer?.attach(mediaRef.current, true);
          console.log("attached video element");
        } else throw new Error("Video element not found");
      } catch (error) {
        console.error("Error attaching video element: ", error);
      }
    };

    const loadSource = async () => {
      try {
        await shakaPlayer?.load(src);
      } catch (error) {
        console.error("Error loading src: ", error);
      }
    };

    attachVideo();
    if (src != null) loadSource();

    return () => {
      shakaPlayer?.unload();
      shakaPlayer?.detach();
    };
  }, [shakaPlayer, mediaRef, src]);

  return null;
};

export default ShakaPlayer;
export type { ShakaPlayerProps };
