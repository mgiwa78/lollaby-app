"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../controllers/User-Controller");
const require_auth_1 = require("../middleware/require-auth");
const router = express_1.default.Router();
router.put("/myProfile/update", require_auth_1.AuthenticateUser, User_Controller_1.Update__OWN_USER__PUT);
router.get("/myProfile/view", require_auth_1.AuthenticateUser, 
// hasPermission("put"),
User_Controller_1.Fetch__MY_PROFILE__GET);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map