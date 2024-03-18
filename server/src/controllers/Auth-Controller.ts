import { Request, Response } from "express";
import { User, UserDoc } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Password } from "../services/password";
import { JWT_SECRET } from "../constants";

interface DecodedToken extends JwtPayload {
  organization: { organizationId: string };
  token: string;
}
export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password, preference } = req.body;
  console.log(email);
  try {
    const user: UserDoc = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const verifyPassword = await Password.compare(user.password, password);

    if (verifyPassword) {
      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        preference: user.preference,
        avatar: user.avatar,
      };

      const token = jwt.sign({ user: userData }, JWT_SECRET);

      return res.status(200).json({
        userAuth: userData,
        userJwt: token,
      });
    }

    return res.status(400).json({ message: "Invalid user credentials" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const SignUp__AUTH__POST = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, preference } = req.body;
    console.log(preference);
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({ message: "Email Already in use" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      email: email,
      preference: preference,
      password: hashedPassword,
      fullName: fullName,
    });
    const userData = { ...user.toObject(), password: null as string };

    const token = jwt.sign({ user: userData }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;

    console.log("decoded:", decoded);

    res.json({ userAuth: userData, userJwt: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const Fetch__USER_PROFILE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
