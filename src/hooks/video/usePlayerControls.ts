import { playerConfig } from "@src/config.ts";

interface VideoPlayerControls {
    play: () => void;
    pause: () => void;
    fastForward: () => void;
    rewind: () => void;
    seekTo: (t: number) => void;
    isPlaying: () => boolean;
    getCurrentTime: () => number;
    getDuration: () => number;
    playPause: () => void;
}

const usePlayerControls = ($video: HTMLVideoElement | null): VideoPlayerControls => {
    return {
        play() {
            return $video?.play()
        },
        pause() {
            $video?.pause()
        },
        playPause() {
            if ($video && this.isPlaying()) $video.pause();
            else $video?.play();
        },
        fastForward() {
            if ($video && this.isPlaying()) {
                $video.currentTime += playerConfig.fastForward
            }
        },
        rewind() {
            if ($video) {
                $video.currentTime -= playerConfig.rewind
            }
        },
        seekTo(time: number) {
            if ($video) {
                $video.currentTime = time
            }
        },
        isPlaying() {
            return $video?.paused === false
        },
        getCurrentTime() {
            return $video?.currentTime || 0
        },
        getDuration() {
            return $video?.duration || 0
        },

    }
}

export default usePlayerControls;
export type { VideoPlayerControls };