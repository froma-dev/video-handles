import { useEffect } from "react";
import shaka from "shaka-player";
import { type VideoPlayerType } from "@components/VideoPlayer";

export interface VideoPlayerHookProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  src?: string
  videoPlayerType: VideoPlayerType;
}

const playerTypeName = "shaka";
let player: shaka.Player;

export const useShakaPlayer = ({
  videoRef,
  src,
  videoPlayerType,
}: VideoPlayerHookProps) => {
  useEffect(initPlayer, []);
  useEffect(attachMediaElement, [videoPlayerType, videoRef]);
  useEffect(loadSrc, [src, videoPlayerType]);

  function initPlayer() {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) player = new shaka.Player();
    else console.error("Browser not supported!");

    // TODO window.shakaInstance = player;
  }

  function attachMediaElement() {
    const $video = videoRef?.current;

    async function attach() {
      if (!$video) return;

      await player.attach($video);
    }

    if ($video && videoPlayerType === playerTypeName) attach();
  }

  function loadSrc() {
    if (videoPlayerType === playerTypeName && src && player) {
      player.load(src).catch((err: shaka.util.Error) => {
        console.log(`Could not load src ${src}`, err);
      });

      return () => {
        if (player.status === "stop") {
          player.destroy();
        }
      };
    }
  }
};
