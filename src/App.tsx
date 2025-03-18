import { useState, useRef } from "react";
import { useRoutes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import VideoPlayer from "@components/VideoPlayer";
import {
  VideoPlayerControls,
  VideoPlayerType,
} from "./types/VideoPlayerTypes.ts";

function App() {
  const routes = useRoutes(
  const [src, setSrc] = useState("");
  const srcInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerControlsRef = useRef<VideoPlayerControls>(null);
  const [videoPlayerType] = useState<VideoPlayerType>("shaka");

  const handleClickLoadVideo = () => {
    const $srcInput = srcInputRef.current;
    const newSrc = $srcInput?.value;
    const isSameSrc = newSrc === src;

    if (newSrc && !isSameSrc) setSrc(() => newSrc);
  };

  const handleClickPause = () => {
    videoPlayerControlsRef.current?.pause();
  };

  const handleClickPlay = () => {
    videoPlayerControlsRef.current?.play();
  };

  const handleClickStepFastForward = () => {
    videoPlayerControlsRef.current?.fastForward(4);
  };

  const handleClickStepRewind = () => {
    videoPlayerControlsRef.current?.rewind(4);
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Shaka here</h1>
      <VideoPlayer
        videoPlayerType={videoPlayerType}
        src={src}
        videoPlayerControlsRef={videoPlayerControlsRef}
      />
      <div className="card">
        <input type="text" ref={srcInputRef}></input>
        <button onClick={handleClickLoadVideo}>Load video</button>
        <button onClick={handleClickPlay}>Play</button>
        <button onClick={handleClickPause}>Pause</button>
        <button onClick={handleClickStepFastForward}>+10</button>
        <button onClick={handleClickStepRewind}>-10</button>
      </div>
    </>
  );
}

export default App;
