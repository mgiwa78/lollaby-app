import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import {
  Create__LOST_ITEM__POST,
  Fetch__LOST_ITEMS__GET,
  Update__LOST_ITEM__PUT,
} from "../controllers/Lost-Items-Controller";

const lostItemsRouter: Router = Router();

lostItemsRouter.post("/", Create__LOST_ITEM__POST);
lostItemsRouter.put("/:itemId", Update__LOST_ITEM__PUT);
lostItemsRouter.get("/", Fetch__LOST_ITEMS__GET);

export default lostItemsRouter;
