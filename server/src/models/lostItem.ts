import { ObjectId } from "mongodb";
import mongoose, { Document as Doc, Model } from "mongoose";

export interface TLostItem {
  status: boolean;
  date_lost: Date;
  ownerName: string;
  ownerContact: string;
  placeLost: string;
  itemType: string;
}

export interface TLostItemDoc extends Doc, TLostItem {}

interface TLostItemModel extends Model<TLostItemDoc> {
  build(attrs: TLostItem): TLostItemDoc;
}

const LostItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  ownerContact: {
    type: String,
  },
  date_lost: {
    type: String,
  },
  description: {
    type: String,
  },
  placeLost: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: ObjectId,
    ref: "User",
  },
});

LostItemSchema.set("timestamps", true);

const LostItem: TLostItemModel = (mongoose.models?.LostItem ||
  mongoose.model<TLostItemDoc, TLostItemModel>(
    "LostItem",
    LostItemSchema
  )) as TLostItemModel;

export { LostItem };
