import config from "../core/config.js";
import { floodFillCells, setCell, syncMapJson } from "../state/mapData.js";

function getCanvasDimensions(context) {
    return {
        width: context.canvas.width,
        height: context.canvas.height,
    };
}

export function resizeCanvas(canvas, size) {
    const cellSize = Math.floor(
        Math.min(
            config.maxCanvasWidth / size.width,
            config.maxCanvasHeight / size.height,
        ),
    );

    canvas.width = cellSize * size.width;
    canvas.height = cellSize * size.height;
}

export function clearCanvas(context) {
    const { width, height } = getCanvasDimensions(context);

    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
}

export function drawGrid(context, size) {
    const canvasSize = getCanvasDimensions(context);
    const { width, height } = size;
    const squareWidth = canvasSize.width / width;
    const squareHeight = canvasSize.height / height;

    clearCanvas(context);

    context.strokeStyle = "#6080F0";
    context.beginPath();

    for (let x = 1; x < width; x += 1) {
        context.moveTo(x * squareWidth, 0);
        context.lineTo(x * squareWidth, canvasSize.height);
    }

    for (let y = 1; y < height; y += 1) {
        context.moveTo(0, y * squareHeight);
        context.lineTo(canvasSize.width, y * squareHeight);
    }

    context.stroke();
    context.closePath();
}

export function getCellFromEvent(event, size) {
    const canvas = event.currentTarget;
    const squareWidth = canvas.width / size.width;
    const squareHeight = canvas.height / size.height;

    return {
        x: Math.floor(event.offsetX / squareWidth),
        y: Math.floor(event.offsetY / squareHeight),
    };
}

export function drawTile(context, tileSet, size, x, y, tileIndex) {
    drawTileWithOptions(context, tileSet, size, x, y, tileIndex);
}

export function drawTileWithOptions(context, tileSet, size, x, y, tileIndex, options = {}) {
    if (!tileSet || tileSet.listItem[tileIndex] === undefined) {
        return;
    }

    const { gap = 1 } = options;
    const canvasSize = getCanvasDimensions(context);
    const cellWidth = canvasSize.width / size.width;
    const cellHeight = canvasSize.height / size.height;
    const squareWidth = cellWidth - gap;
    const squareHeight = cellHeight - gap;
    const offsetX = x * cellWidth;
    const offsetY = y * cellHeight;

    context.drawImage(
        tileSet.listItem[tileIndex],
        offsetX,
        offsetY,
        squareWidth,
        squareHeight,
    );
}

export function eraseTile(context, size, x, y) {
    const canvasSize = getCanvasDimensions(context);
    const cellWidth = canvasSize.width / size.width;
    const cellHeight = canvasSize.height / size.height;
    const squareWidth = cellWidth - 1;
    const squareHeight = cellHeight - 1;

    context.fillStyle = "#000000";
    context.fillRect(
        x * cellWidth,
        y * cellHeight,
        squareWidth,
        squareHeight,
    );
}

export function applyTool(context, state, position) {
    const { currentTool, currentTile, currentSize, baseField } = state;

    switch (currentTool) {
        case "fill": {
            const updatedCells = floodFillCells(state.mapData, position.x, position.y, currentTile);

            updatedCells.forEach((cell) => {
                drawTileWithOptions(context, baseField, currentSize, cell.x, cell.y, currentTile);
            });

            syncMapJson(state);
            return;
        }
        case "erase":
            eraseTile(context, currentSize, position.x, position.y);
            setCell(state.mapData, position.x, position.y, null);
            syncMapJson(state);
            return;
        case "pen":
        default:
            drawTile(context, baseField, currentSize, position.x, position.y, currentTile);
            setCell(state.mapData, position.x, position.y, currentTile);
            syncMapJson(state);
    }
}

export function renderMap(context, state, options = {}) {
    const { showGrid = true } = options;

    if (showGrid) {
        drawGrid(context, state.currentSize);
    } else {
        clearCanvas(context);
    }

    state.mapData.cells.forEach((row, y) => {
        row.forEach((tileIndex, x) => {
            if (tileIndex === null) {
                return;
            }

            drawTileWithOptions(
                context,
                state.baseField,
                state.currentSize,
                x,
                y,
                tileIndex,
                { gap: showGrid ? 1 : 0 },
            );
        });
    });
}
