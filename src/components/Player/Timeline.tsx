import { ChangeEvent, useState, useRef } from "react";
import "@styles/Timeline.css";
import { playerConfig } from "@src/config";
import { delay } from "@utils/utils";

interface TimelineProps {
  progress: number;
  duration: number;
  currentTime: number;
  onMouseDown: () => void;
  onMouseUp: (seekingTime: number) => void;
  onChange: (newSeekTime: number) => void;
}

const finishScrubbingDelayMs = 500;
const MAX_TIMELINE = 100;

export const Timeline = ({
  progress,
  duration,
  currentTime,
  onMouseDown,
  onMouseUp,
  onChange,
}: TimelineProps) => {
  const [seekingTime, setSeekingTime] = useState<number>(currentTime);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const timelineRef = useRef<HTMLInputElement>(null);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const timelineValue = Number(ev.target.value);

    const newSeekTime = timelineValue / MAX_TIMELINE;

    onChange(newSeekTime);
    console.log("newSeekTime", newSeekTime);
    setSeekingTime(newSeekTime);
  };

  const handleMouseDown = () => {
    const timelineValue = Number(timelineRef.current?.value ?? 0);

    setIsSeeking(true);
    setSeekingTime(timelineValue / MAX_TIMELINE);
    onMouseDown();
  };

  const handleMouseUp = () => {
    onMouseUp(seekingTime * duration);
    delay(finishScrubbingDelayMs).then(() => {
      setIsSeeking(false);
    });
  };

  const getTimelineValue = () => {
    const timelineValue = isSeeking
      ? seekingTime * MAX_TIMELINE
      : progress * MAX_TIMELINE;

    return Math.floor(timelineValue);
  };

  const getElapsedTime = () => {
    const elapsedTime = isSeeking ? seekingTime * duration : currentTime;

    return Math.floor(elapsedTime);
  };

  const timelineValue = getTimelineValue();
  const elapsedTime = getElapsedTime();

  const div = "|";

  console.table([
    {
      timelineValue,
      elapsedTime,
      isSeeking,
      seekingTime,
      div,
      progress,
      duration,
      currentTime,
    },
  ]);

  return (
    <div className="timeline">
      <span className="min-value">{elapsedTime}</span>
      <input
        ref={timelineRef}
        className="input"
        type="range"
        disabled={duration <= 0}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        step={playerConfig.scrub}
        max={MAX_TIMELINE}
        value={timelineValue}
        min="0"
        aria-label="Time scrubber"
        aria-valuetext={`elapsed time: ${elapsedTime}`}
        aria-description={`total time: ${duration}`}
      />
      <span className="max-value">{duration}</span>
      <span className="seeking-time">{elapsedTime}</span>
    </div>
  );
};
