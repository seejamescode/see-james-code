export const imageSizes = [60, 200, 400, 600, 800, 1000, 1600, 1800];
export const genImageQueries = function(imageRoute, imageSizes, imageFilename) {
  return imageFilename.includes(".gif") || imageFilename.includes(".svg")
    ? [
        {
          url: `${imageRoute}${imageFilename}`
        }
      ]
    : imageSizes.map(size => {
        return {
          size,
          url: `${imageRoute}rendered/${imageFilename.split(".")[0]}--${size}.${
            imageFilename.split(".")[1]
          }`
        };
      });
};
