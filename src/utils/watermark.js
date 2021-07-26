export const watermarkupload = (image, watermarkImg) => {
    watermark([image, watermarkImg])
    .image(watermark.image.lowerLeft(0.5))
    .then((img) => console.log(img));
}