import {useState, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from '@components/VideoPlayer'
import {VideoPlayerType} from "./types/VideoPlayerTypes.ts";

function App() {
    const [src, setSrc] = useState('')
    const srcInputRef = useRef<HTMLInputElement>(null)
    const [videoPlayerType] = useState<VideoPlayerType>('shaka')

    const onLoadVideo = () => {
        const $srcInput = srcInputRef.current
        const newSrc = $srcInput?.value
        const isSameSrc = newSrc === src
        
        if (newSrc && !isSameSrc) setSrc(() => newSrc)
    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <input type="text" ref={srcInputRef}></input>
                <button onClick={onLoadVideo}>
                    Load video
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <VideoPlayer videoPlayerType={videoPlayerType} src={src} />
        </>
    )
}

export default App
