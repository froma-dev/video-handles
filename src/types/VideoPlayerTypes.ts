export type VideoPlayerType = 'html5' | 'shaka' | 'dash'
export interface VideoPlayerProps {
    src?: string;
    videoPlayerType?: VideoPlayerType;
    ref: React.Ref<VideoPlayerHandles>
}
export interface VideoPlayerHookProps {
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    src?: string
    videoPlayerType: VideoPlayerType;
}
export interface VideoPlayerHandles {
    play: () => void;
    pause: () => void;
    fastForward: (s: number) => void;
    rewind: (s: number) => void
}