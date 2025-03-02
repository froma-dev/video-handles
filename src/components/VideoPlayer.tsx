import { VideoPlayerProps, VideoPlayerType } from '../types/VideoPlayerTypes';
import {useShakaPlayer} from '@hooks/useShakaPlayer'
import {useEffect, useRef} from 'react'

const playerTypeName = 'html5' as VideoPlayerType
const VideoPlayer = ({videoPlayerType = playerTypeName, src}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useShakaPlayer({videoRef, src, videoPlayerType})

    useEffect(() => {
        const $video = videoRef.current

        if (videoPlayerType === 'html5' && $video && src) {
            $video.src = src
        }
    }, [src, videoPlayerType]);

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