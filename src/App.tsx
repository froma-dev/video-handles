import { useState, useRef } from "react";
import "./App.css";
import VideoPlayer, {
  type VideoPlayerType,
  type CurrentTimeProgress,
} from "@components/VideoPlayer";
import { type PlayerImperativeRef } from "@hooks/video/usePlayerImperativeHandle";
import Controls from "@components/Player/Controls.tsx";
import { Timeline } from "@components/Player/Timeline";

function App() {
  const [src, setSrc] = useState("");
  const srcInputRef = useRef<HTMLInputElement | null>(null);
  const videoPlayerRef = useRef<PlayerImperativeRef | null>(null);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPlayerType] = useState<VideoPlayerType>("shaka");
  const [currentTimeProgress, setCurrentTimeProgress] =
    useState<CurrentTimeProgress>({
      currentTime: 0,
      progress: 0,
    });
  const [duration, setDuration] = useState(0);

  const handleClickLoadVideo = () => {
    const newSrc = srcInputRef.current?.value;

    if (newSrc) {
      setSrc(newSrc);
    }
  };

  const handleTimeUpdate = (currentTimeProgress: CurrentTimeProgress) => {
    setCurrentTimeProgress((prevCurrentTimeProgress) => ({
      ...prevCurrentTimeProgress,
      ...currentTimeProgress,
    }));
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  const handlePlayEvent = () => {
    console.log("handlePlay");
    setIsPlaying(true);
  };

  const handlePauseEvent = () => {
    console.log("handlePause");
    setIsPlaying(false);
  };

  const handleCanPlayThroughEvent = () => {
    console.log("handleCanPlayThrough");
  };

  const handleChange = (newSeekTime: number) => {
    console.log("handleChange", newSeekTime);
  };

  const handleMouseUp = (seekingTime: number) => {
    console.log("handleMouseUp", seekingTime);
    videoPlayerRef.current?.seekTo(seekingTime);
    setSeeking(false);
  };

  const videoPlayerProps = {
    videoPlayerType,
    src,
    ref: videoPlayerRef,
    onTimeUpdate: handleTimeUpdate,
    onDurationChange: handleDurationChange,
    seeking,
    onPlay: handlePlayEvent,
    onPause: handlePauseEvent,
    onCanPlayThrough: handleCanPlayThroughEvent,
  };

  return (
    <div className="app">
      <h1>Shaka here</h1>
      <VideoPlayer {...videoPlayerProps} />
      <Controls videoPlayerRef={videoPlayerRef} isPlaying={isPlaying} />
      <Timeline
        progress={currentTimeProgress.progress}
        duration={duration}
        currentTime={currentTimeProgress.currentTime}
        onMouseDown={() => setSeeking(true)}
        onMouseUp={handleMouseUp}
        onChange={handleChange}
      />

      <div className="card">
        <label htmlFor="src">Source</label>
        <input id="src" type="text" ref={srcInputRef}></input>
        <button onClick={handleClickLoadVideo}>Load video</button>
      </div>
    </div>
  );
}

export default App;
