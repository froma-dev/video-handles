import { useState, useRef } from "react";
import "./App.css";
import VideoPlayer, {
  type VideoPlayerRef,
  type VideoPlayerType,
  type CurrentTimeProgress,
} from "@components/VideoPlayer";
import Controls from "@components/Player/Controls.tsx";
import { Timeline } from "@components/Player/Timeline";

function App() {
  const [src, setSrc] = useState("");
  const srcInputRef = useRef<HTMLInputElement | null>(null);
  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const [seeking, setSeeking] = useState(false);
  const [videoPlayerType] = useState<VideoPlayerType>("shaka");
  const [currentTimeProgress, setCurrentTimeProgress] =
    useState<CurrentTimeProgress>({
      currentTime: 0,
      progress: 0,
      duration: 0,
    });

  const handleClickLoadVideo = () => {
    const newSrc = srcInputRef.current?.value;

    if (newSrc) {
      setSrc(newSrc);
    }
  };

  const handleTimeUpdate = (currentTimeProgress: CurrentTimeProgress) => {
    setCurrentTimeProgress(currentTimeProgress);
  };

  const handleDurationChange = (duration: number) => {
    setCurrentTimeProgress({ ...currentTimeProgress, duration });
  };

  const videoPlayerProps = {
    videoPlayerType,
    src,
    ref: videoPlayerRef,
    onTimeUpdate: handleTimeUpdate,
    onDurationChange: handleDurationChange,
    seeking,
  };

  return (
    <div className="app">
      <h1>Shaka here</h1>
      <VideoPlayer {...videoPlayerProps} />
      <Controls videoPlayerRef={videoPlayerRef} />
      <Timeline
        videoPlayerRef={videoPlayerRef}
        progress={currentTimeProgress.progress}
        duration={currentTimeProgress.duration}
        currentTime={currentTimeProgress.currentTime}
        onMouseDown={() => setSeeking(true)}
        onMouseUp={() => setSeeking(false)}
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
