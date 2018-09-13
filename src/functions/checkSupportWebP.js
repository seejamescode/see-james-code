const checkSupportWebP = function (callback) {
  const img = new Image();
  img.onload = function () {
    const result = (img.width > 0) && (img.height > 0);
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
}

export default checkSupportWebP;