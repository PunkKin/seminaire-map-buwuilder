export default async function loadTile(file, countX, countY) {
    const response = await fetch(`../tiles/${file}`);

    const listTile = {
        image: await createImageBitmap(await response.blob()),
        listItem: [],
    };

    const stepX = listTile.image.width / countX;
    const stepY = listTile.image.height / countY;

    for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
            listTile.listItem.push(await createImageBitmap(listTile.image, stepX * x, stepY * y, stepX, stepY));
        }
    }

    return listTile;
}
