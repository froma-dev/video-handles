import {useEffect} from "react"
import shaka from 'shaka-player'
import type {VideoPlayerHookProps} from '../types/VideoPlayerTypes'

const playerTypeName = 'shaka'
let player: shaka.Player

export const useShakaPlayer = ({videoRef, src, videoPlayerType}: VideoPlayerHookProps) => {
    const initPlayer = () => {
        shaka.polyfill.installAll();

        if (shaka.Player.isBrowserSupported()) player = new shaka.Player()
        else console.error('Browser not supported!')
    }
    const attachMediaElement = () => {
        const $video = videoRef?.current

        async function attach() {
            if (!$video) return

            await player.attach($video)
        }

        if($video && videoPlayerType === playerTypeName) attach()
    }
    const loadSrc = () => {
        if (videoPlayerType === playerTypeName && src && player) {
            player
                .load(src)
                .catch((err: shaka.util.error) => {
                    console.log(`Could not load src ${src}`, err);
                })

            return () => {
                if (player.status === 'stop') {
                    player.destroy()
                }
            }
        }
    }

    useEffect(initPlayer, [])
    useEffect(attachMediaElement, [videoPlayerType, videoRef])
    useEffect(loadSrc, [src, videoPlayerType])
}
