export type VideoPlayerType = 'html5' | 'shaka' | 'dash'
export interface VideoPlayerProps {
    src?: string;
    videoPlayerType?: VideoPlayerType;
    videoPlayerControlsRef: React.Ref<VideoPlayerControls>
}
export interface VideoPlayerHookProps {
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    src?: string
    videoPlayerType: VideoPlayerType;
}
export interface VideoPlayerControls {
    play: () => void;
    pause: () => void;
    fastForward: (s: number) => void;
    rewind: (s: number) => void
}