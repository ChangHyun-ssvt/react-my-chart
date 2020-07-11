import express from "express";
import bodyParser from "body-parser";
import index from "./router/index";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", index);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
