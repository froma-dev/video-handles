import {VideoPlayerProps, VideoPlayerType} from '../types/VideoPlayerTypes';
import {useShakaPlayer} from '@hooks/useShakaPlayer'
import {useEffect, useRef, useImperativeHandle} from 'react'
import {usePlayerControls} from "@hooks/usePlayerControls.ts";

const playerTypeName = 'html5' as VideoPlayerType
const VideoPlayer = ({videoPlayerType = playerTypeName, src, videoPlayerControlsRef}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerControls = usePlayerControls(videoRef.current)

    useShakaPlayer({videoRef, src, videoPlayerType})
    useImperativeHandle(videoPlayerControlsRef, () => playerControls)
    useEffect(() => {
        const $video = videoRef.current
        const isHtml5Player = playerTypeName === videoPlayerType

        if (isHtml5Player && $video && src) {
            $video.src = src
        }
    }, [src, videoPlayerType])

    return (
        <video id="video"
               width="640"
               poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
               controls autoPlay
               muted={true}
               ref={videoRef}>
        </video>
    )
}

export default VideoPlayer