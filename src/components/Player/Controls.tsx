import Button from "@components/Button";
import PlayIcon from "@components/Icons/PlayIcon";
import PauseIcon from "@components/Icons/PauseIcon";
import RewindIcon from "@components/Icons/RewindIcon";
import FastForwardIcon from "@components/Icons/FastForwardIcon";
import type { PlayerImperativeRef } from "@hooks/video/usePlayerImperativeHandle";

type ControlsProps = {
  videoPlayerRef: React.RefObject<PlayerImperativeRef | null>;
  isPlaying: boolean;
};

const Controls = ({ videoPlayerRef, isPlaying }: ControlsProps) => {
  const ariaLabel = isPlaying ? "Pause" : "Play";

  const handleRewind = () => {
    videoPlayerRef.current?.rewind();
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
      <Button
        ariaLabel="fast-forward"
        onClick={handleFastForward}
        variant="rounded"
      >
        <FastForwardIcon />
      </Button>
    </div>
  );
};

export default Controls;
