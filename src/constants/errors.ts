
type MediaErrorCode =
    MediaError["MEDIA_ERR_ABORTED"]
    | MediaError["MEDIA_ERR_NETWORK"]
    | MediaError["MEDIA_ERR_DECODE"]
    | MediaError["MEDIA_ERR_SRC_NOT_SUPPORTED"];
type MediaErrorCodeMessage = Record<MediaErrorCode, string>;
type ShakaErrorCategoryMessage = Record<shaka.util.Error.Category, string>;

const ShakaErrorCategory = shaka.util.Error.Category;

export const MEDIA_ERROR_MESSAGE: MediaErrorCodeMessage = {
    [MediaError.MEDIA_ERR_ABORTED]: "Playback was aborted",
    [MediaError.MEDIA_ERR_NETWORK]: "A network error occurred",
    [MediaError.MEDIA_ERR_DECODE]: "A decode error occurred",
    [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]: "The media is not supported",
};

export const SHAKA_ERROR_CATEGORY_MESSAGE: ShakaErrorCategoryMessage = {
    [ShakaErrorCategory.NETWORK]: "A network error occurred",
    [ShakaErrorCategory.TEXT]: "Error parsing text streams.",
    [ShakaErrorCategory.MEDIA]: "Error parsing or processing audio or video streams.",
    [ShakaErrorCategory.MANIFEST]: "Error parsing the Manifest.",
    [ShakaErrorCategory.STREAMING]: "Error related to streaming.",
    [ShakaErrorCategory.DRM]: "Error related to DRM.",
    [ShakaErrorCategory.PLAYER]: "Miscellaneous errors from the player.",
    [ShakaErrorCategory.CAST]: "Error related to cast.",
    [ShakaErrorCategory.STORAGE]: "Error in the database storage (offline).",
    [ShakaErrorCategory.ADS]: "Error related to ad insertion.",
};

export type {
    MediaErrorCodeMessage,
    MediaErrorCode,
    ShakaErrorCategory,
};
