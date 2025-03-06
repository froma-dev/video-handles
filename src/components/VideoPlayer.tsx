import {VideoPlayerProps, VideoPlayerType} from '../types/VideoPlayerTypes';
import {useShakaPlayer} from '@hooks/useShakaPlayer'
import {useEffect, useRef, useImperativeHandle, useState} from 'react'
import {usePlayerControls} from "@hooks/usePlayerControls.ts";
import {Timeline} from "@components/Timeline.tsx";

const playerTypeName = 'html5' as VideoPlayerType
const VideoPlayer = ({videoPlayerType = playerTypeName, src, videoPlayerControlsRef}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerControls = usePlayerControls(videoRef.current)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useShakaPlayer({videoRef, src, videoPlayerType})
    useImperativeHandle(videoPlayerControlsRef, () => playerControls)
    useEffect(() => {
        const $video = videoRef.current
        const isHtml5Player = playerTypeName === videoPlayerType

        if (isHtml5Player && $video && src) {
            $video.src = src
        }
    }, [src, videoPlayerType])
    useEffect(() => {
        const $video = videoRef.current
        const onTimeUpdate = () => {
            const mediaCurrentTime = $video?.currentTime || 0
            setCurrentTime(mediaCurrentTime)
        }
        const onDurationChange = () => {
            const $video = videoRef.current
            const duration = $video?.duration || 0

            setDuration(duration)
        }

        if ($video) {
            $video?.addEventListener('timeupdate', onTimeUpdate)
            $video?.addEventListener('durationchange', onDurationChange)
        }

        return () => {
            $video?.removeEventListener('timeupdate', onTimeUpdate)
            $video?.removeEventListener('durationchange', onDurationChange)
        }
    }, []);
    const onTimelineMouseDown = () => {
        playerControls.pause()
    }
    const onTimelineMouseUp = ({value}: {value: number}) => {
        playerControls.seekTo(value)
        playerControls.play()
    }
    const onTimelineChange = () => {
        //playerControls.play()
        console.log('onTimelineChange')
    }

    return (
        <>
            <video id="video"
                   width="640"
                   poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
                   controls autoPlay
                   muted={true}
                   ref={videoRef}>
            </video>
            <Timeline
                value={currentTime}
                duration={duration}
                onMouseDown={onTimelineMouseDown}
                onMouseUp={onTimelineMouseUp}
                onChange={onTimelineChange}/>
        </>
    )
}

export default VideoPlayer