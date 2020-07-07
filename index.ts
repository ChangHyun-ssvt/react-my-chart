import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import user from "./router/user";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
