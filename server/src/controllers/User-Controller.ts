import { Request, Response } from "express";
import { TUser, User, UserDoc } from "../models/user";

export const Update__OWN_USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming user ID is available in the request object
    const { email, avatar, firstName, lastName, contactNumber, notification } =
      req.body;

    const user: UserDoc = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        email,
        lastName,
        contactNumber,
        notification,
        ...(avatar && { avatar })
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating own profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__MY_PROFILE__GET = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const userData = await User.findById(user.id)
      .populate("department")
      .populate("roles");

    return res.json({ status: "success", data: userData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
