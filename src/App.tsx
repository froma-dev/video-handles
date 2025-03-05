import {useState, useRef} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import VideoPlayer from '@components/VideoPlayer'
import {VideoPlayerControls, VideoPlayerType} from "./types/VideoPlayerTypes.ts";

function App() {
    const [src, setSrc] = useState('')
    const srcInputRef = useRef<HTMLInputElement>(null)
    const videoPlayerControlsRef = useRef<VideoPlayerControls>(null)
    const [videoPlayerType] = useState<VideoPlayerType>('shaka')

    const onLoadVideoClicked = () => {
        const $srcInput = srcInputRef.current
        const newSrc = $srcInput?.value
        const isSameSrc = newSrc === src
        
        if (newSrc && !isSameSrc)
            setSrc(() => newSrc)
    }

    const onPauseClicked = () => {
        videoPlayerControlsRef.current?.pause()
    }

    const onPlayClicked = () => {
        videoPlayerControlsRef.current?.play()
    }

    const onStepFastForward = () => {
        videoPlayerControlsRef.current?.fastForward(4)
    }

    const onStepRewind = () => {
        videoPlayerControlsRef.current?.rewind(4)
    }

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Shaka here</h1>
            <VideoPlayer videoPlayerType={videoPlayerType} src={src} videoPlayerControlsRef={videoPlayerControlsRef} />
            <div className="card">
                <input type="text" ref={srcInputRef}></input>
                <button onClick={onLoadVideoClicked}>Load video</button>
                <button onClick={onPlayClicked}>Play</button>
                <button onClick={onPauseClicked}>Pause</button>
                <button onClick={onStepFastForward}>+10</button>
                <button onClick={onStepRewind}>-10</button>
            </div>
        </>
    )
}

export default App
