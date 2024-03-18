import mongoose, { Document, Model, model, Schema } from "mongoose";

export interface TUser {
  avatar: string;
  fullName: string;
  email: string;
  preference: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        preference: string;
        id: string;
        isAdmin?: boolean;
        fullName: string;
      };
    }
  }
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: TUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  avatar: string;
  fullName: string;
  preference: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  preference: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
});

userSchema.set("timestamps", true);

export const User: UserModel = (mongoose.models.User ||
  model<UserDoc>("User", userSchema)) as UserModel;
