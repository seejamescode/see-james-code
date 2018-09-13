import fs from "fs";
import Jimp from "jimp";
import { imageSizes } from "./src/server/images";

const images = fs
  .readdirSync(process.env.IMAGESRC)
  .filter(
    file =>
      file.includes(".jpeg") || file.includes(".jpg") || file.includes(".png")
  );

for (let i = 0; i < images.length; i++) {
  for (let j = 0; j < imageSizes.length; j++) {
    let imagePathAndTitle = `${process.env.IMAGEDEST}${images[i].split(".")[0]}--${
      imageSizes[j]
      }`;

    Jimp.read(process.env.IMAGESRC + images[i])
      .then(function (image) {
        image
          .resize(Jimp.AUTO, imageSizes[j])
          .quality(85)
          .write(
            `${imagePathAndTitle}.${image.getExtension()}`
          );

        return image;
      })
      .then(function (image) {
        console.log(`Generated ${imageSizes[j]}px size for ${images[i]}.`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}