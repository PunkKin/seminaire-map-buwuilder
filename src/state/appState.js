import config from "../core/config.js";
import { createEmptyMapData, serializeMapData } from "./mapData.js";

export function createAppState() {
    const mapData = createEmptyMapData(config.defaultWidth, config.defaultHeight);

    return {
        baseField: null,
        currentTile: null,
        currentTool: "pen",
        activePen : false,
        currentSize: {
            width: config.defaultWidth,
            height: config.defaultHeight,
        },
        mapData,
        mapJson: serializeMapData(mapData),
    };
}
