import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import {
  Create__FOUND_ITEM__POST,
  Fetch__FOUND_ITEMS__GET,
  Update__FOUND_ITEM__PUT,
} from "../controllers/Found-items-Controller";

const foundItemRouter: Router = Router();

foundItemRouter.post("/", Create__FOUND_ITEM__POST);

foundItemRouter.put("/:itemId", Update__FOUND_ITEM__PUT);

foundItemRouter.get("/", Fetch__FOUND_ITEMS__GET);

export default foundItemRouter;
