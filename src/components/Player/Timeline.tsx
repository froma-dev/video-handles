import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { delay } from "@utils/utils.ts";
import "@styles/Timeline.css";
import { playerConfig } from "@src/config";

interface TimelineProps {
  onChange?: () => void;
  onMouseDown: () => void;
  onMouseUp: ({ value }: { value: number }) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const finishScrubbingDelayMs = 500;

export const Timeline = ({
  onChange,
  onMouseUp,
  onMouseDown,
  videoRef,
}: TimelineProps) => {
  const [timelineValue, setTimelineValue] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const value = videoRef.current?.currentTime || 0;

  useEffect(() => {
    const $video = videoRef.current;
    console.log("videoRef", $video);
    const onTimeUpdate = () => {
      const mediaCurrentTime = $video?.currentTime || 0;
      setTimelineValue(mediaCurrentTime);
    };

    $video?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      $video?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isScrubbing) {
      setTimelineValue(Math.floor(value));
    }
  }, [isScrubbing]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newTimelineValue = Number(ev.target.value);

    setTimelineValue(Math.floor(newTimelineValue));
  };
  const handleMouseDown = () => {
    setIsScrubbing(true);
    onMouseDown();
  };
  const handleMouseUp = async (ev: MouseEvent<HTMLInputElement>) => {
    onMouseUp({ value: timelineValue });
    await delay(finishScrubbingDelayMs);
    setIsScrubbing(false);
  };

  const duration = Math.floor(videoRef.current?.duration || 0);

  return (
    <div className="timeline">
      <span className="min-value">{timelineValue}</span>
      <input
        className="input"
        type="range"
        disabled={duration <= 0}
        onChange={handleChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        step={playerConfig.scrub}
        max={duration}
        value={timelineValue}
        min="0"
        aria-label="Time scrubber"
        aria-valuetext={`elapsed time: ${timelineValue}`}
        aria-description={`total time: ${duration}`}
      />
      <span className="max-value">{duration}</span>
    </div>
  );
};
