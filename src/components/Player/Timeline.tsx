import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "@styles/Timeline.css";
import { playerConfig } from "@src/config";

interface TimelineProps {
  progress: number;
  duration: number;
  currentTime: number;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const finishScrubbingDelayMs = 500;

export const Timeline = ({
  progress,
  duration,
  currentTime,
  onMouseDown,
  onMouseUp,
}: TimelineProps) => {
  const [seekingTime, setSeekingTime] = useState<number>(currentTime);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newSeekTime = Number(ev.target.value);

    setSeekingTime(Math.floor(newSeekTime / duration));
  };

  const handleMouseDown = () => {
    onMouseDown();
  };

  const handleMouseUp = () => {
    onMouseUp();
  };

  const elapsedTime = Math.floor(progress * duration);

  return (
    <div className="timeline">
      <span className="min-value">{elapsedTime}</span>
      <input
        className="input"
        type="range"
        disabled={duration <= 0}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        step={playerConfig.scrub}
        max={duration}
        value={elapsedTime}
        min="0"
        aria-label="Time scrubber"
        aria-valuetext={`elapsed time: ${elapsedTime}`}
        aria-description={`total time: ${duration}`}
      />
      <span className="max-value">{duration}</span>
      <span className="seeking-time">{seekingTime}</span>
    </div>
  );
};
