import { bindTileSelection, renderTilePalette } from "../ui/tilePalette.js";

export default function loadTileButton(tileList, container, onSelect) {
    renderTilePalette(container, tileList);
    bindTileSelection(container, onSelect);
}
