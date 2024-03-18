import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";
import foundItemRouter from "./foundItemRouter";
import lostItemsRouter from "./lostItemsRouter";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("lost and found api API is online and running");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/found-items", foundItemRouter);
rootRouter.use("/lost-items", lostItemsRouter);
rootRouter.use("/users", userRouter);

export default rootRouter;
