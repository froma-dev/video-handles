import { useShakaPlayer } from "@hooks/video/useShakaPlayer";
import { useEffect, useRef, useImperativeHandle, useState } from "react";
import usePlayerControls, {
  type VideoPlayerControls,
} from "@hooks/video/usePlayerControls.ts";
import { Timeline } from "@components/Player/Timeline";
import { playerConfig } from "@src/config.ts";
import useHTML5Player from "@hooks/video/useHTML5Player";

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
} | null;
interface VideoPlayerProps {
  src?: string;
  videoPlayerType?: VideoPlayerType;
  ref: React.Ref<VideoPlayerRef>;
}
type VideoPlayerType = "html5" | "shaka" | "dash";

const VideoPlayer = ({
  videoPlayerType = playerConfig.defaultVideoPlayerType,
  src,
  ref,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerControls = usePlayerControls(videoRef.current);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

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
    };
  });

  useEffect(() => {
    const $video = videoRef.current;
    const onTimeUpdate = () => {
      const mediaCurrentTime = $video?.currentTime || 0;
      setCurrentTime(mediaCurrentTime);
    };
    const onDurationChange = () => {
      const $video = videoRef.current;
      const duration = $video?.duration || 0;

      setDuration(duration);
    };

    if ($video) {
      $video?.addEventListener("timeupdate", onTimeUpdate);
      $video?.addEventListener("durationchange", onDurationChange);
    }

    return () => {
      $video?.removeEventListener("timeupdate", onTimeUpdate);
      $video?.removeEventListener("durationchange", onDurationChange);
    };
  }, []);

  useShakaPlayer({ videoRef, src, videoPlayerType });
  useHTML5Player({ videoRef, src, videoPlayerType });

  const onTimelineMouseDown = () => {
    playerControls.pause();
    setSeeking(true);
  };
  const onTimelineMouseUp = ({ value }: { value: number }) => {
    playerControls.seekTo(value);
    playerControls.play();
  };
  const onTimelineChange = () => {
    //playerControls.play()
    console.log("onTimelineChange");
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
        onSeeking={() => setSeeking(true)}
        onSeeked={() => setSeeking(false)}
      ></video>
      <Timeline
        onMouseDown={onTimelineMouseDown}
        onMouseUp={onTimelineMouseUp}
        onChange={onTimelineChange}
        videoRef={videoRef}
      />
    </>
  );
};

export default VideoPlayer;
export type { VideoPlayerProps, VideoPlayerType, VideoPlayerRef };
