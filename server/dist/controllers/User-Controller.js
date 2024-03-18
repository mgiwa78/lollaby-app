"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch__MY_PROFILE__GET = exports.Update__OWN_USER__PUT = void 0;
const user_1 = require("../models/user");
const Update__OWN_USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user ID is available in the request object
        const { email, avatar, firstName, lastName, contactNumber, notification } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, Object.assign({ firstName,
            email,
            lastName,
            contactNumber,
            notification }, (avatar && { avatar })), { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating own profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__OWN_USER__PUT = Update__OWN_USER__PUT;
const Fetch__MY_PROFILE__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const userData = yield user_1.User.findById(user.id)
            .populate("department")
            .populate("roles");
        return res.json({ status: "success", data: userData });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__MY_PROFILE__GET = Fetch__MY_PROFILE__GET;
//# sourceMappingURL=User-Controller.js.map