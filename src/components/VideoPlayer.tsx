import { useShakaPlayer } from "@hooks/video/useShakaPlayer";
import { useRef, useImperativeHandle } from "react";
import usePlayerControls from "@hooks/video/usePlayerControls.ts";
import { playerConfig } from "@src/config.ts";
//import useHTML5Player from "@hooks/video/useHTML5Player";
type CurrentTimeProgress = {
  currentTime: number;
  progress: number;
  duration: number;
};

type VideoPlayerRef = {
  play: () => void;
  pause: () => void;
  fastForward: () => void;
  rewind: () => void;
  seekTo: (t: number) => void;
  isPlaying: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  playPause: () => void;
  getProgressTimeDuration: () => CurrentTimeProgress;
} | null;
interface VideoPlayerProps {
  src?: string;
  videoPlayerType?: VideoPlayerType;
  ref: React.Ref<VideoPlayerRef>;
  onTimeUpdate: (currentTimeProgress: CurrentTimeProgress) => void;
  onDurationChange: (duration: number) => void;
  seeking: boolean;
}

type VideoPlayerType = "html5" | "shaka" | "dash";

const VideoPlayer = ({
  videoPlayerType = playerConfig.defaultVideoPlayerType,
  src,
  ref,
  onTimeUpdate,
  onDurationChange,
  seeking,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideo = () => {
    const $video = videoRef.current;
    if (!$video) {
      console.warn("Video element is not available");
      return null;
    }
    return $video;
  };

  const play = () => {
    const $video = getVideo();
    return $video?.play();
  };
  const pause = () => {
    const $video = getVideo();
    $video?.pause();
  };
  const playPause = () => {
    const $video = getVideo();
    if ($video && isPlaying()) $video.pause();
    else $video?.play();
  };
  const fastForward = () => {
    const $video = getVideo();
    if ($video && isPlaying()) {
      $video.currentTime += playerConfig.fastForward;
    }
  };
  const rewind = () => {
    const $video = getVideo();
    if ($video) {
      $video.currentTime -= playerConfig.rewind;
    }
  };
  const seekTo = (time: number) => {
    const $video = getVideo();
    if ($video) {
      $video.currentTime = time;
    }
  };
  const isPlaying = () => {
    const $video = getVideo();
    return $video?.paused === false;
  };
  const getCurrentTime = () => {
    const $video = getVideo();
    return $video?.currentTime || 0;
  };
  const getDuration = () => {
    const $video = getVideo();
    return $video?.duration || 0;
  };
  const getProgress = () => {
    const $video = getVideo();
    const currentTime = $video?.currentTime || 0;
    const duration = $video?.duration || 0;
    const progress = currentTime / duration || 0;

    return progress;
  };

  const getProgressTimeDuration = (): CurrentTimeProgress => {
    const $video = getVideo();

    const currentTime = $video?.currentTime || 0;
    const duration = $video?.duration || 0;
    const progress = currentTime / duration || 0;

    return { currentTime, duration, progress };
  };

  useImperativeHandle(ref, () => {
    return {
      play,
      pause,
      playPause,
      fastForward,
      rewind,
      seekTo,
      isPlaying,
      getCurrentTime,
      getDuration,
      getProgressTimeDuration,
    };
  });

  useShakaPlayer({ videoRef, src, videoPlayerType });
  //useHTML5Player({ videoRef, src, videoPlayerType });

  const handleTimeUpdate = () => {
    const { currentTime, progress, duration } =
      getProgressTimeDuration();

    if (seeking) return;
    onTimeUpdate({ currentTime, progress, duration });
  };
  const handleDurationChange = () => {
    const duration = getDuration() || 0;
    onDurationChange(duration);
  };

  return (
    <>
      <video
        id="video"
        width="640"
        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
        controls
        autoPlay
        muted={true}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
      ></video>
    </>
  );
};

export default VideoPlayer;
export type {
  VideoPlayerProps,
  VideoPlayerType,
  VideoPlayerRef,
  CurrentTimeProgress,
};
