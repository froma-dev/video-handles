export type VideoPlayerType = 'html5' | 'shaka' | 'dash'
export interface VideoPlayerProps {
    src?: string;
    videoPlayerType?: VideoPlayerType;
}
export interface VideoPlayerHookProps {
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    src?: string
    videoPlayerType: VideoPlayerType;
}