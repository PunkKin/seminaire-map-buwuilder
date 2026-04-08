import config from "../core/config.js";

function parseDimension(value, fallback) {
    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
        return fallback;
    }

    return parsedValue;
}

export function readGridSize(widthInput, heightInput) {
    return {
        width: parseDimension(widthInput.value, config.defaultWidth),
        height: parseDimension(heightInput.value, config.defaultHeight),
    };
}
