import { isAdaptiveStream } from "@features/video/utils/utils";
import { memo } from "react";
import Html5Player from "./Html5Player";
import ShakaPlayer from "./ShakaPlayer";

type VideoSourceProps = {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
};
const VideoSource = memo(({ src, videoRef }: VideoSourceProps) => {
  if (!src) return null;

  console.log("isAdaptiveStream(src)", isAdaptiveStream(src));
  return isAdaptiveStream(src) ? (
    <ShakaPlayer src={src} mediaRef={videoRef} />
  ) : (
    <Html5Player src={src} />
  );
});

export default VideoSource;
export type { VideoSourceProps };
