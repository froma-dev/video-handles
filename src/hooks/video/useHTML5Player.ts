import { useEffect, useRef } from "react";
import { playerConfig } from "@src/config";
import { type VideoPlayerType } from "@components/VideoPlayer";

interface VideoPlayerHookProps {
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    src?: string
    videoPlayerType: VideoPlayerType;
}

const useHTML5Player = ({ videoRef, src, videoPlayerType }: VideoPlayerHookProps) => {
    useEffect(() => {
        const $video = videoRef?.current;
        const isHtml5Player = playerConfig.defaultVideoPlayerType === videoPlayerType;

        const loadVideo = ($video: HTMLVideoElement, src: string) => {
            $video.src = src;
            $video.load();
        }

        const unloadVideo = ($video: HTMLVideoElement) => {
            $video.src = "";
            $video.load();
        }

        if (isHtml5Player && $video && src) {
            loadVideo($video, src);
            if ($video.autoplay) $video.play();
        }

        return () => {
            if ($video) unloadVideo($video);
        }
    }, []);


    useEffect(() => {
        const $video = videoRef?.current;
        const isHtml5Player = playerConfig.defaultVideoPlayerType === videoPlayerType;

        if (isHtml5Player && $video && src) {
            $video.src = src;
        }
    }, [src, videoPlayerType]);
}

export default useHTML5Player;
export type { VideoPlayerHookProps };
