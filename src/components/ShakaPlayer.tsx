import shaka from 'shaka-player'
import {useRef, useEffect} from "react";

const videoRef = useRef(null);

const ShakaMediaPlayer = ({src}) => {
    useEffect(() => {
        const video = videoRef.current;
        const player = new shaka.Player(video);

        if (player) {
            // Listen for errors
            player.addEventListener("error", (event) => {
                console.error("Error code", event.detail.code, "object", event.detail);
            });

            // Load the video
            player.load("https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd")
                .then(() => console.log("The video has been loaded successfully!"))
                .catch((error) => console.error("Error loading video", error));
        }

        return () => player.destroy(); // Cleanup on unmount
    }, [src]);

    return <video ref={videoRef} width="640" controls autoPlay/>;
};

export default ShakaMediaPlayer;