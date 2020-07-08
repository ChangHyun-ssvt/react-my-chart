import { Request, Response, Router, NextFunction } from "express";
import user from "./user";

const router = Router();

router.use("/user", user);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello World!");
});

export default router;
