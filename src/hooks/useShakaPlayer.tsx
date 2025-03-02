import {useEffect} from "react"
import shaka from 'shaka-player'
import type {VideoPlayerHookProps} from '../types/VideoPlayerTypes'

const playerTypeName = 'shaka'
let player
const attachMediaElement = async ($video: HTMLVideoElement) => {
    await player.attach($video);
}
export const useShakaPlayer = ({videoRef, src, videoPlayerType}: VideoPlayerHookProps) => {
    useEffect(() => {
        console.log('polyfill')
        shaka.polyfill.installAll();

        if (shaka.Player.isBrowserSupported()) {
            player = new shaka.Player()
        } else console.error('Browser not supported!')
    }, [])
    useEffect(() => {
        const $video = videoRef?.current

        if ($video) attachMediaElement($video)
    }, [videoRef])

    useEffect(() => {
        if (videoPlayerType === playerTypeName && src && player) {

            player.load(src)
                .catch((err: shaka.util.error) => {
                    console.log(`Could not load src ${src}`, err);
                })

            return () => {
                console.log('attempt', player)
                if (player.status === 'stop') {
                    player.destroy()
                }
            }
        }
    }, [src, videoPlayerType])
}
