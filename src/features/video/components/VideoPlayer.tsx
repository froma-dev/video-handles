import { useImperativeHandle, useRef } from "react";
import usePlayerImperativeHandle, {
  PlayerImperativeRef,
} from "@hooks/video/usePlayerImperativeHandle";
import { handleError } from "@utils/playerErrorHandler";
import VideoSource from "./VideoSource";
type CurrentTimeProgress = {
  currentTime: number;
  progress: number;
};

interface VideoPlayerProps {
  src?: string;
  ref: React.Ref<PlayerImperativeRef>;
  onTimeUpdate: (currentTimeProgress: CurrentTimeProgress) => void;
  onDurationChange: (duration: number) => void;
  seeking: boolean;
  onPlay: () => void;
  onPause: () => void;
  onCanPlayThrough: () => void;
}

type VideoPlayerType = "html5" | "shaka" | "dash";

const VideoPlayer = ({
  src,
  ref,
  onTimeUpdate,
  onDurationChange,
  seeking,
  onPlay,
  onPause,
  onCanPlayThrough,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerImperativeHandles = usePlayerImperativeHandle(videoRef);
  useImperativeHandle(ref, () => playerImperativeHandles);

  function handlePlaybackError(error: shaka.util.Error) {
    const errorMessage = handleError(error);

    console.error("PlaybackError>> Error: ", errorMessage);
  }

  function handleMediaError() {
    const $video = videoRef.current;
    const error = $video?.error as MediaError;

    const errorMessage = handleError(error);

    console.error("MediaError>> Error: ", errorMessage);
  }

  const handleTimeUpdate = () => {
    if (seeking && videoRef.current?.seeking) return;

    const { currentTime, progress } =
      playerImperativeHandles.getProgressTimeDuration();

    console.log(
      "handleTimeUpdate isSeeking? ",
      seeking,
      videoRef.current?.seeking,
      currentTime,
      progress
    );

    onTimeUpdate({ currentTime, progress });
  };
  const handleDurationChange = () => {
    const duration = playerImperativeHandles.getDuration() || 0;
    onDurationChange(duration);
  };

  const handlePlay = () => {
    console.log("handlePlay");
    onPlay();
  };

  const handlePause = () => {
    console.log("handlePause");
    onPause();
  };

  const handleCanPlayThrough = () => {
    console.log("handleCanPlayThrough");
    onCanPlayThrough();
  };

  const handleSeeking = () => {
    console.log("handleSeeking");
    //onSeeking();
  };

  const handleSeeked = () => {
    console.log("handleSeeked");
    //onSeeked();
  };

  const videoSrc = src || "";

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
        // Event handlers
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onError={handleMediaError}
        onPlay={handlePlay}
        onPause={handlePause}
        onCanPlayThrough={handleCanPlayThrough}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
      >
        {<VideoSource src={videoSrc} videoRef={videoRef} />}
      </video>
      {/*error && <div>Error: {error.message}</div>*/}
    </>
  );
};

export default VideoPlayer;
export type { VideoPlayerProps, VideoPlayerType, CurrentTimeProgress };
