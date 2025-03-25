export const isAdaptiveStream = (src: string) => {
    if (!src) return

    const url = new URL(src);
    const path = url.pathname;

    return path.endsWith(".m3u8") || path.endsWith(".mpd");
};