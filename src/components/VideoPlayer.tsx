import {VideoPlayerProps, VideoPlayerType} from '../types/VideoPlayerTypes';
import {useShakaPlayer} from '@hooks/useShakaPlayer'
import {useEffect, useRef, useImperativeHandle} from 'react'

const playerTypeName = 'html5' as VideoPlayerType
const VideoPlayer = ({videoPlayerType = playerTypeName, src, ref}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useShakaPlayer({videoRef, src, videoPlayerType})

    useImperativeHandle(ref, () => {
        const $video = videoRef.current

        return {
            play() {
                $video?.play()
            },
            pause() {
                $video?.pause()
            },
            fastForward(seconds) {
                if ($video)
                    $video.currentTime += seconds
            },
            rewind(seconds) {
                if ($video)
                    $video.currentTime -= seconds
            }
        }
    })

    useEffect(() => {
        const $video = videoRef.current
        const isHtml5Player = playerTypeName === videoPlayerType

        if (isHtml5Player && $video && src) {
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