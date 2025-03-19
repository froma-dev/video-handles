import { useState, useRef } from "react";
import "./App.css";
import VideoPlayer, { VideoPlayerRef, VideoPlayerType } from "@components/VideoPlayer";
import Controls from "@components/Player/Controls.tsx";

function App() {
  const [src, setSrc] = useState("");
  const srcInputRef = useRef<HTMLInputElement | null>(null);
  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const [videoPlayerType] = useState<VideoPlayerType>("shaka");

  const handleClickLoadVideo = () => {
    const newSrc = srcInputRef.current?.value;

    if (newSrc) {
      setSrc(newSrc);
    }
  };

  const videoPlayerProps = {
    videoPlayerType,
    src,
    ref: videoPlayerRef,
  };

  return (
    <div className="app">
      <h1>Shaka here</h1>
      <VideoPlayer {...videoPlayerProps} />
      <Controls videoPlayerRef={videoPlayerRef}/>
      
      <div className="card">
        <input type="text" ref={srcInputRef}></input>
        <button onClick={handleClickLoadVideo}>Load video</button>
      </div>
    </div>
  );
}

export default App;
