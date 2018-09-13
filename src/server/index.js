import compression from "compression";
import express from "express";
import apiV1 from "./api/v1";

const app = express();
const port = process.env.PORT || 8080;
app.use(compression());
app.enable("trust proxy");

apiV1(app);

app.use((req, res, next) => {
  if (req.secure || req.headers.host === `localhost:${port}`) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

app.use(express.static("./build"));

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`App and API is live at http://localhost:${port}`);
});
