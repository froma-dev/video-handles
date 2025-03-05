import {VideoPlayerControls} from "../types/VideoPlayerTypes.ts";

export const usePlayerControls = ($video: HTMLVideoElement | null): VideoPlayerControls => {
    return {
        play() {
            $video?.play()
        },
        pause() {
            $video?.pause()
        },
        fastForward(seconds) {
            if ($video) $video.currentTime += seconds
        },
        rewind(seconds) {
            if ($video) $video.currentTime -= seconds
        }
    }
}
