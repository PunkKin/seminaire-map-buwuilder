export function renderTilePalette(container, tileSet) {
    const buttons = tileSet.listItem
        .map((_, index) => `<button data-id="${index}"><canvas width="50" height="50"></canvas></button>`)
        .join("");

    container.innerHTML = buttons;

    container.querySelectorAll("canvas").forEach((canvas, index) => {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(tileSet.listItem[index], 0, 0, canvas.width, canvas.height);
    });
}

export function setSelectedTile(container, selectedTileId) {
    container.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("selected", Number(button.dataset.id) === selectedTileId);
    });
}

export function bindTileSelection(container, onSelect) {
    container.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const selectedTileId = Number(event.currentTarget.dataset.id);

            setSelectedTile(container, selectedTileId);
            onSelect(selectedTileId);
        });
    });
}
