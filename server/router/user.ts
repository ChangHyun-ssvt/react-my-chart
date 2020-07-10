import { Request, Response, Router, NextFunction } from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const router = Router();
const User = require("../model/user");

type userType = {
  username: string;
  email: string;
  password: string;
  salt: string;
};

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const result = await User.findOne({
      userid: body.userid,
    });

    if (result !== null) {
      console.log("이미 가입된 아이디 입니다");
      res.status(401).send("이미 가입된 아이디 입니다");
    } else {
      const inputPassword = body.password;
      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      const hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");
      body.password = hashPassword;
      body.salt = salt;
      await User.create({ ...body }, (err: TypeError, user: userType) => {
        if (err) return res.status(500).send("User 생성 실패");
        res.status(201).send("User 생성 성공");
      });
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const result = await User.findOne({
      userid: body.userid,
    });

    if (result === null) {
      console.log("없는 회원입니다");
      res.status(401).send("없는 회원입니다");
    } else {
      const dbPassword = result.password;
      const inputPassowrd = body.password;
      const salt = result.salt;
      const hashPassword = crypto
        .createHash("sha512")
        .update(inputPassowrd + salt)
        .digest("hex");

      if (dbPassword === hashPassword) {
        console.log("로그인 성공");
        res.status(200).send("로그인 성공");
      } else {
        console.log("비밀번호가 다릅니다");
        res.status(401).send("비밀번호가 다릅니다");
      }
    }
  }
);

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  await User.find({}, (err: TypeError, users: userType) => {
    if (err) return res.status(500).send("User 전체 조회 실패");
    res.status(200).send(users);
  });
});

router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findById(req.params.id, (err: TypeError, user: userType) => {
      if (err) return res.status(500).send("User 조회 실패");
      if (!user) return res.status(404).send("User 없음");
      res.status(200).send(user);
    });
  }
);

router.get(
  "/search/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;
    await User.find(
      { username: { $regex: username, $options: "i" } },
      (err: TypeError, user: userType) => {
        if (err) return res.status(500).send("User 조회 실패");
        if (!user) return res.status(404).send("User 없음");
        res.status(200).send(user);
      }
    );
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndRemove(
      req.params.id,
      (err: TypeError, user: userType) => {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User " + user.username + " 삭제됨.");
      }
    );
  }
);

router.put(
  "/:id/:username/:email/:password",
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(
      req.params.id,
      req.params,
      { new: true },
      (err: TypeError, user: userType) => {
        if (err) return res.status(500).send("User 수정 실패");
        res.status(200).send(user);
      }
    );
  }
);

export default router;
