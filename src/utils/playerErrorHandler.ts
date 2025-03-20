import {
    MEDIA_ERROR_MESSAGE,
    SHAKA_ERROR_CATEGORY_MESSAGE,
    MediaErrorCode,
} from "@constants/errors";

const errorMessageTemplate = (code: string, message: string) => {
    return `Error ${code}: ${message}`;
};

export const handleMediaError = (error: MediaError) => {
    const code = error.code as MediaErrorCode;
    const message = MEDIA_ERROR_MESSAGE[code] || "Unknown error";
    const errorMessage = errorMessageTemplate(String(code), message);

    return errorMessage;
};

export const handleShakaError = (error: shaka.util.Error) => {
    const code = error.code as shaka.util.Error.Code;
    const category = error.category as shaka.util.Error.Category;
    const message = SHAKA_ERROR_CATEGORY_MESSAGE[category] || "Unknown error";
    const errorMessage = errorMessageTemplate(String(code), message);

    return errorMessage;
};

export const handleError = (error: MediaError | shaka.util.Error) => {
    let errorMessage = "";

    if (error instanceof MediaError) {
        errorMessage = handleMediaError(error);
    } else if (error instanceof shaka.util.Error) {
        errorMessage = handleShakaError(error);
    } else {
        errorMessage = "Unknown error";
    }

    console.error(errorMessage);

    return errorMessage;
}