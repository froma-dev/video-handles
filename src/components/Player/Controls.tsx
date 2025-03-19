import Button from "@components/Button";
import PlayIcon from "@components/Icons/PlayIcon";
import PauseIcon from "@components/Icons/PauseIcon";
import RewindIcon from "@components/Icons/RewindIcon";
import FastForwardIcon from "@components/Icons/FastForwardIcon";
import { VideoPlayerRef } from "@components/VideoPlayer";
import { useState } from "react";

type ControlsProps = {
  videoPlayerRef: React.RefObject<VideoPlayerRef>;
};

const Controls = ({
  videoPlayerRef,
}: ControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ariaLabel = isPlaying ? "Pause" : "Play";

  const handleRewind = () => {
    videoPlayerRef?.current?.rewind();
  };

  const handlePlayPause = () => {
    videoPlayerRef.current?.playPause();
  };

  const handleFastForward = () => {
    videoPlayerRef.current?.fastForward();
  };

  return (
    <div className="player-controls">
      <Button ariaLabel="rewind" onClick={handleRewind} variant="rounded">
        <RewindIcon />
      </Button>
      <Button ariaLabel={ariaLabel} onClick={handlePlayPause} variant="rounded">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button ariaLabel="fast-forward" onClick={handleFastForward} variant="rounded">
        <FastForwardIcon />
      </Button>
    </div>
  );
};

export default Controls;
